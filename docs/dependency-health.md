# Dependency Health

## Current Status

Last reviewed: March 16, 2026

- `npm audit` reports `0` vulnerabilities
- the previous Astro diagnostics-chain advisory is resolved after updating `@astrojs/check` to `0.9.8`
- local verification still passes `test`, `typecheck`, `build`, and `pack:verify`

Resolved chain:

- `@astrojs/check`
- `@astrojs/language-server`
- `volar-service-yaml`
- `yaml-language-server`
- `lodash`

## Release Impact

- there is no current `npm audit` blocker for the repository
- runtime packages remain clean of Astro-specific tooling dependencies in their published tarballs
- dependency health should still be re-checked before every release candidate

## Required Follow-Up

- re-run `npm audit` before every release candidate
- review minor updates in the Astro toolchain before adopting them
- keep the release checklist in sync with the actual audit result
