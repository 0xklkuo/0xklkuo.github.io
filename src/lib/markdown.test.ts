import { describe, expect, it } from 'vitest';

import { estimateReadingTime } from './markdown.mjs';

describe('markdown helpers', () => {
  it('estimates reading time with a one-minute minimum', () => {
    expect(estimateReadingTime('')).toBe(1);
    expect(estimateReadingTime('word '.repeat(200))).toBe(1);
    expect(estimateReadingTime('word '.repeat(201))).toBe(2);
  });
});
