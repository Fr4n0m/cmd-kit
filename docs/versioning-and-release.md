# Versioning And Release

## Current Approach

Versioning now uses Changesets.

Release flow:

1. run `npm run changeset`
2. commit the generated file under `.changeset/`
3. run `npm run version:packages`
4. run `npm run release:check`
5. publish to npm with `npm run release:npm`
6. create a Git tag for the release

## Release Units

- `@cmd-kit/core`
- `@cmd-kit/react`

`apps/web` is not a published package. It should track the public release but not be versioned as an npm artifact.
