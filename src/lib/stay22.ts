/** Domains required in CSP for Stay22 Let Me Allez + embed widgets. */
export const stay22Csp = {
  scriptSrc: 'https://scripts.stay22.com',
  connectSrc: 'https://www.stay22.com https://scripts.stay22.com https://stay22.com',
  /** Embeds use stay22.com; Let Me Allez may frame www.stay22.com */
  frameSrc: 'https://stay22.com https://www.stay22.com',
  imgSrc: 'https://www.stay22.com https://scripts.stay22.com https://stay22.com',
} as const;

const DEFAULT_LMA_ID = '6a689d736b84bf57841c7582';

export function getStay22LmaId(): string | undefined {
  const id = import.meta.env.PUBLIC_STAY22_LMA_ID?.trim();
  return id || DEFAULT_LMA_ID;
}

/** Load Stay22 in production so local Booking.com links stay untouched during dev. */
export function isStay22Enabled(): boolean {
  return Boolean(getStay22LmaId()) && import.meta.env.PROD;
}
