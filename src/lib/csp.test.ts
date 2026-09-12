import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getAstroCspConfig,
  getCspDirectives,
  getCspScriptResources,
  PRODUCTION_CSP_OPTIONS,
} from '@/lib/csp';

describe('production CSP', () => {
  it('allows GA4 collect endpoints so Accept can show in Realtime', () => {
    const connect = getCspDirectives(PRODUCTION_CSP_OPTIONS).find((row) =>
      row.startsWith('connect-src'),
    );
    expect(connect).toContain('https://www.googletagmanager.com');
    expect(connect).toContain('https://*.analytics.google.com');
  });

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

  it('does not use define:vars in Astro scripts (forces unhashed inline JS)', () => {
    const srcRoot = resolve(process.cwd(), 'src');
    const hits: string[] = [];

    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
          continue;
        }
        if (!entry.name.endsWith('.astro')) continue;
        const text = readFileSync(full, 'utf8');
        // Μόνο το directive (`define:vars={`)· τα σχόλια που το εξηγούν δεν μετράνε.
        if (text.includes('define:vars={')) {
          hits.push(full.replace(`${process.cwd()}/`, ''));
        }
      }
    };

    walk(srcRoot);
    expect(hits).toEqual([]);
  });
});
