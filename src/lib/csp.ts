import { googleAnalyticsCsp } from './analytics';
import { getYourGuideCsp } from './getyourguide';
import { instagramCsp } from './instagram';
import { googleMapsCsp } from './maps';
import { stay22Csp } from './stay22';

export interface CspOptions {
  isDev: boolean;
  googleAnalyticsEnabled: boolean;
  stay22Enabled: boolean;
}

// Production flags όπως στο live Netlify (GA + Stay22 ενεργά, χωρίς unsafe-eval).
export const PRODUCTION_CSP_OPTIONS: CspOptions = {
  isDev: false,
  googleAnalyticsEnabled: true,
  stay22Enabled: true,
};

function joinSources(...parts: Array<string | false | undefined>): string {
  return parts.filter((part): part is string => Boolean(part)).join(' ');
}

// Directives που δεν είναι script-src/style-src — αυτά τα φτιάχνει το Astro με hashes.
export function getCspDirectives({
  isDev,
  googleAnalyticsEnabled,
}: CspOptions): string[] {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    `img-src ${joinSources(
      "'self'",
      'data:',
      'blob:',
      getYourGuideCsp.imgSrc,
      stay22Csp.imgSrc,
      googleAnalyticsEnabled && googleAnalyticsCsp.imgSrc,
      instagramCsp.imgSrc,
    )}`,
    "media-src 'self' blob:",
    "font-src 'self' data:",
    `connect-src ${joinSources(
      "'self'",
      getYourGuideCsp.connectSrc,
      stay22Csp.connectSrc,
      isDev && 'ws://localhost:* wss://localhost:*',
      googleAnalyticsEnabled && googleAnalyticsCsp.connectSrc,
      instagramCsp.connectSrc,
    )}`,
    `worker-src ${stay22Csp.workerSrc}`,
    `frame-src ${joinSources(
      "'self'",
      googleMapsCsp.frameSrc,
      getYourGuideCsp.frameSrc,
      instagramCsp.frameSrc,
      stay22Csp.frameSrc,
    )}`,
    `form-action ${googleMapsCsp.formAction}`,
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
  ];
}

export function getCspScriptResources({
  isDev,
  googleAnalyticsEnabled,
  stay22Enabled,
}: CspOptions): string[] {
  return [
    "'self'",
    getYourGuideCsp.scriptSrc,
    stay22Enabled ? stay22Csp.scriptSrc : undefined,
    isDev ? "'unsafe-eval'" : undefined,
    googleAnalyticsEnabled ? googleAnalyticsCsp.scriptSrc : undefined,
    instagramCsp.scriptSrc,
  ].filter((value): value is string => Boolean(value));
}

export function getCspStyleResources(): string[] {
  return ["'self'", "'unsafe-inline'"];
}

// Production CSP για Astro security.csp — χωρίς script 'unsafe-inline'.
export function getAstroCspConfig() {
  const options = PRODUCTION_CSP_OPTIONS;
  return {
    directives: getCspDirectives(options),
    scriptDirective: {
      resources: getCspScriptResources(options),
    },
    styleDirective: {
      resources: getCspStyleResources(),
    },
  };
}

export function buildContentSecurityPolicy(options: CspOptions): string {
  const scriptResources = [...getCspScriptResources(options)];
  // Στο dev ο Vite χρειάζεται inline scripts· στο production τα hashes τα βάζει το Astro.
  if (options.isDev && !scriptResources.includes("'unsafe-inline'")) {
    scriptResources.splice(1, 0, "'unsafe-inline'");
  }

  return [
    ...getCspDirectives(options),
    `script-src ${scriptResources.join(' ')}`,
    `style-src ${getCspStyleResources().join(' ')}`,
  ].join('; ');
}

export function buildProductionCspHeaderValue(): string {
  return buildContentSecurityPolicy(PRODUCTION_CSP_OPTIONS);
}
