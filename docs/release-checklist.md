# Release Checklist

## Before Versioning

- confirm the target package name or npm scope
- review [roadmap.md](./roadmap.md) for remaining production blockers
- verify repository and issue tracker URLs in package metadata
- review dependency health and decide whether any vulnerabilities are acceptable
- create and commit the required Changeset entries

## Quality Gate

- run `npm install`
- run `npm run test`
- run `npm run typecheck`
- run `npm run build`
- run `npm run pack:verify`
- manually test the React palette flows
- manually test the Astro web app and playground

## Documentation Gate

- verify root README matches the current product surface
- verify package READMEs match the current API
- verify docs pages reflect the public install path
- verify generated snippets still match the shipped API

## Packaging Gate

- verify `package.json` fields for `name`, `version`, `license`, `repository`, `bugs`, and `homepage`
- verify `exports`, `types`, and `files`
- verify `publishConfig`
- inspect the generated tarballs in `.artifacts/packs`
- confirm the final package name is available on npm

## Publish Gate

- login with the final npm account
- run `npm run release:npm`
- install the published packages in a clean sample app
- verify the docs site points to the final npm install command

## After Release

- tag the release in Git
- update changelog or release notes
- verify the Vercel site is still aligned with the released package version
