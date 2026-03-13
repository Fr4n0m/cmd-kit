# Versioning And Release

## Current Approach

Versioning now uses Changesets.

Release flow:

1. branch from `develop`
2. run `npm run changeset`
3. commit the generated file under `.changeset/` in the same feature branch
4. merge the branch back into `develop`
5. run `npm run version:packages` when preparing the release branch from `develop`
6. run `npm run release:check`
7. merge `develop` into `main`
8. publish to npm with `npm run release:npm`
9. create a Git tag for the release

## Release Units

- `@cmd-kit/core`
- `@cmd-kit/react`
- `@cmd-kit/vue`
- `@cmd-kit/preact`

`apps/web` is not a published package. It should track the public release but not be versioned as an npm artifact.
