import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { getServerEnv } from '@/lib/serverEnv';
import { emailFooterHtml, emailListUnsubscribeHeaders } from '@/lib/email';
import { absoluteUrl, contactEmail } from '@/lib/site';
import { Resend } from 'resend';
import type { APIRoute } from 'astro';
import crypto from 'crypto';

export const prerender = false;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

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

export const POST: APIRoute = async ({ request }) => {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return new Response(
        JSON.stringify({
          error: 'Service unavailable. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { email, consent } = await request.json();

    if (!email || !consent) {
      return new Response(
        JSON.stringify({ error: 'Email and consent are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data: existingSubscriber, error: existingError } = await supabaseAdmin
      .from('subscribers')
      .select('id, status')
      .eq('email', email)
      .maybeSingle();

    if (existingError) {
      console.error('Supabase lookup error:', existingError);
    } else if (existingSubscriber) {
      const message =
        existingSubscriber.status === 'unsubscribed'
          ? 'This email was previously unsubscribed. Please contact us to re-subscribe.'
          : 'Email already subscribed';
      return new Response(JSON.stringify({ error: message }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const confirmationToken = crypto.randomBytes(32).toString('hex');

    const { error } = await supabaseAdmin.from('subscribers').insert({
      email,
      consent: true,
      status: 'pending',
      confirmation_token: confirmationToken,
      subscribed_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase insert error:', error);
      if (error.code === '23505') {
        return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      let host: string | null = null;
      const supabaseUrl = getServerEnv('SUPABASE_URL');
      if (supabaseUrl) {
        try {
          host = new URL(supabaseUrl.replace(/\/+$/, '')).hostname;
        } catch {
          host = 'invalid-url';
        }
      }

      return new Response(
        JSON.stringify({
          error: 'Failed to subscribe. Please try again.',
          detail: error.message,
          stage: 'insert',
          host,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resendApiKey = getServerEnv('RESEND_API_KEY');
    const resendFromEmail = getServerEnv('RESEND_FROM_EMAIL');
    const resend = resendApiKey ? new Resend(resendApiKey) : null;

    if (resend && resendFromEmail) {
      try {
        const confirmUrl = `${absoluteUrl('api/confirm')}?token=${confirmationToken}`;

        await resend.emails.send({
          from: resendFromEmail,
          to: email,
          replyTo: contactEmail,
          subject: 'Confirm your subscription to Voyaflair',
          headers: emailListUnsubscribeHeaders(confirmationToken),
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #69746E;">Welcome to Voyaflair</h2>
              <p>Thank you for subscribing to our newsletter! Please confirm your email address by clicking the button below:</p>
              <a href="${confirmUrl}" style="display: inline-block; padding: 12px 24px; background-color: #69746E; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">Confirm Subscription</a>
              <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
              <p style="color: #666; font-size: 12px; word-break: break-all;">${confirmUrl}</p>
              <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't subscribe to Voyaflair, you can safely ignore this email.</p>
              ${emailFooterHtml(confirmationToken)}
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Successfully subscribed! Please check your email for confirmation.',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
