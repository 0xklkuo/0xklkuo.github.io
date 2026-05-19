# klkuo.guru

Minimal static personal site for KL KUO.

## Status

Milestones 1 and 2 are in place:

- AstroWind-era dynamic code has been removed.
- The project now builds as a pure static Astro site.
- Tailwind CSS v4 is installed through the official Vite plugin.
- TypeScript v5, ESLint, Prettier, Astro checks, and Vitest are wired into the baseline workflow.
- A reusable site shell now powers locale-aware home and MDX pages.
- Core decisions are documented before feature work continues.

## Core Decisions

- Deploy to GitHub Pages with the custom domain `klkuo.guru`.
- Keep `en` and `zh` as the supported locales.
- Redirect `/` to `/en/`.
- Preserve existing blog slugs when practical during the blog rebuild.
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
- `astro.config.mjs` uses `https://klkuo.guru` as the site URL.
- `.github/workflows/ci.yml` runs validation on pushes to `main` and on pull requests.
- A dedicated GitHub Pages deployment workflow will be finalized in a later milestone.
