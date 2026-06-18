import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { unsubscribeSubscriber } from '@/lib/subscribers';
import { pageUrl } from '@/lib/site';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return redirect(`${pageUrl('preferences')}?error=service-unavailable`);
  }

  const token = url.searchParams.get('token');
  if (!token) {
    return redirect(`${pageUrl('preferences')}?error=missing-token`);
  }

  const success = await unsubscribeSubscriber(supabaseAdmin, token);
  if (!success) {
    return redirect(`${pageUrl('preferences')}?error=invalid-token`);
  }

  return redirect(`${pageUrl('preferences')}?token=${encodeURIComponent(token)}&unsubscribed=1`);
};
