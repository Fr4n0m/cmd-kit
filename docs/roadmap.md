# Roadmap

## Status Overview

Current status: `completed`

Progress (approximate):

- Docs: `100%`
- Legal: `100%`
- Playground (UI + exports + UX): `100%`
- Manual QA: `100%`
- Quality and release readiness: `100%`

## Confirmed Completed

- Core + adapters (React, Vue, Preact, Astro) are feature-complete for current scope.
- Playground is finalized and aligned with shipped API (including dual-theme exports).
- Web docs and package READMEs are aligned with current product behavior.
- Legal pages are finalized in EN/ES.
- Production SEO baseline is active on `https://cmd-kit.vercel.app`:
  - canonical + hreflang
  - robots/sitemap
  - Lighthouse evidence captured in light/dark modes
- Public npm release is published for:
  - `@cmd-kit/core`
  - `@cmd-kit/react`
  - `@cmd-kit/vue`
  - `@cmd-kit/preact`
  - `@cmd-kit/astro`

## Remaining Work To Reach 100%

No blocking work remaining for the initial public release scope.

## Phase Snapshot

## Phase 0 - Definition
Status: `hecho`

## Phase 1 - Monorepo and Tooling
Status: `hecho`

## Phase 2 - Core Engine
Status: `hecho`

## Phase 3 - Adapter Packages
Status: `hecho`

## Phase 4 - Docs and Web
Status: `hecho`

## Phase 5 - Playground Product Surface
Status: `hecho`

## Phase 6 - Legal and Compliance
Status: `hecho`

## Phase 7 - Quality and Release Readiness
Status: `hecho`

## Next Milestones

1. Monitor post-release feedback and issues.
2. Plan the next feature iteration.
3. Subscription system block (email double opt-in + Sileo notifications) implemented in `apps/web` on 2026-05-20, including standalone subscription banner (moved out of footer) and unsubscribe flow.
4. Add minimal admin operations surface for subscriptions (list/status change/delete/trigger notify) with secure access strategy.
5. Roll out production env + SMTP and run end-to-end verification on deployed domain.
