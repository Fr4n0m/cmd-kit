# @cmd-kit/core

Framework-agnostic command palette core for `cmd+kit`.

This package provides the headless model used by the React adapter and future framework integrations.

## Scope

- command items, groups, and sections
- fuzzy search integration
- snapshot building
- command execution results
- nested navigation modeling
- async source loading primitives
- recent command state primitives
- theme helpers for resolved tokens and CSS variable generation

## Minimal Example

```ts
import {
  createCommandSnapshot,
  createResolvedConfig,
  dispatchCommandExecution
} from "@cmd-kit/core";

const config = createResolvedConfig({
  sections: [
    {
      id: "navigation",
      title: "Navigation",
      items: [{ id: "home", title: "Dashboard", href: "/dashboard" }]
    }
  ]
});

const snapshot = createCommandSnapshot(config, "dash");

await dispatchCommandExecution({
  item: snapshot.items[0],
  port: {
    openHref: ({ href }) => window.location.assign(href)
  }
});
```

Use `@cmd-kit/react` if you want a ready-to-use UI.
