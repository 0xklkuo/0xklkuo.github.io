import { describe, expect, it } from 'vitest';

import {
  estimateReadingTime,
  externalLinksRehypePlugin,
  readingTimeRemarkPlugin,
} from './markdown.mjs';

describe('external links', () => {
  const transform = externalLinksRehypePlugin({ site: 'https://klkuo.guru' });
  const link = (href: string, properties: Record<string, unknown> = {}) => ({
    type: 'element',
    tagName: 'a',
    properties: { href, ...properties },
    children: [],
  });

  it.each(['https://example.com/page', 'http://example.com', '//example.com/page'])(
    'opens an external web link in a new tab: %s',
    (href) => {
      const anchor = link(href);
      const tree = {
        type: 'root',
        children: [{ type: 'element', tagName: 'p', children: [anchor] }],
      };

      transform(tree);

      expect(anchor.properties).toMatchObject({
        href,
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      });
    },
  );

  it.each([
    '/en/blog/',
    '../about/',
    '#start-here',
    '?page=2',
    'https://klkuo.guru/en/about/',
    '//klkuo.guru/zh/',
    'mailto:hey@klkuo.guru',
    'tel:+1234567890',
    'https://[invalid',
  ])('leaves internal, non-web, and invalid links unchanged: %s', (href) => {
    const anchor = link(href);

    transform(anchor);

    expect(anchor.properties).toEqual({ href });
  });

  it.each([{ rel: ['nofollow', 'noopener'] }, { rel: 'nofollow noopener' }])(
    'preserves existing relationship tokens without duplicating security tokens: $rel',
    ({ rel }) => {
      const anchor = link('https://example.com', { rel, target: '_self' });

      transform(anchor);
      transform(anchor);

      expect(anchor.properties).toMatchObject({
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer'],
      });
    },
  );

  it('leaves anchors without href unchanged', () => {
    const anchor = { type: 'element', tagName: 'a', properties: { id: 'start' } };

    transform(anchor);

    expect(anchor.properties).toEqual({ id: 'start' });
  });
});

describe('markdown helpers', () => {
  it('estimates reading time with a one-minute minimum', () => {
    expect(estimateReadingTime('')).toBe(1);
    expect(estimateReadingTime('word '.repeat(200))).toBe(1);
    expect(estimateReadingTime('word '.repeat(201))).toBe(2);
  });

  it('writes reading time into Astro frontmatter during remark processing', () => {
    const plugin = readingTimeRemarkPlugin();
    const tree = {
      type: 'root',
      children: [{ type: 'text', value: 'word '.repeat(240) }],
    };
    const file = { data: {} } as { data: Record<string, unknown> };

    plugin(tree, file as never);

    expect(file.data).toMatchObject({
      astro: {
        frontmatter: {
          readingTime: 2,
        },
      },
    });
  });
});
