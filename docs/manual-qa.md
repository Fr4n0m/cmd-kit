# Manual QA

## Scope

Manual checks to run before a public release after local automated checks already pass.

## Web App

- open the landing on desktop and mobile widths
- verify the top navigation, docs links, and playground entry points
- toggle language and confirm labels update consistently
- open the configurator and confirm generated code changes match the preview
- copy snippets for `React`, `Vue`, `Preact`, `Vanilla JS`, `CSS Variables`, `Tailwind`, and `JSON`
- verify `robots.txt` and `sitemap.xml` once the final site URL is configured

## React

- open the palette with `Cmd/Ctrl + K`
- navigate with arrow keys
- run an action with `Enter`
- navigate into nested commands and back out with `Back`, `Escape`, and `Backspace`
- verify recent commands appear after running an action
- verify focus returns to the previous element after closing

## Vue

- start the Vue example app
- open the palette and verify grouped rendering
- verify nested commands render and navigate correctly
- verify recent commands and theme props still work

## Preact

- start the Preact example app
- repeat the same interaction checks as React
- confirm the API surface still matches the documented React-facing adapter

## Astro

- start the Astro example app
- verify the page remains static except for the command palette island
- open the palette and verify nested navigation and recent items

## Vanilla

- start the vanilla example app
- open the palette with `Cmd/Ctrl + K`
- verify fuzzy search, nested navigation, and execution callbacks
- verify the status area reflects link and callback execution paths

## Accessibility

- tab through the web app and React palette
- verify visible focus indicators
- verify the dialog traps focus while open
- verify copy feedback and empty states are announced correctly
- repeat a quick screen-reader smoke pass on the landing and React palette
