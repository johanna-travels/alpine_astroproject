import {
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
} from 'astro:env/server';

const astroEnv = {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
} as const;

export type ServerEnvName = keyof typeof astroEnv;

function normalize(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().replace(/^['"]|['"]$/g, '');
  return trimmed || undefined;
}

/**
 * Read server secrets at runtime.
 * On Netlify, prefer process.env so Functions get live env vars (not build-time inlines).
 */
export function getServerEnv(name: ServerEnvName): string | undefined {
  if (!import.meta.env.DEV) {
    const fromProcess = normalize(process.env[name]);
    if (fromProcess) return fromProcess;
  }

  const fromAstro = normalize(astroEnv[name]);
  if (fromAstro) return fromAstro;

  if (import.meta.env.DEV) {
    return normalize((import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name]);
  }

  return undefined;
}
