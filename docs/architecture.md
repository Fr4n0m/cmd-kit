# Architecture

## Repository Shape

This project should start as a monorepo:

- `packages/core`
- `packages/react`
- `packages/vue` when the Vue adapter starts
- `packages/svelte` when the Svelte adapter starts
- `packages/solid` when the Solid adapter starts
- `apps/web`

## Architectural Style

The project should follow a hexagonal architecture with clear boundaries:

- `domain`: pure business rules and types
- `application`: use cases and orchestration
- `ports`: contracts for side effects and external integrations
- `adapters`: framework, browser, storage, and UI bindings

This is especially important for `packages/core`, because it is the part that must remain stable, testable, and framework-agnostic.

## Dependency Rules

- `domain` must not depend on framework or browser APIs.
- `application` may depend on `domain` and `ports`, but not on UI frameworks.
- `adapters` may depend on `application` and `domain`.
- `apps/web` and `packages/react` are adapters around the core, not places where business rules should accumulate.
- search libraries, browser shortcuts, clipboard access, and routing should stay behind ports or adapter-level utilities when they affect core behavior.

## Structural Direction

Use a hybrid structure:

- package boundaries by product area
- internal folders by architectural role first
- feature grouping inside each architectural layer when the package grows

Example direction for `packages/core`:

- `src/domain/commands`
- `src/domain/search`
- `src/application/command-palette`
- `src/ports/search`
- `src/adapters/search`

Example direction for `packages/react`:

- `src/features/palette/components`
- `src/features/palette/hooks`
- `src/features/palette/adapters`

Equivalent adapter packages should follow the same boundary rules for Vue, Svelte, Solid, Preact, Astro-facing wrappers, or vanilla browser adapters when they are introduced.

Example direction for `apps/web`:

- `src/features/playground`
- `src/features/docs`
- `src/features/landing`
- shared UI only when it is reused across features

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

Within `packages/core`, the main logic should move toward:

- domain models for commands, sections, search tokens, and palette state
- application services for filtering, grouping, execution, and navigation
- ports for things like search engines or persistence when they become configurable
- adapters only where an external dependency needs to be isolated

### `packages/react`

Official React integration responsible for:

- React hooks and provider
- default command palette UI
- overridable slots or render props
- accessible dialog and list rendering
- styling hooks for Tailwind and CSS variables
- public React-first API for common use cases

`packages/react` is an adapter package. It should consume the core through explicit APIs and keep React-specific state, rendering, and accessibility wiring outside the core domain.

### Future Adapter Packages

Future framework packages should mirror the same role as `packages/react`:

- `packages/vue`
- `packages/svelte`
- `packages/solid`
- `packages/preact`
- thin Astro-facing wrappers where useful
- a browser-first or vanilla adapter if the core alone is not ergonomic enough

These packages must stay thin. Framework-specific rendering, reactivity, and lifecycle code belong in the adapter, while search, execution, navigation state, and command modeling stay in `packages/core`.

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

`apps/web` should stay feature-oriented. The configurator, docs, and landing should be independent slices rather than one large shared UI layer.

## API Direction

The architecture should support both:

- headless usage for advanced consumers
- default UI usage for fast adoption
- multiple framework adapters built over the same core without forking business logic

The React package should likely expose:

- a high-level component for quick setup
- lower-level primitives for custom rendering
- typed config objects for items, groups, labels, and behavior

The public API should expose use cases cleanly, but internal architecture should not mirror the public surface one-to-one if that would blur boundaries.

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

- `main` for stable releases
- `develop` for integration
- feature branches per task created from `develop`
- atomic commits
- small pull-request-sized units of work
- merges back into `develop` before release promotion
- no mixing docs, architecture, and unrelated implementation in one commit when avoidable

## Refactoring Direction

The current codebase is still early and intentionally compact. As features grow, refactors should push the code toward the structure above instead of letting UI concerns leak into the core package.
