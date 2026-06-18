import {
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
} from 'astro:env/server';

const serverEnv = {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
} as const;

function normalize(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().replace(/^['"]|['"]$/g, '');
  return trimmed || undefined;
}

/** Read server secrets at runtime (Astro env + process.env fallback for local dev). */
export function getServerEnv(name: keyof typeof serverEnv): string | undefined {
  const fromAstro = normalize(serverEnv[name]);
  if (fromAstro) return fromAstro;

  if (import.meta.env.DEV) {
    return normalize((import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name]);
  }

  return normalize(process.env[name]);
}
