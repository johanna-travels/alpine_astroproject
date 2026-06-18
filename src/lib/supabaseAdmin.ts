import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getServerEnv } from '@/lib/serverEnv';

function normalizeSupabaseUrl(url: string): string | null {
  const normalized = url.replace(/\/+$/, '');
  try {
    const parsed = new URL(normalized);
    if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('.supabase.co')) {
      return null;
    }
    return normalized;
  } catch {
    return null;
  }
}

/** Server-only Supabase client for API routes (bypasses RLS). */
export function getSupabaseAdmin(): SupabaseClient | null {
  const supabaseUrl = getServerEnv('SUPABASE_URL');
  const supabaseServiceRoleKey = getServerEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceRoleKey) return null;

  const validUrl = normalizeSupabaseUrl(supabaseUrl);
  if (!validUrl) {
    console.error('Invalid SUPABASE_URL format:', supabaseUrl);
    return null;
  }

  return createClient(validUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
