# Roadmap

| Milestone | Scope                                                     | Estimated effort |
| --------- | --------------------------------------------------------- | ---------------: |
| 0         | Planning lock and explicit decision capture               |     2 to 4 hours |
| 1         | Foundation reset, cleanup, tooling baseline, core docs    |    8 to 12 hours |
| 2         | Site shell, locale navigation, dark mode, first MDX pages |    8 to 12 hours |
| 3         | Blog rebuild, content rendering, SEO hardening            |    6 to 10 hours |
| 4         | Umami integration and GitHub Pages deployment workflow    |     4 to 8 hours |
| 5         | Final hardening, cleanup, and handoff                     |     4 to 6 hours |

## Milestone 1

### Deliverables

- Remove AstroWind-era architecture and dynamic runtime features.
- Install the static stack baseline.
- Write scope, architecture, and roadmap docs.
- Add validation commands and CI.

### Definition of Done

- The project is pure static.
- The project has a clear root layout and typed helper layer.
- Validation commands pass locally and in CI.

## Milestone 2

### Deliverables

- Replace placeholder pages with the real site shell.
- Add reusable header, footer, and locale-aware navigation.
- Add the first stable MDX pages.

### Definition of Done

- The new UI shell is stable in both locales.
- Dark mode and locale switching are part of the real layout.

## Milestone 3

### Deliverables

- Rebuild blog listing and post pages.
- Reuse existing Markdown blog content.
- Preserve post URLs where practical.

### Definition of Done

- Blog content renders cleanly.
- Metadata and sitemap behavior match the rebuilt route structure.

## Milestone 4

### Deliverables

- Add Umami integration.
- Add GitHub Pages deployment workflow.

### Definition of Done

- Main branch changes can deploy to GitHub Pages.
- Analytics are isolated, minimal, and optional by configuration.

## Milestone 5

### Deliverables

- Final cleanup pass.
- Test additions where they improve confidence.
- Final docs alignment.

### Definition of Done

- The repo is ready for normal iteration without rewrite scaffolding.
- Docs match the shipped architecture.
