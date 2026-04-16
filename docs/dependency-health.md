# Dependency Health

## Current Status

Last reviewed: April 16, 2026

- `npm audit --audit-level=moderate` currently reports `11` vulnerabilities (`8 moderate`, `3 high`)
- affected dependency groups include:
  - `vite`
  - `defu`
  - `picomatch`
  - `brace-expansion`
  - `h3`
  - `smol-toml`
  - `yaml` toolchain chain (`yaml-language-server` / `@astrojs/check`)
- local verification workflows (`test`, `typecheck`, `build`, `pack:verify`) must be treated separately from security posture

Current actionable path:

- run `npm audit fix` and re-check
- evaluate `npm audit fix --force` changes in a controlled branch for breaking updates
- prioritize runtime/dev-server exposure fixes (`vite`) before release gating

## Release Impact

- the repository currently has an active security blocker for release
- release gate should remain closed until vulnerability scope is reduced to an explicitly accepted risk profile
- dependency health must be re-checked before every release candidate

## Required Follow-Up

- re-run `npm audit` before every release candidate
- apply safe `npm audit fix` updates and validate CI gates
- review forced updates in dedicated PRs with changelog diff checks
- keep the release checklist in sync with the current audit output
