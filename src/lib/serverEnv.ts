/** Read server secrets at runtime (avoids inlining into Netlify function bundles). */
export function getServerEnv(name: string): string | undefined {
  if (import.meta.env.DEV) {
    return (import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name];
  }
  return process.env[name];
}
