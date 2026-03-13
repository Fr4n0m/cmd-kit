# Roadmap

## Project Status

Current status: `active development`

Project goal:

- ship `cmd+kit` as an open source npm package
- provide a framework-agnostic core with official React support first and active expansion into Vue, Svelte, Solid, Preact, Astro integrations, and vanilla browser usage
- publish a fast Astro landing page with a live configurator
- reach a production-ready quality bar for accessibility, documentation, packaging, and release workflow

## Current Snapshot

Completed:

- product vision, architecture, contribution guide, and repository conventions
- monorepo bootstrap with `packages/core`, `packages/react`, and `apps/web`
- Astro landing shell with React island playground
- bilingual landing and playground baseline (`en` and `es`)
- headless core foundation with command items, sections, grouping, fuzzy search, messages, and theming
- declarative sections support in the core API
- hexagonal direction in `packages/core` with domain, application, ports, and adapters
- React command palette baseline with keyboard navigation and default UI
- initial Vue adapter with a composable and default UI component
- nested navigation support through child sections
- slot-level renderer overrides and class name hooks in the React adapter
- playground export for React, CSS variables, and Tailwind-oriented snippets
- configurator coverage for the full message set and all current theme tokens
- tests for core behavior, React palette behavior, and playground snippet generation
- initial package metadata hardening for public publishing
- initial docs pages for installation and React usage
- explicit npm installation guidance in the web experience
- initial docs page for Vue usage
- initial docs page for Preact usage

In progress:

- strengthen the core execution model for real-world command actions
- deepen the React adapter so it is customizable enough for public consumption
- expand the playground so it reflects the full public API instead of a curated subset

Not started or incomplete:

- official release/versioning workflow
- npm publishing setup
- final production documentation pass for installation and customization
- final open source maintenance workflow and metadata cleanup
- multi-framework rollout beyond React is underway but incomplete
- public adapter coverage now includes Vue and Preact

## Phases

## Phase 0: Definition

Status: `completed`

Completed:

- finalize product and architecture docs
- agree on MVP scope
- define repository structure
- choose initial tooling and package manager
- define Git workflow, engineering principles, and architectural constraints
- adopt a `main` and `develop` branch model for release flow

## Phase 1: Monorepo Bootstrap

Status: `mostly completed`

Completed:

- initialize workspace
- configure TypeScript
- set up shared build pipeline
- set up testing baseline
- define test layers and quality checks
- add package-level README files for published packages
- add manual formatting tooling and repository-wide formatting rules
- add local release verification and package packing scripts
- add Changesets-based versioning tooling

Remaining:

- add final public repository, homepage, and issue URLs once they exist

## Phase 2: Core Engine

Status: `in progress`

Completed:

- define item, group, and section schemas
- define state snapshot model
- integrate fuzzy search
- implement filtering and grouping behavior
- add localization message primitives
- support declarative sections
- add command execution result modeling
- formalize command execution through an explicit execution port
- support nested navigation at the model level
- isolate search behind a port and adapter boundary
- add async command source loading primitives
- add recent-command state primitives

Remaining:

- extend async and remote source support beyond the current loader primitive
- expand recents into a fuller history model
- add support for richer item metadata where justified by the public API
- define and verify extension points for future framework adapters
- improve state modeling for stacked pages, breadcrumbs, and richer navigation flows

Production bar:

- stable public types
- predictable execution semantics
- clear extension boundaries
- no React or DOM dependencies leaking into the core

## Phase 3: React Package

Status: `in progress`

Completed:

- implement default dialog and list UI
- implement keyboard navigation
- support grouped rendering from the core snapshot
- support nested navigation in the palette UI
- expose a React-first API for `items`, `sections`, `messages`, and `theme`
- add baseline component tests
- expose a lower-level `useCommandPalette` hook for advanced consumers
- support slot-level class names and renderer overrides
- restore focus to the previously active element when the palette closes
- add programmatic root and nested navigation helpers to the React hook
- wire async `source` loading into the React hook and component
- expose recent items through the React hook
- add focus trapping and `aria-busy` semantics to the default dialog UI
- split the React palette into smaller internal modules and clear `react-doctor` to `100/100`

Remaining:

- improve accessibility semantics further where gaps remain
- improve theming hooks for Tailwind and CSS variable consumers
- surface recent-command UX more intentionally in the default UI

Production bar:

- stable public component API
- accessible keyboard-first behavior
- reliable nested navigation
- enough customization to avoid forcing users to fork the UI

## Phase 4: Web App

Status: `in progress`

Completed:

- create Astro landing page
- add bilingual UI baseline
- build React-island live configurator
- connect preview to generated config
- export React and style snippets
- allow editing of sections and items from the configurator
- reorganize playground code by feature
- split the playground island into smaller feature-level components and state helpers
- add initial docs pages beyond the homepage
- cover the full message set and current theme token surface in the configurator
- add explicit npm installation guidance in the web experience
- expose recent-command behavior controls in the configurator
- allow editing nested command sections and nested items from the configurator

Remaining:

- improve landing copy, hierarchy, and product storytelling
- add full configurator coverage for the public API
- allow editing more advanced command behaviors from the UI beyond recent-command settings and nested command content
- improve snippet generation quality and production readiness
- continue hardening mobile and responsive behavior with manual QA

Production bar:

- clear product positioning
- accurate configurator-to-code mapping
- no dead-end UI states
- good mobile behavior
- fast static landing with interactive islands only where needed

## Phase 5: Quality

Status: `in progress`

Completed:

- add unit tests for core behavior
- add component tests for React package
- add integration-style tests for playground snippets
- standardize local quality checks with `test`, `typecheck`, and `build`
- add an automated accessibility smoke test for the React palette
- add accessibility smoke coverage for the Astro web app playground
- add skip-link, focus-visible, and reduced-motion support to the web app shell
- cover shortcut toggling and nested back-navigation in React tests
- expand React coverage for focus trapping, busy states, and typing-target shortcut guards
- add local package packing verification before publish
- add an explicit dependency audit step to the local release workflow
- run a baseline `react-doctor` scan and reduce it to component-size warnings only
- add a code-first baseline `web-quality-audit` document for `apps/web`
- clear the `apps/web` `react-doctor` score to `100/100` by splitting the playground feature
- clear the shipped React package `react-doctor` score to `100/100`

Remaining:

- extend accessibility checks to more interaction flows across the web app and React package
- add a deployed full web audit pass using `web-quality-audit`
- break the web audit into explicit checks for `accessibility`, `performance`, `core-web-vitals`, `seo`, and `best-practices`
- add manual QA passes across desktop and mobile
- resolve or explicitly accept the remaining Astro tooling vulnerability chain before production

Production bar:

- repeatable quality gate before every release
- no unresolved critical accessibility issues
- no known breaking issues in packaging or examples

## Phase 6: Open Source Readiness

Status: `in progress`

Completed:

- write package-level docs for installation and usage
- add package metadata fields for license, keywords, repository shape, and publish access baseline
- add the repository license file
- document customization patterns with real examples
- add issue templates and repository hygiene assets baseline
- define an initial manual versioning and release flow
- prepare npm publish checklist
- add a repository code of conduct
- add a repository security policy
- add a pull request template for external contributors

Remaining:

- refine contribution workflows further once the public issue triage process exists
- replace placeholder issue labels or links with the final public workflow
- choose final package publish name or scope when the npm account is ready
- add final repository metadata once the public URLs exist

Production bar:

- clear onboarding for users
- clear contribution path for maintainers and contributors
- release process documented end to end

## Phase 7: Multi-Framework Expansion

Status: `started`

Scope:

- keep `packages/core` stable enough to support multiple adapters without duplication
- add at least one non-React adapter after the first public release
- document usage patterns for framework consumers beyond React

Completed:

- start `@cmd-kit/vue` as the first non-React adapter
- add `@cmd-kit/preact` as a second official adapter with local test, typecheck, and build coverage

Planned targets:

- Vue
- Svelte
- Solid
- Preact
- Astro-facing integration guidance
- vanilla browser usage where the headless core alone is not sufficient

Production bar:

- no React assumptions leaking into the core API
- adapter boundaries proven by at least one non-React package
- public docs explain which frameworks are officially supported and at what maturity level

## Production Checklist

This is the minimum bar before the first public npm release.

Must be complete:

- core API reviewed and stabilized
- React adapter API reviewed and stabilized
- landing and configurator reflect the real public API
- install docs for npm usage written
- examples verified locally
- `npm run test` passes
- `npm run typecheck` passes
- `npm run build` passes
- `react-doctor` review completed for the shipped React surface
- web audit completed with `web-quality-audit`
- supporting web checks completed for `accessibility`, `performance`, `core-web-vitals`, `seo`, and `best-practices`
- accessibility review completed
- package metadata verified
- npm account ready and package name confirmed
- web deployment verified
- first release checklist written and rehearsed

## Future Backlog

These are intentionally not part of the current production-critical path.

- async providers with caching strategies
- history and recents
- analytics hooks
- plugin system
- theme presets or marketplace
- richer docs site sections and interactive examples
- import or export of full JSON configs
