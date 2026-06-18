import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { getServerEnv } from '@/lib/serverEnv';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const supabaseUrl = getServerEnv('SUPABASE_URL');
  const hasServiceKey = Boolean(getServerEnv('SUPABASE_SERVICE_ROLE_KEY'));

  let host: string | null = null;
  if (supabaseUrl) {
    try {
      host = new URL(supabaseUrl.replace(/\/+$/, '')).hostname;
    } catch {
      host = 'invalid-url';
    }
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return new Response(
      JSON.stringify({
        ok: false,
        supabase: {
          configured: Boolean(supabaseUrl && hasServiceKey),
          host,
          hasUrl: Boolean(supabaseUrl),
          hasServiceKey,
        },
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { error } = await supabaseAdmin.from('subscribers').select('id').limit(1);

  return new Response(
    JSON.stringify({
      ok: !error,
      supabase: {
        configured: true,
        host,
        connected: !error,
        error: error?.message ?? null,
      },
    }),
    {
      status: error ? 500 : 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
