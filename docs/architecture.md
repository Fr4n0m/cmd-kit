# Architecture

## Repository Shape

This project should start as a monorepo:

- `packages/core`
- `packages/react`
- `apps/web`

## Package Responsibilities

### `packages/core`

Framework-agnostic logic layer responsible for:

- command registration model
- item grouping
- filtering and fuzzy search integration
- keyboard interaction state
- active item selection
- shortcut handling contracts
- localization message model
- theming token schema

This package should not render DOM by itself and should not depend on React.

### `packages/react`

Official React integration responsible for:

- React hooks and provider
- default command palette UI
- overridable slots or render props
- accessible dialog and list rendering
- styling hooks for Tailwind and CSS variables
- public React-first API for common use cases

### `apps/web`

Product site responsible for:

- landing page
- documentation
- bilingual interface (`en` and `es`)
- live configurator
- real-time preview
- code export examples
- Astro rendering for static marketing and docs pages
- React islands for interactive playground features

## API Direction

The architecture should support both:

- headless usage for advanced consumers
- default UI usage for fast adoption

The React package should likely expose:

- a high-level component for quick setup
- lower-level primitives for custom rendering
- typed config objects for items, groups, labels, and behavior

## Styling Strategy

Two parallel styling paths should be supported:

- Tailwind-compatible markup and class hooks
- CSS variables and class names for plain CSS consumers

The theme model should be token-based so the playground can generate stable output.

## Search Strategy

Use fuzzy search from the start through a small, proven dependency rather than a custom ranking engine in v1.

## Accessibility Requirements

The implementation should include:

- full keyboard navigation
- focus trapping when open
- escape to close
- screen reader labels
- active descendant or equivalent accessible list navigation
- semantic roles for dialog, input, groups, and options

## Output from the Playground

The web app should generate at least:

- React usage snippet
- config object snippet
- Tailwind styling example
- CSS variable block

The generated output must map directly to the published package API.

## Git Workflow

Development should follow a professional workflow:

- feature branches per task
- atomic commits
- small pull-request-sized units of work
- no mixing docs, architecture, and unrelated implementation in one commit when avoidable
