# Contributing

## Workflow

- Create one feature branch per task.
- Keep commits atomic and scoped.
- Do not mix unrelated refactors with feature work.
- Run `npm run test`, `npm run typecheck`, and `npm run build` before opening a PR.
- Prefer small pull-request-sized changes over large batches.

## Branch Naming

- `feat/...`
- `fix/...`
- `docs/...`
- `chore/...`

Examples:

- `feat/core-search-model`
- `feat/react-palette-ui`
- `fix/web-playground-copy`

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

## Comments

- Avoid internal code comments that explain obvious implementation details.
- Put customization guidance in documentation, not inside source files.
- Comments are acceptable in generated snippets shown to users in the web UI when they add practical value.

## Pull Requests

- Keep PRs small enough to review quickly.
- Include a short summary of behavior changes.
- Note any deferred work or tradeoffs explicitly.
- Attach screenshots for `apps/web` UI changes when relevant.
