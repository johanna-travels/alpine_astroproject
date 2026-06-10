import { createClient } from '@supabase/supabase-js';
import type { APIRoute } from 'astro';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { token, preferences } = await request.json();

    if (!token || !preferences) {
      return new Response(
        JSON.stringify({ error: 'Token and preferences are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify token and get subscriber
    const { data: subscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (fetchError || !subscriber) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update preferences
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({ 
        preferences,
        status: 'active', // Activate subscription on first preference update
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update preferences' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Preferences updated successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Preferences error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Token is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify token and get subscriber
    const { data: subscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (fetchError || !subscriber) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update status to unsubscribed
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({ 
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Unsubscribe error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to unsubscribe' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Successfully unsubscribed' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
