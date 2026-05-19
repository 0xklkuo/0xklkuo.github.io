export const site = {
  name: 'KL KUO',
  tagline: 'Harmonize what matters. Transurfing intended realities. Play own games.',
  description:
    'Just a slash dad exploring nature and tech to play better games toward an optimal life.',
  url: 'https://klkuo.guru',
  domain: 'klkuo.guru',
  email: 'hey@klkuo.guru',
  defaultLocale: 'en',
  locales: ['en', 'zh'],
  owner: 'KL KUO <https://klkuo.guru>',
} as const;

export type Locale = (typeof site.locales)[number];
