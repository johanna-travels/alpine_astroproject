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
  adapter: netlify(),
  site: process.env.SITE_URL || 'https://voyaflair.com',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  compressHTML: true,
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
      cssCodeSplit: true,
    },
  },
});