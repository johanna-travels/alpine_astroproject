import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { getSubscriberByToken, unsubscribeSubscriber } from '@/lib/subscribers';
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { token, preferences } = await request.json();

    if (!token || !preferences) {
      return new Response(JSON.stringify({ error: 'Token and preferences are required' }), {
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

    const updates: Record<string, unknown> = { preferences };
    if (subscriber.status === 'pending') {
      updates.status = 'active';
      updates.confirmed_at = new Date().toISOString();
    }

    const { error: updateError } = await supabaseAdmin
      .from('subscribers')
      .update(updates)
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return new Response(JSON.stringify({ error: 'Failed to update preferences' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Preferences updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Preferences error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const success = await unsubscribeSubscriber(supabaseAdmin, token);
    if (!success) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Successfully unsubscribed' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
