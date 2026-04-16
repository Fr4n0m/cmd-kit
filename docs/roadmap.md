# Roadmap

## Status Overview

Current status: `active development`

Progress (approximate):

- Docs: `100%`
- Legal: `100%`
- Playground (UI + exports + UX): `95%`
- Quality and release readiness: `85%`

## Active Debt

- Manual QA across desktop and mobile remains pending as a release blocker.
- Adapter validation is in final phase: React/Preact/Vue/Astro baseline is aligned; framework-free runtime now lives in `@cmd-kit/core` (package `@cmd-kit/vanilla` removed).
- Motion/interaction parity still needs final verification pass across adapters after introducing shared `reducedMotion` API and hover-animation defaults.
- Repository docs hygiene is pending: `/docs` currently contains private development notes that should not live in the public GitHub repository.
- Final release confidence still requires clean-room validation outside this monorepo (fresh projects from zero per package).
- Long-form docs overhaul for public web docs is complete at content level (EN/ES adapters, core, customization, playground).
- Playground documentation content is complete at product level (controls map, examples, guided flows EN/ES).

## Phase 0 - Definition

Status: `hecho`

Hecho:

- Product vision, architecture, and repository conventions are defined and documented.
- MVP direction and package split are stable.

En curso:

- None.

Bloqueado:

- None.

Siguiente:

- Keep vision and architecture docs aligned with scope changes.

## Phase 1 - Monorepo and Tooling

Status: `hecho`

Hecho:

- Workspace, TypeScript, tests, linting, formatting, and package-level scripts are in place.
- Packaging verification (`pack:verify`) and release scaffolding are available.

En curso:

- Final metadata polish once public repository links are definitive.

Bloqueado:

- Public URL decisions.

Siguiente:

- Apply final repository/homepage/issues URLs when public setup is frozen.

## Phase 2 - Core Engine

Status: `en curso`

Hecho:

- Headless command model, fuzzy filtering, snapshots, nested sections, async source loading, recents, and execution dispatch are implemented.
- Core remains framework-agnostic.

En curso:

- Hardening execution semantics for more real-world integration flows.
- Improving state modeling around richer navigation patterns.

Bloqueado:

- None.

Siguiente:

- Lock extension boundaries for future adapters and complete final API review before first public release.

## Phase 3 - Adapter Packages

Status: `en curso`

Hecho:

- Official adapters are available for React, Vue, Preact, and Astro integration.
- Customization surfaces (`messages`, `theme`, `source`, class hooks, render hooks/slots) are documented and tested.
- React and Preact are now aligned 1:1 in defaults (theme behavior, demo defaults, shortcut rendering, icon fallback behavior, compact spacing baseline).
- `@cmd-kit/vue` and `@cmd-kit/astro` visual/behavior parity closed against React baseline.
- `@cmd-kit/vanilla` package removed; its browser UI runtime was migrated to `@cmd-kit/core` (`createCommandPalette`) as the official framework-free path.
- Shared `reducedMotion` option is now integrated at config/API level across adapters and core runtime.

En curso:

- Final behavior QA pass for hover/motion parity between React/Preact/Vue/Astro/core runtime.
- [x] ~~Theme API nativa con soporte dual (`theme.light` / `theme.dark`) en core + adaptadores, eliminando la necesidad de resolver ambos temas manualmente en snippets.~~

Bloqueado:

- None.

Siguiente:

- Close README/docs parity for all adapters and then move to release-hardening tasks.

## Phase 4 - Docs and Web

Status: `en curso`

Hecho:

- Localized docs structure is unified and route duplication was removed.
- Docs coverage exists for Getting Started, React, Vue, Preact, Astro, Core, Customization, and Playground.
- FAQ quality has been raised with more production-oriented install and adoption questions.
- Docs sub-navigation active-state behavior on click and scroll is now stable.
- Web theme persistence behavior is now consistent: default theme is dark for first visit, and user-selected theme is persisted reliably across navigation until changed again.
- Home hero command palette theme sync was hardened: the hero preview now reads the live document theme and updates consistently on theme changes/navigation (no mixed dark/light tokens).
- Hero preview theme token mapping was completed for both light/dark modes to avoid partial fallback to dark defaults (mixed UI colors/text after navigation).
- Hero React island hydration sync was fixed to read the real document theme immediately on mount, preventing stale dark state after client-side navigation back to home.
- Hero theme resolution now prioritizes persisted user preference (`cmd-kit-theme`) and also resyncs on Astro navigation events, reducing edge cases where SPA navigation could leave the hero preview out of sync.
- Home hero preview adapter was unified with the global palette (`@cmd-kit/astro`) to remove cross-adapter behavior drift in theme/rendering.
- Astro adapter initialization was hardened for multi-instance pages (global palette + hero preview) by binding each script run to its own payload/root instance, preventing blank hero renders.
- Astro adapter bootstrap now processes all pending payload instances in one pass, ensuring pages with multiple palettes initialize reliably (global + hero) after script dedup/hoisting.
- Hover micro-interactions for icon/title scale were tuned in Astro/Core runtime (stronger scale + smoother timing curve) to improve perceived feedback and parity with other adapters.
- Astro adapter now applies icon/title hover scale transitions through runtime interaction handlers (mouseover/mouseout + active-state sync), reducing visual loss caused by list re-render timing.
- Astro hover transitions received a visibility pass (stronger scale + title translate) so icon/title motion remains clearly perceptible during real pointer navigation.
- Astro hover transitions were refined to remove horizontal title drift; title animation now keeps scale-only behavior for stable row alignment.
- Home landing sections and footer are now completed and aligned with the current product surface in both themes.

En curso:

- Structural cleanup of i18n content now completed for docs + landing/legal/playground pages (modular files by locale/section).
- Package-level README parity pass completed for latest shipped behavior (dual-theme support, reducedMotion, and playground-aligned guidance).
- Full cross-doc editorial and technical review completed (web docs EN/ES + package READMEs + root README + `/docs` process docs).

Bloqueado:

- None.

Siguiente:

- Keep docs aligned with shipped API changes.

## Phase 5 - Playground Product Surface

Status: `casi cerrado`

Hecho:

- Dedicated playground page, live configurator, preview, and multi-target exports are implemented.
- Sections, nested commands, theme, messages, and core behavior controls are available.

En curso:

- Landing integration of playground behavior is still pending full functional review.

Hecho (última tanda):

- Playground hero simplificado: copy más corto, limpieza de bloques informativos redundantes y soporte de assets visuales por tema (dark/light).
- Configurador reorganizado con divulgación progresiva (acordeones y edición bajo demanda) para reducir la sobrecarga visual inicial.
- Ajustes de layout/responsive del playground para mantener jerarquía más clara entre configuración, preview y export.
- Preview del playground migrada a palette embebida y siempre visible (aislada dentro del configurador), sincronizada en tiempo real con el estado actual, eliminando la dependencia del botón flotante de apertura.
- Preview dual estabilizada: se mantiene la vista embebida en vivo y también la apertura modal por botón/atajo para validar comportamiento real de la palette.
- Preset por defecto del playground actualizado: primer comando ahora es acción de cambio de tema (sin navegación a ruta externa).
- Tooltips de ayuda restringidos al icono de información (hover/focus explícito), evitando activación accidental al pasar por todo el campo.
- UX del configurador refinada: botón `Añadir sección` destacado y sin wrap, nuevos espaciados en bloques de sección/anidados, y numeración de acordeones reajustada.
- Controles avanzados simplificados: sombra en modo básico con toggle `Avanzado`, y radio con preview visual en vivo del redondeado.
- Pulido visual final de controles de apariencia: selectores de color redondos y compactos, ajuste de escala/posición en numeración de secciones, y alineación de altura entre previews de `Radio` y `Sombra`.
- Snippets del playground alineados a API nativa de tema dual: exportan `theme` con `light`+`dark` directamente, sin helpers manuales de resolución por snippet.
- Snippets del playground limpiados y normalizados: parseo/sangrías revisados en React, Preact, Vue, Astro y Core (Vanilla), evitando formatos ambiguos en props y objetos exportados.
- Superficies de export del playground simplificadas: eliminadas salidas redundantes de `Variables CSS` y `Tailwind` para dejar foco en adaptadores oficiales.
- UX final de acciones de código: botón de copiar integrado en el bloque de código con feedback visual (éxito/error) e icono animado (`copy` -> `check` -> `copy`).
- Ajuste final de consistencia visual en configurador: alturas de botones de edición (subir/bajar/eliminar/añadir) alineadas con inputs y espaciado corregido en acciones de sección.

Bloqueado:

- None.

Siguiente:

- Close landing integration review for playground behavior.

## Phase 6 - Legal and Compliance

Status: `hecho`

Hecho:

- Baseline legal/privacy structure exists in EN/ES.
- Legal pages rewritten with production-grade structure in EN/ES (Terms + Privacy): clear sections, allowed-use scope, liability boundaries, data categories, legal basis, rights, retention, third-party links, and update metadata.
- Legal pages finalized and approved as production-ready for current project scope.

En curso:

- None.

Bloqueado:

- None.

Siguiente:

- Keep legal pages updated when analytics/third-party integrations change.

## Phase 7 - Quality and Release Readiness

Status: `en curso`

Hecho:

- Local `test`, `typecheck`, `build`, and packing verification workflows are established.
- Example apps (React, Vue, Preact, Astro, plus framework-free core usage in `apps/example-vanilla`) are available for local verification.
- React quality tooling pass is already strong in current baseline.
- Adapter defaults updated to remove `squircle/corner-shape` usage globally (React, Preact, Vue, Astro).
- Recent commands deduplication shipped across adapters (an item shown in `Recent` no longer duplicates in its base section).
- Core framework-free runtime now auto-focuses the search input on open, enabling keyboard navigation immediately (no click required).
- Builds validated for `@cmd-kit/react`, `@cmd-kit/preact`, `@cmd-kit/vue`, and `@cmd-kit/astro` after the above fixes.
- Web imports migrated from relative paths to `@` alias in app source to improve maintainability and reduce path fragility.

En curso:

- Manual cross-device QA and deployed web quality audit completion.
- Final npm publishing readiness checklist and release rehearsal.

Bloqueado:

- Public deployment and npm account/package publication timing.

Siguiente:

- Complete release checklist gate: QA, web audit, metadata, publish config, and first release rehearsal.

## Next Milestones

1. Split private development docs from public product docs and keep only npm/package-facing documentation in the repository.
2. Run clean-room package validation in brand-new external projects (one per package) instead of relying only on in-repo examples.
3. Remove `apps/example-*` from the repository once package parity and external validation are complete.
4. Run full release gate and prepare first public npm release.

## Documentation Publishing Strategy (Target State)

Status: `hecho`

Objetivo:

- `README.md` raíz como punto de entrada del producto: visión general, instalación rápida y enlaces a documentación por paquete.
- Carpeta `/docs` del repo raíz enfocada a documentación general de proyecto: contribución, desarrollo, flujo de fork/PR, release process y guías de colaboración.
- Documentación técnica profunda de cada integración en el `README.md` de cada paquete (`packages/react`, `packages/vue`, `packages/preact`, `packages/astro`, `packages/core`).
- Mantener alineación entre:
  - docs de la landing (experiencia web),
  - README raíz (hub),
  - READMEs de paquetes (fuente técnica principal por adapter).

Regla operativa:

- Evitar duplicar documentación técnica extensa en `/docs` si ya vive en READMEs de paquetes.
- Usar `/docs` para procesos de proyecto y colaboración, no como reemplazo de la documentación por paquete.

Progreso actual:

- Primera pasada completa de READMEs por paquete completada con formato bilingüe profesional y guía de integración desde playground.
- Segunda pasada completa de documentación completada: coherencia técnica/editorial entre README raíz, READMEs de paquetes, docs web EN/ES y documentación operativa en `/docs`.
