import { getAstroCspConfig } from './src/lib/csp.ts';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

import sentry from '@sentry/astro';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import spotlightjs from '@spotlightjs/astro';

import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  output: 'static',
  // staticHeaders: το Astro στέλνει το CSP ως HTTP header (hashes ανά σελίδα), όχι μόνο meta.
  adapter: isProduction ? netlify({ staticHeaders: true }) : undefined,
  site: process.env.SITE_URL || 'https://voyaflair.com',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  redirects: {
    '/articles/belgium-coming-soon': '/articles/bruges-christmas-markets',
    '/articles/christmas-markets-in-bruges': '/articles/bruges-christmas-markets',
  },
  compressHTML: true,
  // Hashes στα bundled scripts — χωρίς 'unsafe-inline' στο script-src.
  security: {
    csp: getAstroCspConfig(),
  },
  devToolbar: {
    enabled: process.env.PLAYWRIGHT !== '1',
  },
  integrations: [react(), tailwind(), ...(isProduction ? [sentry()] : []), ...(!isProduction ? [spotlightjs()] : []), sitemap({
    filter: (page) => !page.includes('/preferences/'),
  })],
  image: {
    layout: 'constrained',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
    },
  },
});