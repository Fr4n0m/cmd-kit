# Changesets

Use Changesets to record package release intent before publishing.

Recommended flow:

1. run `npm run changeset`
2. commit the generated file in `.changeset/`
3. run `npm run version:packages` when cutting a release
4. run `npm run release:check`
5. run `npm run release:npm`
