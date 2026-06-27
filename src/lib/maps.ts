/** Domains required in CSP for embedded Google My Maps iframes. */
export const googleMapsCsp = {
  frameSrc: 'https://www.google.com https://docs.google.com https://accounts.google.com',
  /** Share-via-email posts from the embed target Google endpoints, not our origin. */
  formAction: "'self' https://www.google.com https://docs.google.com https://accounts.google.com mailto:",
} as const;

/** Sage header bar on My Maps embeds — matches footer, links, and TOC. */
export const googleMapsEmbedHeaderColor = '69746E';

/** Covers the Google embed share button — 110×56px (matches header bar). */
export const googleMapsShareCover = {
  top: 0,
  right: 44,
  width: 110,
  height: 56,
} as const;
