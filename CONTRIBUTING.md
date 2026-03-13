# Contributing

## Workflow

- Keep `main` as the stable release branch.
- Use `develop` as the integration branch for ongoing work.
- Create one secondary branch per task from `develop`.
- Keep commits atomic and scoped.
- Do not mix unrelated refactors with feature work.
- Add a Changeset for any published package change that should affect versioning.
- Run `npm run test`, `npm run typecheck`, and `npm run build` before opening a PR.
- Run `npm run format:check` before opening a PR when formatting-sensitive files changed.
- Prefer small pull-request-sized changes over large batches.
- Merge task branches back into `develop`.
- Merge `develop` into `main` only when the release bar is satisfied.

## Local Setup

```bash
npm install
npm run dev:web
```

Useful commands:

- `npm run test`
- `npm run typecheck`
- `npm run build`
- `npm run format`
- `npm run changeset`
- `npm run release:check`

## Branch Naming

- `feat/...`
- `fix/...`
- `docs/...`
- `chore/...`

Examples:

- `feat/core-search-model`
- `feat/react-palette-ui`
- `fix/web-playground-copy`

## Branch Flow

1. branch from `develop`
2. complete one scoped unit of work
3. merge back into `develop`
4. promote `develop` into `main` for releases only

## Commit Style

Use focused commit messages:

- `feat(core): add command snapshot helpers`
- `feat(react): add command palette component`
- `feat(web): add landing playground shell`
- `docs: add architecture and roadmap`

## Engineering Principles

- Prefer KISS over premature abstraction.
- Keep logic DRY, but do not hide behavior behind unnecessary indirection.
- Apply SOLID where it improves maintainability of public APIs and internal boundaries.
- Keep the headless core independent from framework concerns.
- Design APIs so playground output maps directly to package usage.
- Prefer hexagonal boundaries in `packages/core`: domain and application in the center, adapters at the edges.
- Organize growing packages by architectural role first and by feature inside those boundaries when useful.
- Do not let `packages/react` or `apps/web` become sources of business rules that should live in `packages/core`.

## Comments

- Avoid internal code comments that explain obvious implementation details.
- Put customization guidance in documentation, not inside source files.
- Comments are acceptable in generated snippets shown to users in the web UI when they add practical value.

## Pull Requests

- Keep PRs small enough to review quickly.
- Include a short summary of behavior changes.
- Note any deferred work or tradeoffs explicitly.
- Attach screenshots for `apps/web` UI changes when relevant.
- Link the relevant issue when one exists.
- Use the PR template checklist before requesting review.

## Versioning

- `@cmd-kit/core` and `@cmd-kit/react` are versioned with Changesets.
- Changeset files should be authored from feature branches that were created from `develop`.
- Changesets are diffed against `develop`, not `main`, so release prep stays aligned with the integration branch.
- `apps/web` is not published to npm and should not receive Changeset entries.
- If a change affects public API, packaging, or shipped behavior, add a Changeset in the same branch.
