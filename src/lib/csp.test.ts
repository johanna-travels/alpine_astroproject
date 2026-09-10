import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getAstroCspConfig,
  getCspScriptResources,
  PRODUCTION_CSP_OPTIONS,
} from '@/lib/csp';

describe('production CSP', () => {
  it('does not allow script unsafe-inline (Astro hashes instead)', () => {
    expect(getCspScriptResources(PRODUCTION_CSP_OPTIONS)).not.toContain("'unsafe-inline'");
    expect(getAstroCspConfig().scriptDirective.resources).not.toContain("'unsafe-inline'");
  });

  it('keeps frame-ancestors for the HTTP header', () => {
    expect(getAstroCspConfig().directives).toContain("frame-ancestors 'self'");
  });

  it('does not put a static CSP in public/_headers (hashes are per page)', () => {
    const raw = readFileSync(resolve(process.cwd(), 'public/_headers'), 'utf8');
    expect(raw).not.toMatch(/Content-Security-Policy:/i);
  });
});
