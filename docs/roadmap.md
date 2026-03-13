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
- playground export for React, CSS variables, and Tailwind-oriented snippets
- tests for core behavior, React palette behavior, and playground snippet generation

In progress:

- strengthen the core execution model for real-world command actions
- deepen the React adapter so it is customizable enough for public consumption
- expand the playground so it reflects the full public API instead of a curated subset

Not started or incomplete:

- official release/versioning workflow
- npm publishing setup
- production documentation for installation and customization
- accessibility audit and hardening
- release checklist and publish verification
- issue templates, package metadata hardening, and open source maintenance assets

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

Remaining:

- add formatting tooling and decide whether it should be automated or manual
- add release/versioning tooling such as Changesets or an equivalent manual flow
- harden package metadata for publishing

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

Remaining:

- formalize command execution ports for navigation, callbacks, and future async actions
- add support for async or remote command sources
- add support for recents and history
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

Remaining:

- split the current component into clearer feature and adapter boundaries
- expose lower-level primitives or hooks for advanced customization
- support slot or render override patterns more systematically
- improve focus management and accessibility semantics
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

Remaining:

- improve landing copy, hierarchy, and product storytelling
- add docs pages beyond the homepage
- add full configurator coverage for the public API
- allow editing more advanced command behaviors from the UI
- improve snippet generation quality and production readiness
- add explicit npm installation guidance in the web experience
- add Vercel deployment notes to project docs where relevant

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

Remaining:

- add accessibility checks for the React package and web app
- expand React tests around focus, shortcuts, and nested navigation edge cases
- add manual QA passes across desktop and mobile
- define a release checklist for `test`, `typecheck`, and `build`
- add publish verification before release
- review dependency health and resolve acceptable vulnerabilities before production

Production bar:

- repeatable quality gate before every release
- no unresolved critical accessibility issues
- no known breaking issues in packaging or examples

## Phase 6: Open Source Readiness

Status: `not started`

Remaining:

- write package-level docs for installation and usage
- document customization patterns with real examples
- add contribution workflows for external contributors
- add issue templates and repository hygiene assets
- define versioning and release flow
- prepare npm publish checklist
- choose final package publish name or scope when the npm account is ready
- verify `package.json` fields for repository, license, keywords, exports, and publishing behavior

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
- Vercel deployment for `apps/web` verified
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
