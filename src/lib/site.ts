export const localeMetadata = {
  en: {
    htmlLang: 'en',
    label: 'English',
    switchLabel: '中文',
    alternateLocale: 'zh',
    ogLocale: 'en_US',
    dateLocale: 'en-US',
    pageLabel: 'Page',
  },
  zh: {
    htmlLang: 'zh',
    label: '繁體中文',
    switchLabel: 'English',
    alternateLocale: 'en',
    ogLocale: 'zh_TW',
    dateLocale: 'zh-TW',
    pageLabel: '頁面',
  },
} as const;

export type Locale = keyof typeof localeMetadata;

export const site = {
  name: 'KL KUO',
  tagline: 'Harmonize. Master. Play.',
  description:
    'A slash dad exploring nature and technology to build a better life under real constraints.',
  url: 'https://klkuo.guru',
  domain: 'klkuo.guru',
  email: 'hey@klkuo.guru',
  defaultLocale: 'en',
  locales: Object.keys(localeMetadata) as Locale[],
  owner: 'KL KUO <https://klkuo.guru>',
} as const;
