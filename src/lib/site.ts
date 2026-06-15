/** Shared site URL helpers for GitHub Pages base path. */
export const siteOrigin = import.meta.env.SITE;
export const basePath = import.meta.env.BASE_URL;
export const base = basePath.replace(/\/$/, '');
export const homeUrl = new URL(basePath, siteOrigin).href;

/** Internal page URL with trailing slash (matches trailingSlash: 'always'). */
export function pageUrl(path = ''): string {
  if (!path || path === '/') return `${base}/`;
  const clean = String(path).replace(/^\/+|\/+$/g, '');
  return `${base}/${clean}/`;
}

export function withBase(path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`.replace(/\/{2,}/g, '/');
}

/** API route URL (respects GitHub Pages base path). */
export function apiUrl(path: string): string {
  const clean = String(path).replace(/^\/+|\/+$/g, '').replace(/^api\/?/, '');
  return withBase(`api/${clean}`);
}

/** Absolute URL for emails and external references. */
export function absoluteUrl(path = ''): string {
  const href = path.startsWith('http') ? path : pageUrl(path);
  return new URL(href, siteOrigin).href;
}

export function normalizePath(pathname: string): string {
  let path = pathname;

  try {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      path = new URL(path).pathname;
    }
  } catch {
    // keep original path
  }

  const stripped = path.startsWith(base) ? path.slice(base.length) || '/' : path;
  return stripped !== '/' ? stripped.replace(/\/$/, '') : '/';
}

export function isCurrentPath(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}

/**
 * Active when the current path matches the target route OR is a descendant of it.
 * Accepts one or more targets; the home route ("/") only matches exactly.
 */
export function isActivePath(pathname: string, hrefs: string | string[]): boolean {
  const current = normalizePath(pathname);
  const targets = (Array.isArray(hrefs) ? hrefs : [hrefs]).map(normalizePath);
  return targets.some((target) =>
    target === '/'
      ? current === '/'
      : current === target || current.startsWith(`${target}/`)
  );
}
