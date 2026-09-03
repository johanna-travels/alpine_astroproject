import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { getServerEnv } from '@/lib/serverEnv';
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
    const now = new Date().toISOString();

    const { error } = await supabaseAdmin.from('subscribers').insert({
      email,
      consent: true,
      status: 'active',
      confirmation_token: confirmationToken,
      subscribed_at: now,
      confirmed_at: now,
      preferences: { updates: true, promotions: false },
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

    return new Response(
      JSON.stringify({
        message: 'Successfully subscribed! You are on the list.',
        emailSent: true,
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
