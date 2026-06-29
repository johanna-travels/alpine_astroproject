export const COOKIE_CONSENT_KEY = 'voyaflair_cookie_consent';
export const COOKIE_PREFERENCES_KEY = 'voyaflair_cookie_preferences';

export const COOKIE_CONSENT_ACCEPTED = 'accepted';
export const COOKIE_CONSENT_DECLINED = 'declined';
export const COOKIE_CONSENT_CUSTOM = 'custom';

export interface CookiePreferences {
  analytics: boolean;
}

export const defaultCookiePreferences: CookiePreferences = {
  analytics: false,
};

export function parseCookiePreferences(raw: string | null): CookiePreferences {
  if (!raw) return { ...defaultCookiePreferences };

  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return {
      analytics: Boolean(parsed.analytics),
    };
  } catch {
    return { ...defaultCookiePreferences };
  }
}

export function getStoredConsentStatus(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY);
}

export function getStoredCookiePreferences(): CookiePreferences {
  if (typeof localStorage === 'undefined') return { ...defaultCookiePreferences };
  return parseCookiePreferences(localStorage.getItem(COOKIE_PREFERENCES_KEY));
}

export function hasStoredCookieChoice(): boolean {
  const status = getStoredConsentStatus();
  return status === COOKIE_CONSENT_ACCEPTED || status === COOKIE_CONSENT_DECLINED || status === COOKIE_CONSENT_CUSTOM;
}

/** @deprecated Use hasAnalyticsConsent instead */
export function hasCookieConsent(): boolean {
  return hasAnalyticsConsent();
}

export function hasAnalyticsConsent(): boolean {
  const status = getStoredConsentStatus();
  if (status === COOKIE_CONSENT_ACCEPTED) return true;
  if (status === COOKIE_CONSENT_DECLINED) return false;
  if (status === COOKIE_CONSENT_CUSTOM) return getStoredCookiePreferences().analytics;
  return false;
}

export function saveCookieChoice(status: string, preferences: CookiePreferences): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, status);
  localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
}

export function setCookieConsent(): void {
  saveCookieChoice(COOKIE_CONSENT_ACCEPTED, { analytics: true });
}
