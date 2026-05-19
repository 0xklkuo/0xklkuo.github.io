import { describe, expect, it } from 'vitest';

import {
  getAlternateLocale,
  getAlternatePathname,
  getLocaleFromPathname,
  getLocalizedPath,
  isLocale,
  localizePathname,
  normalizePathname,
  stripLocaleFromPathname,
} from './i18n';

describe('i18n helpers', () => {
  it('normalizes root and nested paths', () => {
    expect(normalizePathname('')).toBe('/');
    expect(normalizePathname('/')).toBe('/');
    expect(normalizePathname('about')).toBe('/about/');
    expect(normalizePathname('/blog/post/')).toBe('/blog/post/');
  });

  it('builds locale-prefixed paths', () => {
    expect(getLocalizedPath('en')).toBe('/en/');
    expect(getLocalizedPath('zh', 'about')).toBe('/zh/about/');
  });

  it('detects locales from pathnames', () => {
    expect(getLocaleFromPathname('/en/about/')).toBe('en');
    expect(getLocaleFromPathname('/zh/')).toBe('zh');
    expect(getLocaleFromPathname('/about/')).toBeNull();
  });

  it('strips and reapplies locale prefixes', () => {
    expect(stripLocaleFromPathname('/en/about/')).toBe('/about/');
    expect(stripLocaleFromPathname('/zh/terms/')).toBe('/terms/');
    expect(stripLocaleFromPathname('/')).toBe('/');
    expect(localizePathname('/en/privacy/', 'zh')).toBe('/zh/privacy/');
    expect(localizePathname('/about/', 'en')).toBe('/en/about/');
  });

  it('validates and flips locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('jp')).toBe(false);
    expect(getAlternateLocale('en')).toBe('zh');
    expect(getAlternateLocale('zh')).toBe('en');
    expect(getAlternatePathname('/en/about/', 'en')).toBe('/zh/about/');
  });
});
