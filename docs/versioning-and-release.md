# Versioning And Release

## Current Approach

Versioning is currently manual.

Until an automated release tool is introduced, each release should follow:

1. update the package versions that need to be released
2. run the full local quality gate
3. verify the release checklist
4. publish to npm
5. create a Git tag for the release

## Recommended Future Improvement

Adopt Changesets or an equivalent workflow when the package surface becomes more stable and multiple releases are expected.

## Release Units

- `@cmd-kit/core`
- `@cmd-kit/react`

`apps/web` is not a published package. It should track the public release but not be versioned as an npm artifact.

