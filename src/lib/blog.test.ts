import { describe, expect, it } from 'vitest';

import {
  assertValidBlogSlug,
  formatBlogDate,
  getBlogAlternateLinks,
  getBlogIndexPath,
  getBlogPostPath,
  getBlogTagAlternateLinks,
  getBlogTagArchive,
  getBlogTagPath,
  getBlogTagSlug,
  getBlogTags,
  getLocaleBlogEntries,
  getLocaleBlogPosts,
  getLocaleSwitchPath,
  normalizeBlogPost,
  parseBlogEntryId,
  pickRelatedBlogPosts,
  resolveBlogImage,
} from './blog';

const fixtures = [
  {
    id: 'en/alpha',
    body: 'word '.repeat(220),
    data: {
      title: 'Alpha',
      excerpt: 'Alpha excerpt',
      publishDate: new Date('2024-01-01T00:00:00Z'),
      tags: ['focus', 'systems'],
      image: '~/assets/images/blog/how-to-build-wealth-from-nothing.png',
    },
  },
  {
    id: 'en/beta',
    body: 'word '.repeat(120),
    data: {
      title: 'Beta',
      description: 'Beta description',
      publishDate: new Date('2025-02-15T00:00:00Z'),
      tags: ['systems', 'Agile Team'],
    },
  },
  {
    id: 'en/gamma',
    body: 'word '.repeat(90),
    data: {
      title: 'Gamma',
      excerpt: 'Gamma excerpt',
      publishDate: new Date('2023-04-10T00:00:00Z'),
      draft: true,
      tags: ['focus'],
    },
  },
  {
    id: 'zh/alpha',
    body: '詞 '.repeat(180),
    data: {
      title: '阿法',
      excerpt: 'Alpha zh excerpt',
      publishDate: new Date('2024-01-01T00:00:00Z'),
      tags: ['focus'],
    },
  },
] as const;

describe('blog helpers', () => {
  it('parses localized entry ids and builds legacy-compatible routes', () => {
    expect(parseBlogEntryId('en/alpha')).toEqual({ locale: 'en', slug: 'alpha' });
    expect(getBlogIndexPath('en')).toBe('/en/blog/');
    expect(getBlogPostPath('zh', 'alpha')).toBe('/zh/alpha/');
    expect(getBlogTagSlug('Agile Team')).toBe('agile-team');
    expect(getBlogTagPath('en', 'Agile Team')).toBe('/en/tag/agile-team/');
  });

  it('guards reserved or invalid top-level post slugs', () => {
    expect(assertValidBlogSlug('alpha')).toBe('alpha');
    expect(() => assertValidBlogSlug('blog')).toThrow(/reserved/i);
    expect(() => assertValidBlogSlug('nested/post')).toThrow(/single path segment/i);
  });

  it('filters blog entries by locale, publication state, and publish date', () => {
    expect(getLocaleBlogEntries([...fixtures], 'en').map((entry) => entry.id)).toEqual([
      'en/beta',
      'en/alpha',
    ]);

    expect(
      getLocaleBlogEntries([...fixtures], 'en', { includeDrafts: true }).map((entry) => entry.id),
    ).toEqual(['en/beta', 'en/alpha', 'en/gamma']);
  });

  it('normalizes posts for routing, metadata, and asset lookup', () => {
    const post = normalizeBlogPost(fixtures[0]);

    expect(post.locale).toBe('en');
    expect(post.slug).toBe('alpha');
    const resolvedImage = resolveBlogImage(
      '~/assets/images/blog/how-to-build-wealth-from-nothing.png',
    );

    expect(post.description).toBe('Alpha excerpt');
    expect(post.permalink).toBe('/en/alpha/');
    expect(post.indexPath).toBe('/en/blog/');
    expect(post.imagePath).toBe('~/assets/images/blog/how-to-build-wealth-from-nothing.png');
    expect(post.image?.src).toBe(resolvedImage?.src);
  });

  it('builds alternate locale links, locale switch fallbacks, and tag archives', () => {
    const posts = getLocaleBlogPosts([...fixtures], 'en').concat(
      getLocaleBlogPosts([...fixtures], 'zh'),
    );
    const englishAlpha = posts.find((post) => post.id === 'en/alpha');
    const englishBeta = posts.find((post) => post.id === 'en/beta');

    expect(englishAlpha).toBeDefined();
    expect(englishBeta).toBeDefined();

    expect(getBlogAlternateLinks(posts, englishAlpha!)).toEqual({
      en: '/en/alpha/',
      zh: '/zh/alpha/',
    });
    expect(getBlogAlternateLinks(posts, englishBeta!)).toBeNull();
    expect(
      getLocaleSwitchPath('en', getBlogAlternateLinks(posts, englishAlpha!), '/zh/blog/'),
    ).toBe('/zh/alpha/');
    expect(getLocaleSwitchPath('en', null, '/zh/blog/')).toBe('/zh/blog/');

    expect(getBlogTags(posts, 'en').map((tag) => tag.slug)).toEqual([
      'agile-team',
      'focus',
      'systems',
    ]);
    expect(getBlogTagArchive(posts, 'en', 'systems')?.posts.map((post) => post.id)).toEqual([
      'en/beta',
      'en/alpha',
    ]);
    expect(getBlogTagAlternateLinks(posts, 'focus')).toEqual({
      en: '/en/tag/focus/',
      zh: '/zh/tag/focus/',
    });
    expect(getBlogTagAlternateLinks(posts, 'systems')).toBeNull();
  });

  it('formats dates consistently and can pick related posts from shared tags', () => {
    const posts = getLocaleBlogPosts([...fixtures], 'en', { includeDrafts: true });
    const current = posts.find((post) => post.id === 'en/alpha');

    expect(current).toBeDefined();
    expect(formatBlogDate(new Date('2025-08-19T08:00:00Z'), 'en')).toBe('August 19, 2025');
    expect(formatBlogDate(new Date('2025-08-19T08:00:00Z'), 'zh')).toBe('2025年8月19日');
    expect(pickRelatedBlogPosts(posts, current!, 2).map((post) => post.id)).toEqual([
      'en/beta',
      'en/gamma',
    ]);
  });
});
