import type { ImageMetadata } from 'astro';

import { LOCALES, getAlternateLocale, getLocalizedPath, isLocale, type Locale } from './i18n';
import { localeMetadata } from './site';

type BlogImageModule = ImageMetadata;

type BlogEntryData = {
  title: string;
  excerpt?: string;
  description?: string;
  publishDate: Date;
  updatedDate?: Date;
  draft?: boolean;
  tags: readonly string[];
  image?: string;
  author?: string;
};

export type BlogEntryLike = {
  id: string;
  body?: string;
  data: BlogEntryData;
};

export type BlogPost = {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt?: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  draft: boolean;
  tags: string[];
  image?: ImageMetadata;
  imagePath?: string;
  author?: string;
  permalink: string;
  indexPath: string;
};

export type BlogTag = {
  label: string;
  slug: string;
  count: number;
  path: string;
};

export const RESERVED_BLOG_SLUGS = ['about', 'privacy', 'terms', 'blog', 'tag'] as const;

const reservedBlogSlugSet = new Set<string>(RESERVED_BLOG_SLUGS);
const blogDateFormatters = new Map<Locale, Intl.DateTimeFormat>();

const blogImageModules = import.meta.glob('../assets/images/blog/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, BlogImageModule>;

const blogImages = new Map<string, ImageMetadata>(
  Object.entries(blogImageModules).flatMap(([path, metadata]) => {
    const fileName = path.split('/').pop();

    return [
      [path, metadata],
      [path.replace('../', '~/'), metadata],
      fileName ? [`~/assets/images/blog/${fileName}`, metadata] : null,
    ].filter(Boolean) as [string, ImageMetadata][];
  }),
);

export function parseBlogEntryId(id: string): { locale: Locale; slug: string } {
  const segments = id.split('/').filter(Boolean);
  const [locale, ...slugParts] = segments;

  if (!locale || !isLocale(locale)) {
    throw new Error(`Expected post id to start with a supported locale: ${id}`);
  }

  const slug = slugParts.join('/').replace(/\.(md|mdx)$/i, '');

  if (!slug) {
    throw new Error(`Expected post id to include a slug after the locale: ${id}`);
  }

  return { locale, slug };
}

export function assertValidBlogSlug(slug: string): string {
  const normalized = slug.trim().replace(/^\/+|\/+$/g, '');

  if (!normalized) {
    throw new Error('Expected blog slug to be non-empty.');
  }

  if (normalized.includes('/')) {
    throw new Error(`Expected blog slug to be a single path segment: ${slug}`);
  }

  if (reservedBlogSlugSet.has(normalized.toLowerCase())) {
    throw new Error(`Blog slug is reserved by a site route and cannot be used: ${slug}`);
  }

  return normalized;
}

export function getBlogTagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getBlogIndexPath(locale: Locale): string {
  return getLocalizedPath(locale, 'blog');
}

export function getBlogPostPath(locale: Locale, slug: string): string {
  return getLocalizedPath(locale, assertValidBlogSlug(slug));
}

export function getBlogTagPath(locale: Locale, tag: string): string {
  const slug = getBlogTagSlug(tag);

  if (!slug) {
    throw new Error(`Expected tag to normalize to a non-empty slug: ${tag}`);
  }

  return getLocalizedPath(locale, `tag/${slug}`);
}

export function resolveBlogImage(imagePath?: string): ImageMetadata | undefined {
  return imagePath ? blogImages.get(imagePath) : undefined;
}

export function getBlogDescription(entry: BlogEntryLike): string {
  return entry.data.description ?? entry.data.excerpt ?? '';
}

export function isPublishedBlogEntry(entry: BlogEntryLike): boolean {
  return entry.data.draft !== true;
}

export function sortBlogEntries<T extends BlogEntryLike>(entries: T[]): T[] {
  return [...entries].sort((left, right) => {
    const byDate = right.data.publishDate.valueOf() - left.data.publishDate.valueOf();

    if (byDate !== 0) {
      return byDate;
    }

    return left.id.localeCompare(right.id);
  });
}

export function getLocaleBlogEntries<T extends BlogEntryLike>(
  entries: T[],
  locale: Locale,
  options?: { includeDrafts?: boolean },
): T[] {
  return sortBlogEntries(entries).filter((entry) => {
    const parsed = parseBlogEntryId(entry.id);

    if (parsed.locale !== locale) {
      return false;
    }

    assertValidBlogSlug(parsed.slug);

    return options?.includeDrafts ? true : isPublishedBlogEntry(entry);
  });
}

export function normalizeBlogPost(entry: BlogEntryLike): BlogPost {
  const { locale, slug: rawSlug } = parseBlogEntryId(entry.id);
  const slug = assertValidBlogSlug(rawSlug);

  return {
    id: entry.id,
    locale,
    slug,
    title: entry.data.title,
    excerpt: entry.data.excerpt,
    description: getBlogDescription(entry),
    publishDate: entry.data.publishDate,
    updatedDate: entry.data.updatedDate,
    draft: entry.data.draft === true,
    tags: [...entry.data.tags],
    image: resolveBlogImage(entry.data.image),
    imagePath: entry.data.image,
    author: entry.data.author,
    permalink: getBlogPostPath(locale, slug),
    indexPath: getBlogIndexPath(locale),
  };
}

export function getLocaleBlogPosts<T extends BlogEntryLike>(
  entries: T[],
  locale: Locale,
  options?: { includeDrafts?: boolean },
): BlogPost[] {
  return getLocaleBlogEntries(entries, locale, options).map(normalizeBlogPost);
}

export function getBlogTags(posts: BlogPost[], locale: Locale): BlogTag[] {
  const tags = new Map<string, BlogTag>();

  for (const post of posts) {
    if (post.locale !== locale) {
      continue;
    }

    for (const tag of post.tags) {
      const slug = getBlogTagSlug(tag);

      if (!slug) {
        continue;
      }

      const existing = tags.get(slug);

      if (existing) {
        existing.count += 1;
        continue;
      }

      tags.set(slug, {
        label: tag,
        slug,
        count: 1,
        path: getBlogTagPath(locale, tag),
      });
    }
  }

  return [...tags.values()].sort((left, right) => left.label.localeCompare(right.label));
}

export function findBlogPostsByTag(posts: BlogPost[], locale: Locale, tagSlug: string): BlogPost[] {
  const normalizedTagSlug = getBlogTagSlug(tagSlug);

  if (!normalizedTagSlug) {
    return [];
  }

  return posts.filter(
    (post) =>
      post.locale === locale && post.tags.some((tag) => getBlogTagSlug(tag) === normalizedTagSlug),
  );
}

export function getBlogTagArchive(posts: BlogPost[], locale: Locale, tagSlug: string) {
  const normalizedTagSlug = getBlogTagSlug(tagSlug);
  const matchingPosts = findBlogPostsByTag(posts, locale, normalizedTagSlug);

  if (matchingPosts.length === 0) {
    return null;
  }

  const label =
    matchingPosts
      .flatMap((post) => post.tags)
      .find((tag) => getBlogTagSlug(tag) === normalizedTagSlug) ?? normalizedTagSlug;

  return {
    label,
    slug: normalizedTagSlug,
    path: getBlogTagPath(locale, label),
    posts: matchingPosts,
  };
}

export function getBlogAlternateLinks(
  posts: BlogPost[],
  currentPost: BlogPost,
): Partial<Record<Locale, string>> | null {
  const matches = posts.filter((post) => post.slug === currentPost.slug);

  if (matches.length <= 1) {
    return null;
  }

  return matches.reduce<Partial<Record<Locale, string>>>((links, post) => {
    links[post.locale] = post.permalink;
    return links;
  }, {});
}

export function getBlogTagAlternateLinks(
  posts: BlogPost[],
  tagSlug: string,
): Partial<Record<Locale, string>> | null {
  const normalizedTagSlug = getBlogTagSlug(tagSlug);
  const links = LOCALES.reduce<Partial<Record<Locale, string>>>((result, locale) => {
    const matchingPosts = findBlogPostsByTag(posts, locale, normalizedTagSlug);

    if (matchingPosts.length > 0) {
      result[locale] = getBlogTagPath(locale, normalizedTagSlug);
    }

    return result;
  }, {});

  return Object.keys(links).length > 1 ? links : null;
}

export function getLocaleSwitchPath(
  currentLocale: Locale,
  alternateLinks: Partial<Record<Locale, string>> | null,
  fallbackPath: string,
): string {
  const targetLocale = getAlternateLocale(currentLocale);

  return alternateLinks?.[targetLocale] ?? fallbackPath;
}

export function formatBlogDate(date: Date, locale: Locale): string {
  const formatter =
    blogDateFormatters.get(locale) ??
    new Intl.DateTimeFormat(localeMetadata[locale].dateLocale, {
      dateStyle: 'long',
      timeZone: 'UTC',
    });

  blogDateFormatters.set(locale, formatter);

  return formatter.format(date);
}

export function pickRelatedBlogPosts(
  posts: BlogPost[],
  currentPost: BlogPost,
  count = 3,
): BlogPost[] {
  return posts
    .filter((post) => post.locale === currentPost.locale && post.id !== currentPost.id)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag)).length;

      return { post, sharedTags };
    })
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((left, right) => {
      if (right.sharedTags !== left.sharedTags) {
        return right.sharedTags - left.sharedTags;
      }

      return right.post.publishDate.valueOf() - left.post.publishDate.valueOf();
    })
    .slice(0, count)
    .map(({ post }) => post);
}
