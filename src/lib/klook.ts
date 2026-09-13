/** Domains required in CSP for the Klook affiliate widget iframe. */
export const klookCsp = {
  /** Loader + το iframe-init που κατεβάζει από το CDN της Klook. */
  scriptSrc: 'https://affiliate.klook.com https://cdn.klook.com',
  /** Το widget ζωγραφίζεται σε iframe στο affiliate host. */
  frameSrc: 'https://affiliate.klook.com https://www.klook.com https://cdn.klook.com',
  /** Ο loader ζητάει markup από το affiliate host. */
  connectSrc: 'https://affiliate.klook.com https://cdn.klook.com',
  imgSrc: 'https://res.klook.com https://cdn.klook.com',
} as const;
