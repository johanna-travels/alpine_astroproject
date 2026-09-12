/** Domains required in CSP when Google Analytics (gtag.js) is enabled. */
export const googleAnalyticsCsp = {
  scriptSrc: 'https://www.googletagmanager.com',
  // Το gtag.js κατεβαίνει από script-src, αλλά τα hits πάνε με fetch στο GTM + GA4.
  // Χωρίς googletagmanager στο connect-src το Accept δεν φαίνεται ποτέ στο Realtime.
  connectSrc:
    'https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://analytics.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://stats.g.doubleclick.net',
  imgSrc:
    'https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com',
} as const;

export function getGaMeasurementId(): string | undefined {
  const id = import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

export function isGoogleAnalyticsEnabled(): boolean {
  return Boolean(getGaMeasurementId()) && import.meta.env.PROD;
}
