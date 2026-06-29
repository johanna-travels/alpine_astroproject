import { describe, expect, it, beforeEach } from 'vitest';
import {
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_CUSTOM,
  COOKIE_CONSENT_DECLINED,
  COOKIE_CONSENT_KEY,
  COOKIE_PREFERENCES_KEY,
  getStoredCookiePreferences,
  hasAnalyticsConsent,
  hasStoredCookieChoice,
  parseCookiePreferences,
  saveCookieChoice,
  setCookieConsent,
} from '@/lib/cookie-consent';

describe('cookie-consent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns false when no choice has been stored', () => {
    expect(hasStoredCookieChoice()).toBe(false);
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it('stores accepted consent with analytics enabled', () => {
    setCookieConsent();
    expect(hasStoredCookieChoice()).toBe(true);
    expect(hasAnalyticsConsent()).toBe(true);
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe(COOKIE_CONSENT_ACCEPTED);
    expect(getStoredCookiePreferences()).toEqual({ analytics: true });
  });

  it('stores declined consent without analytics', () => {
    saveCookieChoice(COOKIE_CONSENT_DECLINED, { analytics: false });
    expect(hasStoredCookieChoice()).toBe(true);
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it('stores custom preferences with analytics disabled', () => {
    saveCookieChoice(COOKIE_CONSENT_CUSTOM, { analytics: false });
    expect(hasStoredCookieChoice()).toBe(true);
    expect(hasAnalyticsConsent()).toBe(false);
    expect(localStorage.getItem(COOKIE_PREFERENCES_KEY)).toBe(JSON.stringify({ analytics: false }));
  });

  it('stores custom preferences with analytics enabled', () => {
    saveCookieChoice(COOKIE_CONSENT_CUSTOM, { analytics: true });
    expect(hasAnalyticsConsent()).toBe(true);
  });

  it('falls back safely for invalid preference JSON', () => {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, '{not-json');
    expect(parseCookiePreferences('{not-json')).toEqual({ analytics: false });
  });
});
