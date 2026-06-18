export type ServerEnvName =
  | 'SUPABASE_URL'
  | 'SUPABASE_SERVICE_ROLE_KEY'
  | 'RESEND_API_KEY'
  | 'RESEND_FROM_EMAIL';

function normalize(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().replace(/^['"]|['"]$/g, '');
  return trimmed || undefined;
}

/**
 * Read server secrets at runtime via dynamic process.env access.
 * Avoids astro:env/import.meta.env so Netlify build does not inline secrets.
 */
export function getServerEnv(name: ServerEnvName): string | undefined {
  return normalize(process.env[name]);
}
