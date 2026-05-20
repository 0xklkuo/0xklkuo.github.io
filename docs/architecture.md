# Architecture

## System Goals

- Stay static-first and operationally small
- Keep route behavior explicit
- Centralize locale-aware decisions instead of duplicating them per page
- Keep optional integrations replaceable
- Make future enhancements incremental instead of rewrite-driven

## Core Subsystems

### 1. Site Configuration and Locale Metadata

- `src/lib/site.ts` stores site-wide constants and locale metadata.
- `src/lib/i18n.ts` handles locale validation, pathname normalization, locale switching, and localized route building.
- Locale-specific presentation copy lives in `src/lib/site-content.ts`.
- Markdown-backed full-page content remains readable in `src/pages/en/` and `src/pages/zh/`, with `about` in MDX and `privacy` / `terms` in Markdown.

### 2. Layout and Shared Shell

- `src/layouts/BaseLayout.astro` owns global metadata, canonical and alternate links, global theme bootstrapping, and analytics injection.
- `src/layouts/SiteLayout.astro` composes the shared shell.
- `src/layouts/MarkdownPageLayout.astro` keeps locale-specific MDX pages aligned with the same shell.
- `src/components/site/` contains reusable navigation, footer, theme toggle, icons, analytics, and social links.

### 3. Content and Blog Model

- `src/content/post/` stores blog content.
- `src/content.config.ts` defines the blog collection schema.
- `src/lib/markdown.mjs` adds build-time reading time.
- `src/lib/blog.ts` normalizes entries into blog posts, tag archives, alternate links, and related-post inputs.

### 4. Route Layer

- `src/pages/index.astro` redirects `/` to `/en/`.
- `src/pages/[locale]/` contains the shared locale-aware implementations for home, blog index, post detail, and tag archive routes.
- `src/pages/en/` and `src/pages/zh/` contain the locale-specific full-page Markdown/MDX documents such as `about`, `privacy`, and `terms`.
- `src/pages/404.astro` provides a static recovery page with locale entry links.

### 5. Client-Side Behavior

The site intentionally keeps client behavior small:

- theme preference persistence
- optional analytics script loading in production
- Astro opt-in prefetching on selected internal links such as primary navigation, blog cards, tags, legal links, and recovery links

## Routing Model

- `/` → redirect page to `/en/`
- `/[locale]/` → locale home page
- `/[locale]/about/` → locale-specific about page
- `/[locale]/privacy/` and `/[locale]/terms/` → locale-specific Markdown pages under `src/pages/en/` and `src/pages/zh/`
- `/[locale]/blog/` → locale blog index
- `/[locale]/[slug]/` → locale blog post detail route
- `/[locale]/tag/[tag]/` → locale tag archive

Reserved top-level slugs prevent blog posts from colliding with fixed site routes.

## Locale and Alternate-Link Behavior

- The locale switch only points to a translated sibling route when one exists.
- If a translated sibling post or tag archive does not exist, the locale switch falls back to that locale’s blog index.
- Default alternate links are generated from the canonical route, while blog routes can override them with route-aware alternates.

## Performance Model

- All pages are statically built.
- Images use Astro’s asset pipeline.
- Prefetching is opt-in and only applied to likely next clicks.
- Reading time is computed at build time instead of on the client.
- Analytics is omitted entirely when production configuration is absent.

## Validation Model

- `npm run format` and `npm run format:check` for formatting
- `npm run lint` for linting
- `npm run check` for Astro diagnostics
- `npm run test` for behavior-focused helper tests
- `npm run build` for static production output
- `npm run validate` as the single local and CI verification command

## Deployment Model

- The current deployment target is GitHub Pages.
- `public/CNAME` keeps the custom domain pinned.
- `public/.nojekyll` prevents Jekyll from interfering with Astro asset folders.
- `.github/workflows/ci.yml` validates pushes and pull requests.
- `.github/workflows/deploy.yml` validates, builds, uploads, and deploys `dist/`.
- Public analytics variables are declared in `astro.config.mjs` so local development, validation, and deployment stay aligned.

## Change Guidance

When extending the site:

- add shared locale-aware behavior in the helper layer before duplicating route logic
- prefer structured content maps or content collections for mirrored pages
- keep provider-specific integrations behind small adapters
- update `docs/spec.md` when scope or guardrails change
- update `README.md` only for quick-start or deployment-facing changes
