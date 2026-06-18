import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getServerEnv } from '@/lib/serverEnv';

/** Server-only Supabase client for API routes (bypasses RLS). */
export function getSupabaseAdmin(): SupabaseClient | null {
  const supabaseUrl = getServerEnv('SUPABASE_URL');
  const supabaseServiceRoleKey = getServerEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceRoleKey) return null;

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
