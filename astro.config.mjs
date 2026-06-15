import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import sentry from '@sentry/astro';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import spotlightjs from '@spotlightjs/astro';

import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://johanna-travels.github.io',
  base: '/alpine_astroproject/',
  trailingSlash: 'always',
  integrations: [react(), tailwind(), ...(isProduction ? [sentry()] : []), ...(!isProduction ? [spotlightjs()] : []), sitemap()],
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