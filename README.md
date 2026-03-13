# cmd+kit

`cmd+kit` is an open source, fully customizable command palette for web projects.

Repository name: `cmd-kit`

License: `MIT`

## Project Goals

- Work across frameworks with a framework-agnostic core.
- Provide an official React integration first.
- Support deep customization of content, layout, styling, behavior, and shortcuts.
- Ship a landing page and playground with live configuration and code export.
- Be accessible, keyboard-first, and ready to publish as an npm package.

## Planned Workspace

- `packages/core`: headless framework-agnostic engine
- `packages/react`: official React bindings and UI primitives
- `packages/vue`: official Vue bindings and UI primitives
- `packages/preact`: official Preact bindings and UI primitives
- `apps/web`: Astro landing page, docs, live React playground, and code export

## Local Development

```bash
npm install
npm run dev:web
```

Useful scripts:

- `npm run build`
- `npm run changeset`
- `npm run typecheck`
- `npm run test`
- `npm run format`
- `npm run format:check`
- `npm run pack:verify`
- `npm run release:check`
- `npm run version:packages`

## Quality Checks

Before merging or releasing, run:

- `npm run test`
- `npm run typecheck`
- `npm run build`
- `npm run pack:verify`

## Documentation

- [Product Vision](./docs/product-vision.md)
- [Architecture](./docs/architecture.md)
- [Roadmap](./docs/roadmap.md)
- [Dependency Health](./docs/dependency-health.md)
- [Web Quality Audit](./docs/web-quality-audit.md)
- [Release Checklist](./docs/release-checklist.md)
- [Versioning And Release](./docs/versioning-and-release.md)
- [Contributing](./CONTRIBUTING.md)
- [Code Of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
