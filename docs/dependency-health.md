# Dependency Health

## Current Status

Last reviewed: March 13, 2026

- `npm audit` reports `5` moderate vulnerabilities
- no high or critical vulnerabilities are currently reported
- the findings come from the Astro checking toolchain used by `apps/web`, not from the published runtime packages

Affected chain:

- `@astrojs/check`
- `@astrojs/language-server`
- `volar-service-yaml`
- `yaml-language-server`
- `lodash`

## Why This Is Still Open

- the current `npm audit fix` recommendation is a semver-major change path through `@astrojs/check`
- the vulnerable tree is development-only tooling for Astro diagnostics
- `@cmd-kit/core`, `@cmd-kit/react`, and `@cmd-kit/vue` do not ship these dependencies in their npm tarballs

## Release Impact

- this is still a production-readiness blocker for the repository
- it is not currently a published runtime-package blocker for consumers of the command palette packages
- the issue should be revisited before the first public release

## Required Follow-Up

- re-check `npm audit` before every release candidate
- watch for a non-breaking Astro toolchain update that clears the advisory chain
- avoid force-applying semver-major audit fixes without validating the Astro docs workflow first
