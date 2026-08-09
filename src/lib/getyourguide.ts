/** Domains required in CSP for the GetYourGuide activity widget. */
export const getYourGuideCsp = {
  /** Loader script (pa.umd.production.min.js). */
  scriptSrc: 'https://widget.getyourguide.com',
  /** The widget renders its activity card inside an iframe. */
  frameSrc: 'https://widget.getyourguide.com https://www.getyourguide.com',
  /** The loader fetches activity data from GetYourGuide. */
  connectSrc: 'https://widget.getyourguide.com',
  /** Activity thumbnails served from the GetYourGuide CDN. */
  imgSrc: 'https://cdn.getyourguide.com https://images.getyourguide.com',
} as const;

const DEFAULT_PARTNER_ID = 'VMRSHXF';

/** Partner id from GetYourGuide (Analytics + widgets). */
export function getYourGuidePartnerId(): string | undefined {
  const id = import.meta.env.PUBLIC_GETYOURGUIDE_PARTNER_ID?.trim();
  return id || DEFAULT_PARTNER_ID;
}

export function isGetYourGuideEnabled(): boolean {
  return Boolean(getYourGuidePartnerId());
}
