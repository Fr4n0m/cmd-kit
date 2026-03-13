# Web Quality Audit

## Scope

Baseline review of `apps/web` using the criteria behind:

- `web-quality-audit`
- `accessibility`
- `performance`
- `core-web-vitals`
- `seo`
- `best-practices`

This pass is code-first. It does not replace a deployed Lighthouse run against the real public domain.

## Current Baseline

Reviewed: March 13, 2026

What is already in place:

- Astro static shell with React islands only where interactivity is needed
- skip link, focus-visible styling, and reduced-motion support
- basic metadata in the shared layout:
  - description
  - theme color
  - canonical link
  - Open Graph title and description
- React playground coverage through tests

## Findings

### High

- `apps/web/src/components/PlaygroundIsland.tsx`
  The configurator is too large for comfortable maintenance at `888` lines.
  Impact: harder review, weaker component boundaries, worse `react-doctor` output, and more risk when expanding the public API.
  Action: split by feature slices such as preview, section editor, item editor, snippet tabs, and localized labels.

### Medium

- `apps/web/astro.config.mjs`
  No final `site` URL is configured yet.
  Impact: canonical behavior can only be provisional and sitemap generation should wait for the public domain.
  Action: set the final site URL once the public domain is fixed.

- `apps/web`
  No final sitemap or robots handling is defined yet.
  Impact: SEO is not at a production bar yet.
  Action: add sitemap and robots once the final public URL is known.

- `apps/web`
  No deployed Lighthouse or Core Web Vitals measurements have been captured yet.
  Impact: performance and page-experience status is still assumed from architecture rather than verified from runtime.
  Action: run Lighthouse and Core Web Vitals checks on the deployed site before release.

### Low

- `apps/web/src/layouts/BaseLayout.astro`
  Metadata is still minimal.
  Impact: acceptable for development, but richer social metadata and structured data will improve launch quality.
  Action: add richer Open Graph fields and structured data once the public brand assets and domain are fixed.

## Follow-Up Checklist

- split `PlaygroundIsland` into smaller feature components
- run a deployed Lighthouse audit
- run a deployed Core Web Vitals review
- add final `site` config in Astro
- add sitemap and robots handling
- add richer SEO metadata and structured data
