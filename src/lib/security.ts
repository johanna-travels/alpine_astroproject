/**
 * Centralized security utility
 * Handles input sanitization and client-side rate limiting
 */

// ---------------------------------------------------------------------------
// Sanitization
// ---------------------------------------------------------------------------

/**
 * Strip characters and patterns that could be used for XSS injection.
 * Suitable for sanitizing any single string field before use or validation.
 */
export function sanitizeInput(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trimStart();
}

/**
 * Enforce a maximum character length on a value.
 */
export function limitLength(value: string, max: number): string {
  return value.slice(0, max);
}

/**
 * Sanitize and length-limit a string in one step.
 */
export function sanitizeField(value: string, max: number): string {
  return limitLength(sanitizeInput(value), max);
}

/**
 * Sanitize a full contact form payload.
 */
export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function sanitizeContactForm(values: ContactFormValues): ContactFormValues {
  return {
    name:    sanitizeField(values.name,    120),
    email:   sanitizeField(values.email,   254),
    subject: sanitizeField(values.subject, 160),
    message: sanitizeField(values.message, 2000),
  };
}

// ---------------------------------------------------------------------------
// Rate limiting (client-side, memory-based)
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}

const _store = new Map<string, RateLimitEntry>();

/**
 * Simple client-side rate limiter.
 * Returns true if the action is allowed, false if the limit is exceeded.
 *
 * @param key      - Unique key identifying the action (e.g. "contact-form")
 * @param limit    - Max attempts allowed within the window
 * @param windowMs - Time window in milliseconds (default: 60 seconds)
 */
export function isRateLimited(
  key: string,
  limit: number = 5,
  windowMs: number = 60_000
): boolean {
  const now = Date.now();
  const entry = _store.get(key);

  if (!entry || now - entry.firstAttempt > windowMs) {
    _store.set(key, { count: 1, firstAttempt: now });
    return false;
  }

  if (entry.count >= limit) {
    return true;
  }

  entry.count += 1;
  return false;
}

/**
 * Reset the rate limit counter for a given key.
 */
export function resetRateLimit(key: string): void {
  _store.delete(key);
}
