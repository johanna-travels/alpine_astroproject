import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { confirmSubscriber } from '@/lib/subscribers';
import { pageUrl } from '@/lib/site';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return new Response('Service unavailable', { status: 503 });
  }

  const token = url.searchParams.get('token');
  if (!token) {
    return redirect(`${pageUrl('preferences')}?error=missing-token`);
  }

  const subscriber = await confirmSubscriber(supabaseAdmin, token);
  if (!subscriber) {
    return redirect(`${pageUrl('preferences')}?error=invalid-token`);
  }

  return redirect(`${pageUrl('preferences')}?token=${token}&confirmed=1`);
};

export const POST: APIRoute = async ({ request }) => {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { token } = await request.json();
  if (!token) {
    return new Response(JSON.stringify({ error: 'Token is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const subscriber = await confirmSubscriber(supabaseAdmin, token);
  if (!subscriber) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ subscriber }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
