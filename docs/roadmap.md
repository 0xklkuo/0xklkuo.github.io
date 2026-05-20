# Roadmap

## Rewrite Summary

| Milestone | Outcome                                                             |
| --------- | ------------------------------------------------------------------- |
| 0         | Planning lock and decision capture                                  |
| 1         | Foundation reset, tooling baseline, and core docs                   |
| 2         | Shared site shell, locale navigation, and dark mode                 |
| 3         | Blog rebuild, SEO hardening, tag archives, and reading time         |
| 4         | Optional analytics integration and GitHub Pages deployment workflow |
| 5         | Final hardening, route consolidation, cleanup, and handoff          |

## Milestone 5 Outcome

This final pass closes the rewrite by:

- consolidating duplicated locale routes into shared locale-aware page implementations
- enabling Astro opt-in prefetching on high-intent internal links
- tightening behavior-focused tests
- updating docs and policy pages so they reflect shipped behavior and remain open to future growth
- removing leftover rewrite scaffolding that would make future changes harder than necessary

## Recommended Next Enhancement Tracks

These are optional follow-on tracks, not open rewrite work.

| Track                      | Scope                                                                              | Estimated effort |
| -------------------------- | ---------------------------------------------------------------------------------- | ---------------: |
| Deployment verification    | Production smoke check, domain verification, analytics verification                |     1 to 2 hours |
| CI smoke coverage          | Add a lightweight post-build route or HTML smoke check                             |     2 to 4 hours |
| Content scale-up           | Pagination, archives, or stronger content taxonomy if post volume grows            |     4 to 8 hours |
| Privacy and consent        | Add a consent layer only if policy or analytics requirements change                |     4 to 8 hours |
| Creator tooling extensions | Product pages, landing pages, embeds, or subscriber flows as incremental additions |    6 to 16 hours |

## Working Rule for Future Changes

Treat this repository as a maintained product, not a rewrite branch:

- extend the existing static-first foundation when possible
- document major scope or architecture changes before they sprawl into code
- keep each enhancement independently shippable and easy for another engineer or AI agent to continue
