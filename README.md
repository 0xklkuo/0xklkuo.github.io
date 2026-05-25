# klkuo.guru

Static-first personal site for KL KUO.

## What This Repository Contains

- A localized public site at `/en/` and `/zh/`
- A blog generated from Astro content collections
- Shared layouts, locale-aware routing helpers, and markdown/MDX full-page content
- Optional production analytics configured only through public environment variables
- GitHub Actions workflows for validation and GitHub Pages deployment via the official Astro action

## Working Principles

- Keep the public site simple, fast, and crawlable
- Prefer Astro-first patterns over extra framework layers
- Preserve established public routes when practical
- Keep integrations optional, isolated, and easy to replace
- Document product and architecture decisions close to the code

## Stack Baseline

- Astro
- Tailwind CSS
- TypeScript
- MDX and Markdown
- Astro content collections
- Vitest, ESLint, Prettier, and `astro check`

## Local Development

- `npm install`
- `npm run dev`
- `npm run validate`
- `npm run build`

## Repository Docs

- `README.md` — quick start and deployment checklist
- `docs/spec.md` — product direction, current scope, and change guardrails
- `docs/architecture.md` — current system shape, routing, and deployment model
- `docs/roadmap.md` — completed rewrite milestones and next enhancement tracks

## Deployment Checklist

1. In GitHub repository settings, keep Pages configured for GitHub Actions.
2. Keep `public/CNAME` committed with `klkuo.guru`.
3. If analytics should be enabled in production, add these repository variables:
   - `PUBLIC_ANALYTICS_SCRIPT_URL`
   - `PUBLIC_ANALYTICS_WEBSITE_ID`
   - `PUBLIC_ANALYTICS_DOMAINS` (optional)
4. Run `npm run validate` locally before pushing.
5. Merge or push to `main` to trigger `.github/workflows/deploy.yml`, which runs `withastro/action@v6` and `actions/deploy-pages@v5`.
6. After deployment, verify `/`, `/en/`, `/zh/`, a blog post route, and the custom domain.

## Production Validation After Deploy

- `/` redirects to `/en/`
- locale switch links stay inside valid translated routes
- blog index, tag pages, and post pages load without broken assets
- canonical and hreflang tags match the current route
- analytics only appears when production variables are configured
