# klkuo.guru

Minimal static personal site for KL KUO.

## Status

Milestones 1, 2, 3, and 4 are in place:

- AstroWind-era dynamic code has been removed.
- The project now builds as a pure static Astro site.
- Tailwind CSS v4 is installed through the official Vite plugin.
- TypeScript v5, ESLint, Prettier, Astro checks, and Vitest are wired into the baseline workflow.
- A reusable site shell now powers locale-aware home, blog, tag, and MDX pages.
- Blog index routes render at `/[locale]/blog/`, while blog post routes keep the previous locale-root slug shape where practical, such as `/en/my-post/`.
- Tag archives and estimated reading time are restored for the rebuilt blog.
- The site can now inject a production web analytics script from environment variables.
- GitHub Actions can now deploy the site to GitHub Pages.
- Core decisions are documented before feature work continues.

## Core Decisions

- Deploy to GitHub Pages with the custom domain `klkuo.guru`.
- Keep `en` and `zh` as the supported locales.
- Redirect `/` to `/en/`.
- Preserve existing blog slugs when practical during the blog rebuild.
- Keep the blog index at `/[locale]/blog/`, but keep blog post detail pages at `/[locale]/<slug>/` where practical to avoid breaking previous public URLs.
- Restore tag archives at `/[locale]/tag/<tag>/`.
- Keep locale switch behavior and hreflang links honest on blog posts and tag pages: only point to translated siblings when they exist, otherwise fall back to the locale blog index for navigation.
- Keep web analytics provider details out of source code and load them from public environment variables in production builds.
- Focus search optimization on SEO, not on-site search.
- Keep the architecture intentionally small, static, and easy to maintain.

## Documentation

- `docs/spec.md` defines scope, goals, non-goals, decisions, and milestone acceptance criteria.
- `docs/architecture.md` describes the project structure, routing, content flow, and deployment model.
- `docs/roadmap.md` breaks the rewrite into independent milestones with estimated effort.

## Stack

- Astro v6
- Tailwind CSS v4
- TypeScript v5
- MDX for static pages
- Astro content collections for blog content
- Vitest for unit tests
- ESLint and Prettier for code quality

## Commands

- `npm install`
- `npm run dev`
- `npm run format`
- `npm run lint`
- `npm run check`
- `npm run test`
- `npm run build`
- `npm run validate`

## Deployment

- `public/CNAME` is committed for the custom domain.
- `public/.nojekyll` is committed so GitHub Pages serves Astro asset folders like `_astro/` without Jekyll interference.
- `astro.config.mjs` uses `https://klkuo.guru` as the site URL.
- `.github/workflows/ci.yml` runs validation on pushes to `main` and on pull requests.
- `.github/workflows/deploy.yml` validates, builds, uploads, and deploys the `dist/` output to GitHub Pages on pushes to `main` and by manual dispatch.
- Production analytics is injected in the document head only when these public environment variables are set:
  - `PUBLIC_ANALYTICS_SCRIPT_URL`
  - `PUBLIC_ANALYTICS_WEBSITE_ID`
  - `PUBLIC_ANALYTICS_DOMAINS`
- These variables are declared in Astro's built-in environment schema in `astro.config.mjs` so validation and typing stay aligned with the deployment workflow.
