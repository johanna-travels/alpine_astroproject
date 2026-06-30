import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type ServerEnvName =
  | 'SUPABASE_URL'
  | 'SUPABASE_SERVICE_ROLE_KEY'
  | 'RESEND_API_KEY'
  | 'RESEND_FROM_EMAIL'
  | 'NEWSLETTER_ADMIN_SECRET';

let localEnvLoaded = false;

function normalize(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().replace(/^['"]|['"]$/g, '');
  return trimmed || undefined;
}

/** True when .env still contains template text instead of real secrets. */
export function isPlaceholderEnvValue(value: string | undefined): boolean {
  if (!value) return true;
  const lower = value.toLowerCase();
  return (
    lower.startsWith('your_') ||
    lower.startsWith('paste_') ||
    lower.includes('yourdomain.com') ||
    lower === 'g-xxxxxxxxxx' ||
    lower.includes('xxx.supabase.co')
  );
}

/** Load .env from disk in local dev so API routes always see current values. */
function loadLocalEnvFile(): void {
  if (localEnvLoaded) return;
  localEnvLoaded = true;

  // Production (Netlify) injects env at runtime — do not read .env from disk.
  if (process.env.NETLIFY === 'true' || process.env.CONTEXT === 'production') {
    return;
  }

  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) process.env[key] = value;
  }
}

/**
 * Read server secrets at runtime via static process.env access.
 * Static property names are required so Vite injects .env values in local dev.
 * loadLocalEnvFile() ensures the on-disk .env is used when the dev server started
 * with stale or placeholder values.
 */
export function getServerEnv(name: ServerEnvName): string | undefined {
  loadLocalEnvFile();

  switch (name) {
    case 'SUPABASE_URL':
      return normalize(process.env.SUPABASE_URL);
    case 'SUPABASE_SERVICE_ROLE_KEY':
      return normalize(process.env.SUPABASE_SERVICE_ROLE_KEY);
    case 'RESEND_API_KEY':
      return normalize(process.env.RESEND_API_KEY);
    case 'RESEND_FROM_EMAIL':
      return normalize(process.env.RESEND_FROM_EMAIL);
    case 'NEWSLETTER_ADMIN_SECRET':
      return normalize(process.env.NEWSLETTER_ADMIN_SECRET);
  }
}

export function hasResendConfig(): boolean {
  const apiKey = getServerEnv('RESEND_API_KEY');
  const fromEmail = getServerEnv('RESEND_FROM_EMAIL');
  return Boolean(
    apiKey &&
      fromEmail &&
      apiKey.startsWith('re_') &&
      !isPlaceholderEnvValue(apiKey) &&
      !isPlaceholderEnvValue(fromEmail)
  );
}

export function hasSupabaseConfig(): boolean {
  const url = getServerEnv('SUPABASE_URL');
  const key = getServerEnv('SUPABASE_SERVICE_ROLE_KEY');
  return Boolean(url && key && !isPlaceholderEnvValue(url) && !isPlaceholderEnvValue(key));
}
