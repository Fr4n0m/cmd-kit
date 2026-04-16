# Product Vision

## Summary

`cmd+kit` is a customizable command palette toolkit for web applications.

It is designed as a framework-agnostic core with official adapters for React, Vue, Preact, and Astro, plus framework-free browser usage through Core.

## Product Pillars

- Framework-agnostic foundation.
- Full customization of theme, content, layout, icons, and behavior.
- High-quality default experience with room for advanced overrides.
- Accessibility and keyboard support from the start.
- Open source distribution with a clean npm integration path.

## User Value

Developers should be able to:

- install a package and get a working command palette quickly
- use the toolkit in the framework they already ship
- customize it through props or config in code
- opt into a visual builder on the landing page
- copy generated code
- apply token-based theming and class-based styling overrides
- replace built-in rendering when they need total control

## Primary Use Cases

- Application navigation
- Action launcher
- Settings and preferences access
- Search entry point
- Dashboard shortcuts
- Admin tooling
- Portfolio or product site quick navigation

## MVP Scope

The first version should include:

- command palette open and close behavior
- configurable `Cmd/Ctrl + K` shortcut
- keyboard navigation
- fuzzy search
- sections and grouped items
- icons per item
- customizable labels and empty states
- default UI adapters for React, Vue, Preact, and Astro
- headless core API
- theming through tokens (including dual light/dark mode) and class hooks
- landing page in English and Spanish
- live playground with real-time preview
- code export for React, Vue, Preact, Astro, and Core (Vanilla JS)
- accessibility baseline with ARIA roles and focus management

## Deferred Scope

These are good candidates for later phases unless they fall out naturally from the architecture:

- additional framework adapters beyond the current official set (for example Svelte or Solid)
- async remote providers with caching strategies
- advanced history persistence and cross-device recents sync
- stacked/parallel command contexts beyond current nested flows
- analytics hooks
- plugin ecosystem
- visual theme marketplace

## Product Constraints

- The API must stay small enough to learn quickly.
- The default experience must feel polished without locking users into one visual style.
- The headless core cannot depend on React.
- The core must stay compatible with adapter packages for multiple frameworks rather than drifting toward React-only assumptions.
- Landing page customization must map cleanly to code generation, not to a separate incompatible model.
