import { getResendSender } from '@/lib/email';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { contactEmail } from '@/lib/site';
import { getServerEnv, hasResendConfig, hasSupabaseConfig, isPlaceholderEnvValue } from '@/lib/serverEnv';
import { sanitizeContactForm, type ContactFormValues } from '@/lib/security';
import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validateContact(values: ContactFormValues): string | null {
  if (!values.name.trim()) return 'Please enter your full name.';
  if (!values.email.trim()) return 'Please enter your email address.';
  if (!emailPattern.test(values.email.trim())) return 'Please enter a valid email address.';
  if (!values.subject.trim()) return 'Please enter a subject.';
  if (!values.message.trim()) return 'Please enter a message.';
  if (values.message.trim().length < 10) return 'Message should be at least 10 characters.';
  if (!values.consent) return 'You must agree to the privacy policy.';
  return null;
}

async function storeContactMessage(values: ContactFormValues): Promise<{ stored: boolean; detail?: string }> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) return { stored: false };

  const { error } = await supabaseAdmin.from('contact_messages').insert({
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
    consent: values.consent,
  });

  if (error) {
    console.error('Contact message storage error:', error);
    return { stored: false, detail: error.message };
  }

  return { stored: true };
}

async function sendContactEmail(values: ContactFormValues): Promise<{ sent: boolean; detail?: string }> {
  if (!hasResendConfig()) {
    return { sent: false };
  }

  const resendApiKey = getServerEnv('RESEND_API_KEY')!;
  const resendSender = getResendSender();
  if (!resendSender) {
    return { sent: false };
  }

  const resend = new Resend(resendApiKey);
  const safeName = escapeHtml(values.name.trim());
  const safeEmail = escapeHtml(values.email.trim());
  const safeSubject = escapeHtml(values.subject.trim());
  const safeMessage = escapeHtml(values.message.trim()).replace(/\n/g, '<br />');

  const { error } = await resend.emails.send({
    from: resendSender,
    to: contactEmail,
    replyTo: values.email.trim(),
    subject: `[Voyaflair Contact] ${values.subject.trim()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #69746E; margin-top: 0;">New contact form message</h2>
        <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">Reply to this email to respond directly to ${safeEmail}.</p>
      </div>
    `,
  });

  if (error) {
    console.error('Contact email sending error:', error);
    return { sent: false, detail: error.message };
  }

  return { sent: true };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const values = sanitizeContactForm({
      name: String(body.name ?? ''),
      email: String(body.email ?? ''),
      subject: String(body.subject ?? ''),
      message: String(body.message ?? ''),
      consent: Boolean(body.consent),
    });

    const validationError = validateContact(values);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hasSupabase = hasSupabaseConfig() && Boolean(getSupabaseAdmin());
    const hasResend = hasResendConfig();

    if (!hasSupabase && !hasResend) {
      const usingPlaceholders =
        isPlaceholderEnvValue(getServerEnv('RESEND_API_KEY')) ||
        isPlaceholderEnvValue(getServerEnv('RESEND_FROM_EMAIL')) ||
        isPlaceholderEnvValue(getServerEnv('SUPABASE_URL'));

      console.error('Contact form unavailable: missing or placeholder env vars in .env');
      return new Response(
        JSON.stringify({
          error: usingPlaceholders
            ? 'Your .env still has placeholder values. Edit the file .env in the project root (not env.import), paste real values from Netlify, save, and restart npm run dev.'
            : 'Contact form is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to .env (copy from Netlify), or email us directly.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const [storageResult, emailResult] = await Promise.all([
      storeContactMessage(values),
      sendContactEmail(values),
    ]);

    if (!storageResult.stored && !emailResult.sent) {
      return new Response(
        JSON.stringify({
          error: 'Failed to send your message. Please try again later or email us directly.',
          ...(emailResult.detail ? { detail: emailResult.detail } : {}),
          ...(storageResult.detail ? { storageDetail: storageResult.detail } : {}),
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (hasResend && !emailResult.sent) {
      return new Response(
        JSON.stringify({
          error: storageResult.stored
            ? 'Your message was saved, but the email notification failed. Check RESEND_API_KEY in .env matches Netlify, then try again.'
            : 'Failed to send your message. Please try again later or email us directly.',
          ...(emailResult.detail ? { detail: emailResult.detail } : {}),
          stored: storageResult.stored,
          emailSent: false,
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        message: emailResult.sent
          ? 'Thanks! Your message has been sent.'
          : 'Thanks! We received your message.',
        stored: storageResult.stored,
        emailSent: emailResult.sent,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
