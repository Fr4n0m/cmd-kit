# Roadmap

## Project Status

Current status: `active development`

Project goal:

- ship `cmd+kit` as an open source npm package
- provide a framework-agnostic core with official React support
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
- nested navigation support through child sections
- slot-level renderer overrides and class name hooks in the React adapter
- playground export for React, CSS variables, and Tailwind-oriented snippets
- configurator coverage for the full message set and all current theme tokens
- tests for core behavior, React palette behavior, and playground snippet generation
- initial package metadata hardening for public publishing
- initial docs pages for installation and React usage
- explicit npm installation guidance in the web experience

In progress:

- strengthen the core execution model for real-world command actions
- deepen the React adapter so it is customizable enough for public consumption
- expand the playground so it reflects the full public API instead of a curated subset

Not started or incomplete:

- official release/versioning workflow
- npm publishing setup
- final production documentation pass for installation and customization
- accessibility audit and hardening
- final open source maintenance workflow and metadata cleanup

## Phases

## Phase 0: Definition

Status: `completed`

Completed:

- finalize product and architecture docs
- agree on MVP scope
- define repository structure
- choose initial tooling and package manager
- define Git workflow, engineering principles, and architectural constraints

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

Remaining:

- add release/versioning tooling such as Changesets or an equivalent manual flow
- replace placeholder repository and issue URLs with final public values

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
- support nested navigation at the model level
- isolate search behind a port and adapter boundary
- add async command source loading primitives
- add recent-command state primitives

Remaining:

- formalize command execution ports for navigation, callbacks, and future async actions
- extend async and remote source support beyond the current loader primitive
- expand recents into a fuller history model
- add support for richer item metadata where justified by the public API
- define extension points for future framework adapters
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

Remaining:

- split the current component into clearer feature and adapter boundaries
- improve accessibility semantics further where gaps remain
- improve theming hooks for Tailwind and CSS variable consumers
- add controlled programmatic navigation APIs if needed by real usage

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
- add initial docs pages beyond the homepage
- cover the full message set and current theme token surface in the configurator
- add explicit npm installation guidance in the web experience

Remaining:

- improve landing copy, hierarchy, and product storytelling
- add full configurator coverage for the public API
- allow editing more advanced command behaviors from the UI
- improve snippet generation quality and production readiness

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
- cover shortcut toggling and nested back-navigation in React tests
- add local package packing verification before publish

Remaining:

- extend accessibility checks to cover the web app and more interaction flows
- expand React tests around additional focus, shortcuts, and nested navigation edge cases
- add manual QA passes across desktop and mobile
- review dependency health and resolve acceptable vulnerabilities before production

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

Remaining:

- add contribution workflows for external contributors
- replace placeholder issue templates or labels with the final public workflow
- choose final package publish name or scope when the npm account is ready
- replace temporary metadata placeholders with final repository and issue values

Production bar:

- clear onboarding for users
- clear contribution path for maintainers and contributors
- release process documented end to end

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
- accessibility review completed
- package metadata verified
- npm account ready and package name confirmed
- web deployment verified
- first release checklist written and rehearsed

## Future Backlog

These are intentionally not part of the current production-critical path.

- framework adapters beyond React
- async providers with caching strategies
- history and recents
- analytics hooks
- plugin system
- theme presets or marketplace
- richer docs site sections and interactive examples
- import or export of full JSON configs
