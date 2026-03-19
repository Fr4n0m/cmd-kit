# @cmd-kit/astro

Astro bindings for Cmd+kit.

## Install

```bash
npm install @cmd-kit/astro
```

## Usage

```astro
---
import CommandPalette from "@cmd-kit/astro/component";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [{ id: "dashboard", title: "Dashboard", href: "/dashboard" }]
  }
];
---

<CommandPalette sections={sections} title="Project commands" />
```

For advanced control, pass `items`/`sections`, `messages`, `theme`, `shortcut`, and `recents` props directly to the Astro component.
