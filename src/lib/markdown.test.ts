import { describe, expect, it } from 'vitest';

import { estimateReadingTime, readingTimeRemarkPlugin } from './markdown.mjs';

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
