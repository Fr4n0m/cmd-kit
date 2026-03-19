# Roadmap

## Status Overview

Current status: `active development`

Progress (approximate):

- Docs: `82%`
- Legal: `45%`
- Playground (UI + exports + UX): `58%`
- Quality and release readiness: `74%`

## Active Debt

- Playground docs guide is currently provisional and will be finalized after playground UX and exports are closed.
- Legal and privacy pages are publishable as generic baseline text, but still require final legal review before "final production legal" status.
- Manual QA across desktop and mobile remains pending as a release blocker.

## Phase 0 - Definition

Status: `hecho`

Hecho:

- Product vision, architecture, and repository conventions are defined and documented.
- MVP direction and package split are stable.

En curso:

- None.

Bloqueado:

- None.

Siguiente:

- Keep vision and architecture docs aligned with scope changes.

## Phase 1 - Monorepo and Tooling

Status: `hecho`

Hecho:

- Workspace, TypeScript, tests, linting, formatting, and package-level scripts are in place.
- Packaging verification (`pack:verify`) and release scaffolding are available.

En curso:

- Final metadata polish once public repository links are definitive.

Bloqueado:

- Public URL decisions.

Siguiente:

- Apply final repository/homepage/issues URLs when public setup is frozen.

## Phase 2 - Core Engine

Status: `en curso`

Hecho:

- Headless command model, fuzzy filtering, snapshots, nested sections, async source loading, recents, and execution dispatch are implemented.
- Core remains framework-agnostic.

En curso:

- Hardening execution semantics for more real-world integration flows.
- Improving state modeling around richer navigation patterns.

Bloqueado:

- None.

Siguiente:

- Lock extension boundaries for future adapters and complete final API review before first public release.

## Phase 3 - Adapter Packages

Status: `en curso`

Hecho:

- Official adapters are available for React, Vue, Preact, and Astro integration.
- Customization surfaces (`messages`, `theme`, `source`, class hooks, render hooks/slots) are documented and tested.

En curso:

- React and non-React adapter polish for production-level defaults and edge cases.

Bloqueado:

- None.

Siguiente:

- Final parity pass across adapters to keep docs and behavior equally clear.

## Phase 4 - Docs and Web

Status: `en curso`

Hecho:

- Localized docs structure is unified and route duplication was removed.
- Docs coverage exists for Getting Started, React, Vue, Preact, Astro, Core, Customization, and Playground.
- FAQ quality has been raised with more production-oriented install and adoption questions.
- Docs sub-navigation active-state behavior on click and scroll is now stable.

En curso:

- Final consistency pass for beginner-friendly tone and depth equalization across technologies.
- Playground guide is kept provisional until final playground UX/export work is complete.

Bloqueado:

- Final playground screenshots depend on playground UI/UX closure.

Siguiente:

- Add screenshot blocks to playground docs once final UI is approved and capture set is ready.

## Phase 5 - Playground Product Surface

Status: `en curso`

Hecho:

- Dedicated playground page, live configurator, preview, and multi-target exports are implemented.
- Sections, nested commands, theme, messages, and core behavior controls are available.

En curso:

- Full UX pass: navigation clarity, configurator flow, export quality, responsive behavior, and interaction consistency.
- Accessibility and edge-case hardening in real usage flows.

Bloqueado:

- None.

Siguiente:

- Close playground UX/export acceptance criteria, then finalize playground docs with real screenshots and guided flows.

## Phase 6 - Legal and Compliance

Status: `en curso`

Hecho:

- Legal and privacy pages are clean, bilingual, and coherent as baseline public text.

En curso:

- Moving legal copy to a publishable generic version with brand/contact, explicit cookie/analytics status, and Spain jurisdiction.

Bloqueado:

- Final legal sign-off is external to code and requires explicit legal review.

Siguiente:

- Keep legal pages updated when analytics/third-party integrations change.

## Phase 7 - Quality and Release Readiness

Status: `en curso`

Hecho:

- Local `test`, `typecheck`, `build`, and packing verification workflows are established.
- Example apps (React, Vue, Preact, Astro, vanilla) are available for local verification.
- React quality tooling pass is already strong in current baseline.

En curso:

- Manual cross-device QA and deployed web quality audit completion.
- Final npm publishing readiness checklist and release rehearsal.

Bloqueado:

- Public deployment and npm account/package publication timing.

Siguiente:

- Complete release checklist gate: QA, web audit, metadata, publish config, and first release rehearsal.

## Next Milestones

1. Close docs parity pass (excluding final playground screenshots).
2. Ship generic publishable legal pages with explicit current policy constraints.
3. Execute full playground hardening sprint (UX + exports + accessibility + responsive).
4. Finalize playground docs with screenshots and guided workflows.
5. Run full release gate and prepare first public npm release.
