# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install all workspace dependencies (Node 22+, npm 11+)
npm run dev:web      # Start web app dev server
npm run build        # Build all workspaces
npm run test         # Test all workspaces
npm run typecheck    # Type check all workspaces
npm run lint         # Lint all workspaces
npm run format       # Format with Prettier

# Single workspace
npm run test --workspace @cmd-kit/core
npm run build --workspace @cmd-kit/react
```

## Release flow

```bash
npm run release:check   # Full validation: test → typecheck → build → pack → audit
npm run changeset       # Create changeset on feature branch
npm run release:npm     # Publish all packages to npm
```

Branch strategy: feature branches (`feat/...`, `fix/...`) off `develop` → merge to `main` only for releases.

## Architecture

**Monorepo** (npm workspaces, no Turbo):

```
packages/
  core/      # @cmd-kit/core — framework-agnostic engine (domain/application/adapters/ports)
  react/     # @cmd-kit/react — React 19 adapter
  vue/       # @cmd-kit/vue — Vue 3 composable + slots
  preact/    # @cmd-kit/preact — Preact 10 adapter
  astro/     # @cmd-kit/astro — Astro component
apps/
  web/       # Landing page, docs, playground (Astro 5)
  example-react/
  example-vue/
  example-preact/
  example-astro/
  example-vanilla/
```

**Core design:** Hexagonal architecture. `domain/` → `application/` → `adapters/` → `ports/`. Business logic lives only in `@cmd-kit/core`; framework packages are thin adapters that depend on it as a peer dependency.

**Build:** tsup (ESM + CJS + `.d.ts`) for all library packages. Framework deps and `@cmd-kit/core` are external (peer deps). Core bundles `match-sorter` and `remove-accents`.

**Testing:** Vitest + jsdom. Accessibility assertions via `jest-axe`. Each framework package has its own `vitest.config.ts`.

**Versioning:** Changesets (`@changesets/cli`). Each publishable package under `packages/` is versioned independently.
