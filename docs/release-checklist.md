# Release Checklist

## Before Versioning

- confirm the target package name or npm scope
- review [roadmap.md](./roadmap.md) for remaining production blockers
- add the final repository, homepage, and issue tracker URLs to package metadata
- review dependency health and decide whether any vulnerabilities are acceptable
- review [dependency-health.md](./dependency-health.md) and refresh the audit result
- create and commit the required Changeset entries

## Quality Gate

- run `npm install`
- run `npm run test`
- run `npm run typecheck`
- run `npm run build`
- run `npm run pack:verify`
- run `npm run audit`
- run `npx -y react-doctor@latest . --verbose --diff`
- run a full `web-quality-audit` review on `apps/web`
- run focused follow-up reviews for `accessibility`, `performance`, `core-web-vitals`, `seo`, and `best-practices`
- manually test the React palette flows
- manually test the Vue palette flows
- manually test the Astro web app and playground

## Documentation Gate

- verify root README matches the current product surface
- verify package READMEs match the current API
- verify docs pages reflect the public install path
- verify generated snippets still match the shipped API

## Packaging Gate

- verify `package.json` fields for `name`, `version`, `license`, `repository`, `bugs`, and `homepage` once the final public URLs exist
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
