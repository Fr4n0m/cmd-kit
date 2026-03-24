<p>
  <img src="./apps/web/public/brand/cmd-kit-logo.png" alt="Cmd+kit" width="260" />
</p>

# Cmd+kit

[![npm](https://img.shields.io/badge/npm-monorepo-CB3837)](https://www.npmjs.com/)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)
![Astro](https://img.shields.io/badge/Astro-Web-BC52EE)
![License](https://img.shields.io/badge/license-MIT-1f2937)
![Status](https://img.shields.io/badge/status-active%20development-0f766e)

Cmd+kit is an open source command palette system for shipping product-grade command experiences across multiple frameworks.

The repository is organized as a public product hub:

- the root `README.md` gives the product overview and navigation,
- `/docs` covers collaboration, architecture, and release process,
- package `README.md` files provide adapter-specific technical usage.

## Current product state

Cmd+kit currently ships:

- a framework-agnostic core engine in `@cmd-kit/core`,
- official adapters for React, Preact, Vue, and Astro,
- a public web app with landing, docs, and a live playground,
- theme, nested sections, recents, async source support, and export-oriented configuration flows.

There is no separate `@cmd-kit/vanilla` package. The framework-free runtime lives in `@cmd-kit/core`.

The project is in active development. The package split is stable, the docs surface is live, and the remaining work is centered on final UX polish, release hardening, and public validation.

## Package map

| Package | Purpose | Docs |
| --- | --- | --- |
| `@cmd-kit/core` | Headless engine, snapshots, filtering, execution, recents, and framework-free runtime | [README](./packages/core/README.md) |
| `@cmd-kit/react` | React adapter with default UI and hooks | [README](./packages/react/README.md) |
| `@cmd-kit/preact` | Preact adapter aligned with the React baseline | [README](./packages/preact/README.md) |
| `@cmd-kit/vue` | Vue adapter with composable/slot-based customization | [README](./packages/vue/README.md) |
| `@cmd-kit/astro` | Astro adapter component | [README](./packages/astro/README.md) |

## What the product surface looks like

- `apps/web` is the public website: landing, docs, and playground.
- The landing page communicates the product, package split, and the main integration paths.
- The playground is the primary place to shape command data and export configurations for the target adapter.
- Package READMEs are the technical source of truth for installation and usage details.

## Getting started

### For users

Install the package for your target framework:

```bash
npm install @cmd-kit/react react react-dom
npm install @cmd-kit/preact preact
npm install @cmd-kit/vue vue
npm install @cmd-kit/astro astro
npm install @cmd-kit/core
```

Then follow the package README for the framework-specific integration details.

### For repository contributors

Install the workspace dependencies:

```bash
npm install
```

Run the main web app locally:

```bash
npm run dev:web
```

Validate changes with the repository checks:

```bash
npm run build
npm run test
npm run typecheck
npm run pack:verify
```

## Playground workflow

1. Shape commands, sections, theme, messages, and recents in the playground.
2. Export the configuration for your target package.
3. Copy the generated structure into your application.
4. Keep adapter-specific rendering or styling overrides in the target package integration layer.

For the framework-free path, export to `Core` and consume the result through `@cmd-kit/core`.

## Documentation strategy

The documentation model is intentionally split:

- root README: product hub and entry point,
- `/docs`: project collaboration, architecture, and release process,
- package READMEs: adapter-specific installation, integration, and API details,
- web docs: public product walkthrough and playground guidance.

This keeps product usage close to the package that implements it, while avoiding duplicated technical docs in the project root.

## Contributing

Contributions are welcome for bug fixes, documentation improvements, accessibility work, and adapter parity.

For public changes:

- keep the docs aligned with the package behavior,
- include a reproducible example when behavior changes,
- avoid introducing package split drift,
- update the relevant package README when the API or usage pattern changes.

## Release flow

The release path should stay predictable:

1. Land the code change with tests and documentation updates.
2. Run the workspace checks and package verification scripts.
3. Validate the public web app and package integration paths.
4. Perform clean-room checks in fresh projects for each package before publish.
5. Cut the release only when the package docs and public website are aligned.

## Repository links

- [Contributing guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security policy](./SECURITY.md)
- [Roadmap](./docs/roadmap.md)

