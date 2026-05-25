export const site = {
  name: 'KL KUO',
  description:
    'Harmonize what matters. A minimal static personal site for writing, notes, and documentation.',
  url: 'https://klkuo.guru',
  domain: 'klkuo.guru',
  defaultLocale: 'en',
  locales: ['en', 'zh'],
  owner: 'KL KUO <https://klkuo.guru>',
} as const;

export type Locale = (typeof site.locales)[number];
