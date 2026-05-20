import { describe, expect, it } from 'vitest';

import { LOCALES } from './i18n';
import { getLegalNavigation, getPrimaryNavigation, siteContent, socialLinks } from './site-content';

describe('site content helpers', () => {
  it('builds locale-prefixed primary navigation for each locale', () => {
    for (const locale of LOCALES) {
      const navigation = getPrimaryNavigation(locale);

      expect(navigation).toHaveLength(5);
      expect(navigation[0]?.href).toBe(`/${locale}/`);
      expect(navigation.every((item) => item.href.startsWith(`/${locale}/`))).toBe(true);
      expect(navigation.every((item) => item.label.trim().length > 0)).toBe(true);
    }
  });

  it('keeps legal navigation aligned with privacy and terms routes', () => {
    for (const locale of LOCALES) {
      expect(getLegalNavigation(locale).map((item) => item.href)).toEqual([
        `/${locale}/privacy/`,
        `/${locale}/terms/`,
      ]);
    }
  });

  it('keeps locale content structures in parity and social links explicit', () => {
    expect(siteContent.en.home.features).toHaveLength(siteContent.zh.home.features.length);
    expect(siteContent.en.blog.keywords.length).toBeGreaterThan(0);
    expect(siteContent.zh.blog.keywords.length).toBeGreaterThan(0);
    expect(siteContent.en.home.legalTitle).toBeTruthy();
    expect(siteContent.zh.home.legalTitle).toBeTruthy();

    expect(new Set(socialLinks.map((link) => link.href)).size).toBe(socialLinks.length);
    expect(socialLinks.every((link) => link.href.startsWith('https://'))).toBe(true);
    expect(socialLinks.every((link) => link.label.trim().length > 0)).toBe(true);
  });
});
