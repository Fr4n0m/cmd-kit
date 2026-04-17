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

Reviewed: April 17, 2026

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
- production sitemap/robots setup is active for `https://cmd-kit.vercel.app`:
  - `robots.txt` allows crawl and exposes sitemap URL
  - canonical + `hreflang` tags resolve to final public origin
  - absolute URLs
  - localized route coverage (`en` + `es`)
  - alternate language links (`hreflang`)

## Findings

### Medium

- `apps/web`
  No deployed Lighthouse or Core Web Vitals measurements have been captured yet.
  Impact: performance and page-experience status is still assumed from architecture rather than verified from runtime.
  Action: run Lighthouse and Core Web Vitals checks on the deployed site before release.

### Low

- `apps/web/src/layouts/BaseLayout.astro`
  Metadata is production-safe, but social sharing can still be improved with a dedicated branded Open Graph image.
  Impact: indexing is ready, but social preview quality can be improved.
  Action: add a final branded OG image asset and map it per page type.

- `apps/web`
  Security headers and CSP are not enforced from inside the app code.
  Impact: this is normal for a static front-end repo, but a production review still needs to verify deployment-layer headers.
  Action: verify headers in the final host configuration during the deployment audit.

## Follow-Up Checklist

- keep the configurator split by feature as new public API surface is added
- run a deployed Lighthouse audit
- run a deployed Core Web Vitals review
- keep `PUBLIC_SITE_URL` aligned with deployment origin (`https://cmd-kit.vercel.app`)
- verify `sitemap.xml` and `robots.txt` after any domain change
- add richer SEO metadata and structured data
- verify production headers and CSP at deployment time
