import { localeMetadata, site, type Locale } from './site';

export { type Locale };

export const DEFAULT_LOCALE = site.defaultLocale;
export const LOCALES = site.locales;

export function isLocale(value: string): value is Locale {
  return value in localeMetadata;
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    throw new Error(`Expected a supported locale, received: ${value}`);
  }

  return value;
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

export function stripLocaleFromPathname(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);
  const locale = getLocaleFromPathname(normalizedPath);

  if (!locale) {
    return normalizedPath;
  }

  const withoutLocale = normalizedPath.replace(`/${locale}`, '');

  return withoutLocale === '' ? '/' : normalizePathname(withoutLocale);
}

export function localizePathname(pathname: string, locale: Locale): string {
  return getLocalizedPath(locale, stripLocaleFromPathname(pathname));
}

export function getAlternateLocale(locale: Locale): Locale {
  return localeMetadata[locale].alternateLocale;
}

export function getAlternatePathname(pathname: string, locale: Locale): string {
  return localizePathname(pathname, getAlternateLocale(locale));
}
