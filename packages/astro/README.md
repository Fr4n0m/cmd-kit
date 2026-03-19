# @cmd-kit/astro

Astro bindings for Cmd+kit.

## Install

```bash
npm install @cmd-kit/astro @astrojs/react react react-dom
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

For advanced renderers or hook-driven integrations, build a React island and use the types re-exported by `@cmd-kit/astro`.
