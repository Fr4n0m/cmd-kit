# cmd+kit

`cmd+kit` is an open source, fully customizable command palette for web projects.

Repository name: `cmd-kit`

## Project Goals

- Work across frameworks with a framework-agnostic core.
- Provide an official React integration first.
- Support deep customization of content, layout, styling, behavior, and shortcuts.
- Ship a landing page and playground with live configuration and code export.
- Be accessible, keyboard-first, and ready to publish as an npm package.

## Planned Workspace

- `packages/core`: headless framework-agnostic engine
- `packages/react`: official React bindings and UI primitives
- `apps/web`: Astro landing page, docs, live React playground, and code export

## Local Development

```bash
npm install
npm run dev:web
```

Useful scripts:

- `npm run build`
- `npm run typecheck`
- `npm run test`

## Quality Gates

GitHub Actions runs these checks on pushes and pull requests:

- `npm run test`
- `npm run typecheck`
- `npm run build`

## Deployment

`apps/web` is a Vite app and is suitable for static deployment on Vercel.

Recommended Vercel settings:

- Framework preset: `Astro`
- Root directory: `apps/web`
- Build command: `npm run build --workspace @cmd-kit/web`
- Output directory: `dist`

## Documentation

- [Product Vision](./docs/product-vision.md)
- [Architecture](./docs/architecture.md)
- [Roadmap](./docs/roadmap.md)
- [Contributing](./CONTRIBUTING.md)
