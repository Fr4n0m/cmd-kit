# Roadmap

## Phase 0: Definition

- finalize product and architecture docs
- agree on MVP scope
- define repository structure
- decide initial tooling and package manager

## Phase 1: Monorepo Bootstrap

- initialize workspace
- configure TypeScript
- configure linting and formatting
- set up shared build pipeline
- set up testing baseline
- define test layers and quality gates
- add changeset or release workflow

## Phase 2: Core Engine

- define item and group schemas
- define state model
- implement shortcut registration
- integrate fuzzy search
- implement navigation and selection behavior
- add localization primitives

## Phase 3: React Package

- implement provider and hooks
- implement default dialog and list UI
- support slot or render overrides
- expose theme tokens and style hooks
- add accessibility coverage

## Phase 4: Web App

- create Astro landing page
- add English and Spanish UI
- build React-island live configurator
- connect preview to generated config
- export React and style snippets
- add web smoke tests for exported examples

## Phase 5: Quality

- add unit tests for core behavior
- add component tests for React package
- add integration tests for playground generation
- add accessibility checks
- validate generated examples
- run manual QA across desktop and mobile
- add CI quality gates for test, typecheck, and build

## Phase 6: Open Source Readiness

- write contribution guide
- write package docs
- add issue templates
- define versioning and release flow
- prepare npm publish checklist
