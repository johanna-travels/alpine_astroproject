import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getSubscriberByToken } from '@/lib/subscribers';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = url.searchParams.get('token');
  if (!token) {
    return new Response(JSON.stringify({ error: 'Token is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const subscriber = await getSubscriberByToken(supabaseAdmin, token);
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
