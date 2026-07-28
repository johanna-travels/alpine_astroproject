/** Domains required in CSP for embedded Instagram reels (blockquote + embed.js). */
export const instagramCsp = {
  frameSrc: 'https://www.instagram.com',
  scriptSrc: 'https://www.instagram.com',
  connectSrc: 'https://www.instagram.com',
  imgSrc: 'https://static.cdninstagram.com https://*.cdninstagram.com',
} as const;

/** Canonical permalink without tracking query params (for embed.js). */
export function instagramPermalink(permalink: string): string {
  const trimmed = permalink.trim();
  const match = trimmed.match(
    /instagram\.com\/(reel|p|tv)\/([A-Za-z0-9_-]+)/i,
  );
  if (!match) {
    throw new Error(`Invalid Instagram permalink: ${permalink}`);
  }
  const [, type, id] = match;
  return `https://www.instagram.com/${type}/${id}/`;
}

/** Build the `/embed` iframe URL from a public Instagram post or reel link. */
export function instagramEmbedSrc(permalink: string): string {
  const canonical = instagramPermalink(permalink);
  const path = canonical.replace('https://www.instagram.com/', '').replace(/\/$/, '');
  return `https://www.instagram.com/${path}/embed/captioned/`;
}
