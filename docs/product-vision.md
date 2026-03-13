# Product Vision

## Summary

`cmd+kit` is a customizable command palette toolkit for web applications.

It is designed as a framework-agnostic core with official React support first, followed by adapter support for other frontend ecosystems such as Vue, Svelte, Solid, Preact, Astro integrations, and vanilla browser usage.

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
- copy generated code and styles
- use Tailwind or plain CSS approaches
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
- default UI for React
- headless core API
- theming through tokens and class hooks
- Tailwind-friendly styling approach
- CSS variables for non-Tailwind setups
- landing page in English and Spanish
- live playground with real-time preview
- code export for React usage and styling tokens
- accessibility baseline with ARIA roles and focus management

## Deferred Scope

These are good candidates for later phases unless they fall out naturally from the architecture:

- framework adapters beyond React, including Vue, Svelte, Solid, Preact, Astro-facing integrations, and vanilla browser wrappers
- async remote providers with caching strategies
- command history and recents
- nested pages or stacked command views
- analytics hooks
- plugin ecosystem
- visual theme marketplace

## Product Constraints

- The API must stay small enough to learn quickly.
- The default experience must feel polished without locking users into one visual style.
- The headless core cannot depend on React.
- The core must stay compatible with adapter packages for multiple frameworks rather than drifting toward React-only assumptions.
- Landing page customization must map cleanly to code generation, not to a separate incompatible model.
