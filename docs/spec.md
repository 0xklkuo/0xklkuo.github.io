# Product Specification

## Objective

Keep `klkuo.guru` as a small, static-first personal site that is easy to understand, easy to evolve, and safe to upgrade over time.

## Current Product Direction

- The site is a public, content-led website with localized experiences for `en` and `zh`.
- `/` redirects to `/en/`.
- The blog index lives at `/[locale]/blog/`.
- Blog post detail pages keep the established locale-root slug shape where practical, such as `/en/my-post/`.
- Tag archives live at `/[locale]/tag/[tag]/`.
- Production analytics is optional and only loaded when the required public environment variables are present.
- The current deployment target is GitHub Pages on the custom domain `klkuo.guru`.

## Change Guardrails

- Preserve the static-first baseline unless a new product need clearly justifies more runtime complexity.
- Prefer native Astro patterns, typed configuration, and small helpers over layered abstractions.
- Keep public routes stable when practical, especially previously shared blog URLs.
- Keep metadata, canonical URLs, sitemap behavior, and locale alternates honest.
- Isolate optional integrations so providers, tools, and versions can change without broad rewrites.
- Allow the stack to move to maintained stable or LTS releases when the upgrade cost is justified.
- Leave room for future creator-facing capabilities such as product pages, landing pages, embedded tools, or subscribership flows without hardcoding them into today’s scope language.

## Current Scope

### Content and Pages

- Locale-prefixed public pages under `/en/` and `/zh/`
- Shared shell and markdown-backed policy pages
- Static blog pages generated from content collections
- Static tag archive pages generated from blog tags
- Locale-specific long-form about pages

### UX and Performance

- Dark mode
- Clear locale switching with safe fallbacks when a translated sibling route does not exist
- Accessible keyboard-friendly navigation
- Astro opt-in prefetching on high-intent internal links
- Minimal client-side behavior beyond theme preference and optional analytics

### SEO and Metadata

- Canonical URLs
- Route-aware hreflang output
- Per-page metadata
- `robots.txt`
- Sitemap generation
- Semantic content structure
- Estimated reading time on blog posts

### Validation and Operations

- Prettier, ESLint, `astro check`, Vitest, and production build verification
- CI validation on pushes and pull requests
- GitHub Pages deployment workflow

## Current Out-of-Scope Work

- Authenticated experiences or private user areas
- Custom backends for user submissions or operational workflows
- Extra client-side runtime layers unless they solve a clear product need
- On-site search unless it materially improves the site enough to justify its maintenance cost
