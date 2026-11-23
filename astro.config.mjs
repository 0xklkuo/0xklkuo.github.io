import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { externalLinksRehypePlugin, readingTimeRemarkPlugin } from './src/lib/markdown.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = 'https://klkuo.guru';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [[externalLinksRehypePlugin, { site: siteUrl }]],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  prefetch: true,
  env: {
    schema: {
      PUBLIC_ANALYTICS_SCRIPT_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_ANALYTICS_WEBSITE_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_ANALYTICS_DOMAINS: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
