import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const postCollection = defineCollection({
  loader: glob({ base: './src/content/post', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

export const collections = {
  post: postCollection,
};
