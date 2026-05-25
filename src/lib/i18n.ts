import { site, type Locale } from './site';

export { type Locale };

export const DEFAULT_LOCALE = site.defaultLocale;
export const LOCALES = site.locales;

type HomeCopy = {
  altLocaleLabel: string;
  themeToggleLabel: string;
  foundationLabel: string;
  homeTitle: string;
  homeDescription: string;
  decisionsTitle: string;
  decisions: string[];
  nextTitle: string;
  nextBody: string;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    altLocaleLabel: '中文',
    themeToggleLabel: 'Toggle dark mode',
    foundationLabel: 'Milestone 1 foundation',
    homeTitle: 'Minimal static foundation reset',
    homeDescription:
      'The site is being rebuilt as a pure static Astro project with a smaller architecture, explicit decision documents, and a cleaner toolchain.',
    decisionsTitle: 'Explicit decisions',
    decisions: [
      'Pure static Astro output only. No server actions, middleware, or server adapter.',
      'Tailwind CSS v4 via the official Vite plugin.',
      'Astro i18n with /en/ and /zh/ routes, with / redirecting to /en/.',
      'GitHub Pages is the deployment target, using the custom domain klkuo.guru.',
    ],
    nextTitle: 'Next milestone',
    nextBody:
      'Build the reusable site shell, locale navigation, and the first MDX-based content pages on top of this foundation.',
  },
  zh: {
    altLocaleLabel: 'English',
    themeToggleLabel: '切換深色模式',
    foundationLabel: '里程碑 1：基礎重置',
    homeTitle: '最小化純靜態基礎已重整',
    homeDescription:
      '這個網站正在重建為純靜態 Astro 專案，目標是更小的架構、更明確的決策文件，以及更乾淨的工具鏈。',
    decisionsTitle: '已明確記錄的決策',
    decisions: [
      '只保留純靜態 Astro 輸出，不使用 server actions、middleware 或 server adapter。',
      '使用官方 Vite 外掛導入 Tailwind CSS v4。',
      '採用 Astro i18n，保留 /en/ 與 /zh/，並讓 / 重新導向到 /en/。',
      '部署目標為 GitHub Pages，並使用自訂網域 klkuo.guru。',
    ],
    nextTitle: '下一個里程碑',
    nextBody: '在這個基礎上建立可重用的網站骨架、語系導覽，以及第一批 MDX 靜態頁面。',
  },
};

export function isLocale(value: string): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

export function normalizePathname(pathname = '/'): string {
  const trimmed = pathname.trim();

  if (trimmed === '' || trimmed === '/') {
    return '/';
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}

export function getLocalizedPath(locale: Locale, pathname = '/'): string {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath === '/') {
    return `/${locale}/`;
  }

  return `/${locale}${normalizedPath}`;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [maybeLocale] = pathname.split('/').filter(Boolean);

  return maybeLocale && isLocale(maybeLocale) ? maybeLocale : null;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'zh' : 'en';
}
