import { describe, expect, it } from 'vitest';

import { getLegalNavigation, getPrimaryNavigation, siteContent, socialLinks } from './site-content';

describe('site content helpers', () => {
  it('builds the primary navigation for each locale', () => {
    expect(getPrimaryNavigation('en')).toEqual([
      { href: '/en/', label: 'Home' },
      { href: '/en/blog/', label: 'Blog' },
      { href: '/en/about/', label: 'About' },
      { href: '/en/privacy/', label: 'Privacy' },
      { href: '/en/terms/', label: 'Terms' },
    ]);

    expect(getPrimaryNavigation('zh')[1]).toEqual({
      href: '/zh/blog/',
      label: '文章',
    });
  });

  it('keeps legal navigation and social links explicit', () => {
    expect(getLegalNavigation('en')).toHaveLength(2);
    expect(getLegalNavigation('zh')[0]).toEqual({
      href: '/zh/privacy/',
      label: '隱私政策',
    });
    expect(socialLinks.map((link) => link.label)).toEqual(['X', 'GitHub', 'Threads', 'LinkedIn']);
    expect(socialLinks.map((link) => link.icon)).toEqual([
      'brand-x',
      'brand-github',
      'brand-threads',
      'brand-linkedin',
    ]);
  });

  it('stores localized home and blog copy for both locales', () => {
    expect(siteContent.en.home.features).toHaveLength(3);
    expect(siteContent.en.home.writingAction).toBe('Browse the blog');
    expect(siteContent.en.blog.minutesRead).toBe('min read');
    expect(siteContent.zh.home.title).toBe('平衡。悠遊。暢玩。');
    expect(siteContent.zh.blog.backToIndex).toBe('返回文章列表');
    expect(siteContent.zh.blog.authorLabel).toBe('作者');
  });
});
