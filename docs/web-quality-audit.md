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
- `react-doctor` cleared to `100/100` for both `apps/web` and `packages/react`
- semantic tab and live-region behavior in the snippet panel
- static docs pages for React, Vue, Preact, and Astro usage

## Findings

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
  Metadata is still intentionally conservative because the public domain and branded social assets do not exist yet.
  Impact: acceptable for local validation, but launch quality will still need final Open Graph image, URL, and sharing metadata.
  Action: add final brand-linked social metadata once the public site URL and assets exist.

- `apps/web`
  Security headers and CSP are not enforced from inside the app code.
  Impact: this is normal for a static front-end repo, but a production review still needs to verify deployment-layer headers.
  Action: verify headers in the final host configuration during the deployment audit.

## Follow-Up Checklist

- keep the configurator split by feature as new public API surface is added
- run a deployed Lighthouse audit
- run a deployed Core Web Vitals review
- add final `site` config in Astro
- add sitemap and robots handling
- add richer SEO metadata and structured data
- verify production headers and CSP at deployment time
