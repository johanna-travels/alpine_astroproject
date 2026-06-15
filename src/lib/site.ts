/** Shared site URL helpers for GitHub Pages base path. */
export const siteOrigin = import.meta.env.SITE;
export const basePath = import.meta.env.BASE_URL;
export const base = basePath.replace(/\/$/, '');
export const homeUrl = new URL(basePath, siteOrigin).href;

export function withBase(path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`.replace(/\/{2,}/g, '/');
}

export function normalizePath(pathname: string): string {
  const stripped = pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
  return stripped !== '/' ? stripped.replace(/\/$/, '') : '/';
}

export function isCurrentPath(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}
