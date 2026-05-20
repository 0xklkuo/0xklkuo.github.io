# Architecture

## Principles

- Static by default.
- Small surface area.
- Typed configuration instead of layered indirection.
- Repository docs describe decisions before feature code expands.

## Current Foundation Structure

- `src/lib/site.ts` stores site-level constants.
- `src/lib/i18n.ts` stores locale and pathname helpers.
- `src/lib/site-content.ts` stores localized shell copy, navigation labels, and social links.
- `src/lib/blog.ts` normalizes content-collection entries into blog routes, tag routes, metadata, related-post inputs, and locale-switch behavior.
- `src/lib/markdown.mjs` adds the build-time reading-time remark plugin.
- `src/layouts/BaseLayout.astro` provides metadata, route-aware alternate locale links, global styles, and dark-mode bootstrapping.
- `src/layouts/SiteLayout.astro` composes the reusable shell.
- `src/layouts/MarkdownPageLayout.astro` wraps MDX and Markdown pages in the same shell.
- `src/components/site/Header.astro` and `src/components/site/Footer.astro` implement the shared locale-aware navigation.
- `src/components/blog/` contains the rebuilt static blog list, tag, and related-post presentation pieces.
- `src/pages/index.astro` redirects to `/en/`.
- `src/pages/en/` and `src/pages/zh/` contain locale-prefixed home, blog, tag, about, privacy, and terms pages.
- `src/content/post/` stores blog Markdown content wired into the rebuilt blog routes.
- `src/content.config.ts` defines the blog content collection schema.
- `src/styles/global.css` imports Tailwind CSS v4 and the site color/font tokens.

## Routing Model

- `/` is a static redirect page to `/en/`.
- `/en/` is the default public locale entry.
- `/zh/` is the secondary locale entry.
- `/en/about/`, `/zh/about/`, `/en/privacy/`, `/zh/privacy/`, `/en/terms/`, and `/zh/terms/` are now backed by the shared shell.
- `/en/blog/` and `/zh/blog/` render locale-specific post indexes from the `post` collection.
- `/en/[slug]/` and `/zh/[slug]/` preserve existing post detail URLs where practical.
- `/en/tag/[tag]/` and `/zh/tag/[tag]/` render static tag archives.

## Styling Model

- Tailwind CSS v4 is added through `@tailwindcss/vite` in `astro.config.mjs`.
- Tailwind utilities are globally available through `src/styles/global.css`.
- The color palette and preferred font stacks are restored as CSS tokens.
- A minimal self-hosted Fontsource set is loaded for the currently used sans, heading, mono, and Chinese text paths.
- The Vite alias `~ -> ./src` is restored so blog content can keep concise asset references such as `~/assets/images/blog/example.png`.
- Dark mode is class-driven using `html.dark` to keep behavior explicit and easy to test.

## Content Model

- Static pages use MDX where it helps readability.
- Blog posts live in the `post` content collection.
- Blog frontmatter remains intentionally small: title, summary text, publish dates, draft state, tags, image, and optional author.
- Blog locale and slug are derived from the collection entry id, so content files keep routing explicit without a second permalink layer.
- Blog post reading time is computed at build time by the remark plugin and rendered in the post header.
- Blog detail pages only emit hreflang alternates for translated sibling posts. Tag archives follow the same rule. When a sibling translation is missing, the locale switch falls back to the locale blog index.

## Tooling Model

- Formatting uses Prettier.
- Linting uses ESLint with Astro and TypeScript rules.
- Structural validation uses `astro check`.
- Unit tests use Vitest, including pure helper coverage for i18n, site copy, and blog routing logic.
- `npm run validate` is the one-command baseline for local and CI verification.

## Deployment Model

- Build target is static output only.
- GitHub Pages is the deployment target.
- `public/CNAME` pins the custom domain.
- `site` is set to `https://klkuo.guru` in Astro config for sitemap and canonical URL correctness.
