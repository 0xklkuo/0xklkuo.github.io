# Product Specification

## Objective

Refactor `klkuo.guru` into a minimal, pure static personal site that is easy to reason about, easy to ship, and easy to maintain over time.

## Explicit Decisions

- The site uses Astro v6, Tailwind CSS v4, and TypeScript v5.
- The site is static-only. No middleware, server actions, private routes, or server adapters are allowed.
- GitHub Pages is the deployment target.
- The custom domain is `klkuo.guru`.
- Supported locales are `en` and `zh`.
- `/` redirects to `/en/`.
- Markdown and MDX are used for static pages and docs.
- Astro content collections are used for blog content.
- Search optimization means SEO and crawlability, not client-side site search.
- Existing blog slugs should be preserved when practical.
- The blog index should live at `/[locale]/blog/`, while blog post detail pages should remain at `/[locale]/<slug>/` where practical to avoid breaking previous public URLs.
- Tag archives should live at `/[locale]/tag/<tag>/`.
- Web analytics provider details should stay out of source code and be loaded from public environment variables in production builds.
- The analytics script should be injected into the document head only when the required public environment variables are present.
- Blog locale switching and hreflang output should only point to translated sibling posts or translated tag archives when they exist. If a sibling translation does not exist, the UI should fall back to the locale blog index instead of linking to a 404 route.

## Goals

- Keep the codebase small and explicit.
- Prefer first-party Astro patterns over framework-specific abstractions.
- Make core decisions visible in repository docs.
- Keep the project static, fast, and deployable from GitHub alone.
- Add a validation baseline with formatting, linting, checks, tests, and build verification.

## Non-Goals

- No mailing list backend.
- No survey workflow.
- No HTMX, Alpine, or similar DOM-driven runtime layer.
- No AstroWind integration or configuration layer.
- No vanity redirect routes.
- No on-site search in this rewrite scope.

## Functional Scope

### Pages

- Locale-prefixed public pages under `/en/` and `/zh/`.
- Static MDX pages for intros and documentation.
- Static blog pages generated from content collections.
- Static tag archive pages generated from blog tags.

### UX Foundations

- Dark mode.
- Clear locale switching.
- Accessible, keyboard-friendly navigation.
- Minimal layout and predictable routing.

### SEO Foundations

- Canonical URLs.
- Metadata per page.
- `robots.txt`.
- Sitemap generation.
- Semantic content structure.
- Estimated reading time on blog posts.
- Route-aware hreflang output that does not advertise untranslated blog detail or tag archive pages.

## Milestone Acceptance Criteria

### Milestone 1: Foundation Reset

- Dynamic and AstroWind-specific code is removed.
- The repo builds as a pure static Astro project.
- Tailwind CSS v4 is installed and active.
- Core docs exist and record the decisions above.
- `format`, `lint`, `check`, `test`, and `build` scripts exist and pass.

### Milestone 2: Site Shell and I18n

- Reusable layout, navigation, and footer are in place.
- `en` and `zh` static pages render from the new shell.
- Dark mode and locale switching work in the new UI.

### Milestone 3: Blog and SEO

- Blog index, tag archive, and post pages render from content collections.
- Existing slugs are preserved where practical, including locale-root blog post detail routes.
- Metadata, sitemap, canonical URL behavior, reading time, and locale-aware alternate links are verified against the rebuilt routes.

### Milestone 4: Analytics and Deployment

- Analytics is integrated cleanly and stays optional by configuration.
- GitHub Actions deploy the site to GitHub Pages from the validated static build output.
- The custom domain remains intact.

### Milestone 5: Hardening

- Helper logic is covered by tests where valuable.
- Docs are updated to match shipped behavior.
- Final cleanup removes leftover rewrite scaffolding.
