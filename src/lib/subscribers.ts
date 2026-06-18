import type { SupabaseClient } from '@supabase/supabase-js';

export type SubscriberPreferences = {
  updates: boolean;
  promotions: boolean;
};

export type SubscriberRecord = {
  id: string;
  email: string;
  status: 'pending' | 'active' | 'unsubscribed';
  preferences: SubscriberPreferences | null;
};

const defaultPreferences: SubscriberPreferences = {
  updates: true,
  promotions: false,
};

export async function getSubscriberByToken(
  client: SupabaseClient,
  token: string,
): Promise<SubscriberRecord | null> {
  const { data, error } = await client
    .from('subscribers')
    .select('id, email, status, preferences')
    .eq('confirmation_token', token)
    .single();

  if (error || !data) return null;
  return data as SubscriberRecord;
}

export async function confirmSubscriber(
  client: SupabaseClient,
  token: string,
): Promise<SubscriberRecord | null> {
  const subscriber = await getSubscriberByToken(client, token);
  if (!subscriber) return null;

  if (subscriber.status !== 'pending') {
    return subscriber;
  }

  const { data, error } = await client
    .from('subscribers')
    .update({
      status: 'active',
      confirmed_at: new Date().toISOString(),
      preferences: subscriber.preferences ?? defaultPreferences,
    })
    .eq('id', subscriber.id)
    .select('id, email, status, preferences')
    .single();

  if (error || !data) return null;
  return data as SubscriberRecord;
}

export async function unsubscribeSubscriber(
  client: SupabaseClient,
  token: string,
): Promise<boolean> {
  const subscriber = await getSubscriberByToken(client, token);
  if (!subscriber) return false;

  if (subscriber.status === 'unsubscribed') return true;

  const { error } = await client
    .from('subscribers')
    .update({
      status: 'unsubscribed',
      unsubscribed_at: new Date().toISOString(),
    })
    .eq('id', subscriber.id);

  return !error;
}
