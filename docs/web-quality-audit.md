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

Reviewed: April 16, 2026

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
- SEO safety fallback implemented when `PUBLIC_SITE_URL` is missing:
  - pages emit `noindex, nofollow`
  - `robots.txt` returns `Disallow: /`
  - `sitemap.xml` is intentionally empty and sends `X-Robots-Tag: noindex, nofollow`
- production-ready sitemap format is in place when `PUBLIC_SITE_URL` is configured:
  - absolute URLs
  - localized route coverage (`en` + `es`)
  - alternate language links (`hreflang`)

## Findings

### Medium

- `apps/web/astro.config.mjs`
  Final `site` URL is still pending in environment configuration.
  Impact: the app is intentionally non-indexable until `PUBLIC_SITE_URL` is set.
  Action: set `PUBLIC_SITE_URL` on the production deployment target before indexing.

- `apps/web`
  `robots.txt` and `sitemap.xml` are production-ready, but full SEO activation is gated by final public origin.
  Impact: indexing remains blocked by design until final URL setup.
  Action: configure final production origin and re-run deployed validation checks.

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
- configure final `PUBLIC_SITE_URL` in deployment
- verify `sitemap.xml` and `robots.txt` against the final production origin
- add richer SEO metadata and structured data
- verify production headers and CSP at deployment time
