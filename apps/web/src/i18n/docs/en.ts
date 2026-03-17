import type { DocPageData, DocSlug } from "./shared";
export const docsEn: Record<DocSlug, DocPageData> = {"getting-started": {
    slug: "getting-started",
    navLabel: "Getting Started",
    eyebrow: "Docs",
    heading: "Getting Started",
    title: "Cmd+kit | Getting Started",
    description: "Install Cmd+kit, choose the right adapter, and configure your first palette.",
    intro: [
      "<code>Cmd+kit</code> is shipped as npm packages. Choose the adapter that matches your stack, install it with your package manager, and configure the palette through typed sections, copy, theme tokens, and optional async sources."
    ],
    sections: [
      { id: "packages", label: "Packages", blocks: [{ type: "list", items: ["<code>@cmd-kit/react</code>: React component and hook", "<code>@cmd-kit/vue</code>: Vue component and composable API", "<code>@cmd-kit/preact</code>: Preact adapter aligned with the React-facing API", "<code>@cmd-kit/core</code>: headless primitives for custom UIs and integrations"] }] },
      { id: "install", label: "Install", blocks: [{ type: "install-selector" }] },
      { id: "command-model", label: "Command model", blocks: [{ type: "paragraph", html: "Every adapter uses the same structure: sections contain items, and items can open links, run callbacks, or navigate into nested sections." }, { type: "code", lang: "ts", label: "ts", code: `const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "home", title: "Home", href: "/" },
      { id: "settings", title: "Settings", shortcut: "G S" }
    ]
  }
];` }] },
      { id: "choose-your-adapter", label: "Choose your adapter", blocks: [{ type: "list", items: ['<a href="/docs/react">React</a>: the default packaged UI', '<a href="/docs/vue">Vue</a>: Vue-first integration', '<a href="/docs/preact">Preact</a>: lighter runtime with a familiar API', '<a href="/docs/core">Core</a>: headless path for custom rendering', '<a href="/docs/playground">Playground</a>: guided explanation of the configurator and exports'] }] },
      { id: "customization-path", label: "Customization path", blocks: [{ type: "paragraph", html: 'When the base setup works, move to <a href="/docs/customization">Customization</a> to style the palette, override messages, and plug async sources.' }] }
    ]
  },
  react: {
    slug: "react",
    navLabel: "React",
    eyebrow: "React",
    heading: "React Integration",
    title: "Cmd+kit | React",
    description: "Install the React package and configure sections, theming, messages, and render overrides.",
    intro: ["<code>@cmd-kit/react</code> ships a ready-to-use <code>CommandPalette</code> component plus the <code>useCommandPalette</code> hook for custom integrations."],
    sections: [
      { id: "install", label: "Install", blocks: [{ type: "install-selector", adapter: "react", showAdapter: false, showLink: false }] },
      { id: "basic-usage", label: "Basic usage", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `import { CommandPalette } from "@cmd-kit/react";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" }
    ]
  }
];

export function Example() {
  return <CommandPalette sections={sections} title="Project commands" />;
}` }] },
      { id: "core-props", label: "Core props", blocks: [{ type: "list", items: ["<code>sections</code> or <code>items</code>: static data", "<code>source</code>: computed or async commands", "<code>messages</code>: placeholder, empty state, close label", "<code>theme</code>: colors, border, radius, shadow", "<code>classNames</code> and <code>renderers</code>: visual and structural overrides", "<code>open</code>, <code>defaultOpen</code>, <code>onOpenChange</code>: controlled state"] }] },
      { id: "customization-example", label: "Customization example", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  classNames={{
    dialog: "palette-shell",
    item: "palette-item"
  }}
  messages={{
    searchPlaceholder: "Search actions",
    noResults: "No commands match your query."
  }}
  theme={{
    accentColor: "#12b5e5",
    backgroundColor: "#0f1720",
    textColor: "#f5fbff"
  }}
  sections={sections}
  title="Workspace commands"
/>` }] },
      { id: "async-source", label: "Async source", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  source={async () => {
    const response = await fetch("/api/commands");
    return response.json();
  }}
  title="Workspace commands"
/>` }] }
    ]
  },
  vue: {
    slug: "vue", navLabel: "Vue", eyebrow: "Vue", heading: "Vue Integration", title: "Cmd+kit | Vue",
    description: "Install the Vue package and configure sections, messages, theming, and recent commands.",
    intro: ["<code>@cmd-kit/vue</code> provides a <code>CommandPalette</code> component plus a Vue composable for cases where you want to orchestrate state more directly."],
    sections: [
      { id: "install", label: "Install", blocks: [{ type: "install-selector", adapter: "vue", showAdapter: false, showLink: false }] },
      { id: "basic-usage", label: "Basic usage", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" }
    ]
  }
];
</script>

<template>
  <CommandPalette :sections="sections" title="Project commands" />
</template>` }] },
      { id: "what-you-can-configure", label: "What you can configure", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code>, and <code>source</code>", "<code>messages</code> for localized or product-specific copy", "<code>theme</code> for palette colors and surfaces", "<code>classNames</code> for slot-level styling hooks", "<code>recents</code> for automatic recent command tracking"] }] },
      { id: "messages-example", label: "Messages example", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :messages="{
    searchPlaceholder: 'Search docs, pages, or actions',
    noResults: 'No matching command found.'
  }"
  :sections="sections"
  title="Project commands"
/>` }] }
    ]
  },
  preact: {
    slug: "preact", navLabel: "Preact", eyebrow: "Preact", heading: "Preact Integration", title: "Cmd+kit | Preact",
    description: "Install the Preact package and configure a command palette with the same core API.",
    intro: ["<code>@cmd-kit/preact</code> mirrors the React-facing API while targeting Preact."],
    sections: [
      { id: "install", label: "Install", blocks: [{ type: "install-selector", adapter: "preact", showAdapter: false, showLink: false }] },
      { id: "basic-usage", label: "Basic usage", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `import { CommandPalette } from "@cmd-kit/preact";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [{ id: "dashboard", title: "Dashboard", href: "/dashboard" }]
  }
];

export function Example() {
  return <CommandPalette sections={sections} title="Project commands" />;
}` }] },
      { id: "configuration-surface", label: "Configuration surface", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code>, and <code>source</code> for static or async data", "<code>messages</code> for copy overrides", "<code>theme</code> for visual tokens", "<code>classNames</code> for slot-level styling", "<code>renderers</code> for rendering overrides", "<code>recents</code> for automatic recent commands"] }] },
      { id: "theme-example", label: "Theme example", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  theme={{
    accentColor: "#12b5e5",
    backgroundColor: "#0f1720",
    textColor: "#f5fbff"
  }}
  title="Project commands"
/>` }] }
    ]
  },
  astro: {
    slug: "astro", navLabel: "Astro", eyebrow: "Astro", heading: "Astro Integration", title: "Cmd+kit | Astro",
    description: "Use Cmd+kit in Astro by pairing the static shell with a framework island such as React, Vue, or Preact.",
    intro: ["Astro is the recommended shell for docs and marketing pages because it keeps the static surface fast while letting you hydrate <code>Cmd+kit</code> only where the interface actually needs interactivity."],
    sections: [
      { id: "recommended-approach", label: "Recommended approach", blocks: [{ type: "list", items: ["render landing and docs pages as static Astro pages", "use <code>@cmd-kit/react</code>, <code>@cmd-kit/vue</code>, or <code>@cmd-kit/preact</code> inside an Astro island", "hydrate the palette only on interactive routes or components"] }] },
      { id: "example-with-react", label: "Example with React", blocks: [{ type: "code", lang: "astro", label: "astro", code: `---
import PlaygroundPalette from "../components/PlaygroundPalette.tsx";
---

<PlaygroundPalette client:load />` }] },
      { id: "why-this-path-fits-the-project", label: "Why this path fits the project", blocks: [{ type: "paragraph", html: "<code>Cmd+kit</code> separates the headless core from its UI adapters. That makes Astro a delivery shell, not a framework you have to target with a dedicated rendering engine first." }] },
      { id: "status", label: "Status", blocks: [{ type: "paragraph", html: "Astro guidance is documented and used by this repository's own web app. A dedicated Astro wrapper package is not necessary yet because the island pattern already covers the real integration path." }] }
    ]
  },
  core: {
    slug: "core", navLabel: "Core", eyebrow: "Core", heading: "Headless Core", title: "Cmd+kit | Core",
    description: "Use the Cmd+kit headless core to build a command palette in vanilla browser code or your own framework adapter.",
    intro: ["<code>@cmd-kit/core</code> is the framework-agnostic center of the project. It gives you typed command sections, fuzzy search, snapshot building, command execution primitives, recent command tracking, and theme token helpers without forcing any rendering layer."],
    sections: [
      { id: "install", label: "Install", blocks: [{ type: "install-selector", adapter: "core", showAdapter: false, showLink: false }] },
      { id: "what-it-covers", label: "What it covers", blocks: [{ type: "list", items: ["command items and sections", "fuzzy filtering through the shared search pipeline", "grouped snapshots for rendering", "nested command navigation modeling", "execution dispatch for callbacks, links, and nested pages", "recent command state primitives", "theme resolution and CSS variable helpers"] }] },
      { id: "minimal-example", label: "Minimal example", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import {
  createCommandSnapshot,
  createResolvedConfig,
  dispatchCommandExecution
} from "@cmd-kit/core";

const config = createResolvedConfig({
  sections: [
    {
      id: "navigation",
      title: "Navigation",
      items: [
        { id: "home", title: "Dashboard", href: "/dashboard" }
      ]
    }
  ]
});

const snapshot = createCommandSnapshot(config, "dash");

await dispatchCommandExecution({
  item: snapshot.items[0],
  port: {
    openHref: ({ href }) => window.location.assign(href)
  }
});` }] },
      { id: "when-to-use-it-directly", label: "When to use it directly", blocks: [{ type: "paragraph", html: "Use the core directly when you are building your own UI, integrating into another framework, or keeping the command palette fully custom. If you want a ready-to-use component, start with one of the official adapters instead." }] }
    ]
  },
  customization: {
    slug: "customization", navLabel: "Customization", eyebrow: "Customization", heading: "Customization", title: "Cmd+kit | Customization",
    description: "Customize command structure, theme tokens, copy, renderers, and async sources in Cmd+kit.",
    intro: ["<code>Cmd+kit</code> is configured in code. The main customization surface is the command structure itself, followed by messages, theme tokens, render overrides, and optional async sources.", 'If you want a guided UI for exploring these settings before coding them, see the <a href="/docs/playground">playground documentation</a>.'],
    sections: [
      { id: "define-sections-and-items", label: "Define sections and items", blocks: [{ type: "code", lang: "ts", label: "ts", code: `const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "Open the main workspace",
        href: "/dashboard",
        keywords: ["home", "workspace"]
      }
    ]
  }
];` }] },
      { id: "nested-navigation", label: "Nested navigation", blocks: [{ type: "code", lang: "ts", label: "ts", code: `const sections = [
  {
    id: "search",
    title: "Search",
    items: [
      {
        id: "docs",
        title: "Documentation",
        children: [
          {
            id: "guides",
            title: "Guides",
            items: [
              { id: "api", title: "API reference" }
            ]
          }
        ]
      }
    ]
  }
];` }] },
      { id: "theme-tokens", label: "Theme tokens", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  theme={{
    accentColor: "#12b5e5",
    backgroundColor: "#0f1720",
    textColor: "#f5fbff",
    mutedColor: "#9fb4c4",
    borderColor: "#264152",
    overlayColor: "rgba(4, 9, 13, 0.64)",
    radius: "22px",
    shadow: "0 24px 80px rgba(0, 0, 0, 0.42)"
  }}
/>` }] },
      { id: "messages", label: "Messages", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  messages={{
    searchPlaceholder: "Search commands",
    noResults: "No results match your query.",
    closeLabel: "Close palette"
  }}
/>` }] },
      { id: "render-and-style-overrides", label: "Render and style overrides", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  classNames={{
    dialog: "palette-shell",
    item: "palette-item",
    emptyState: "palette-empty"
  }}
  renderers={{
    title: ({ activeTitle, breadcrumbs }) => (
      <span>{breadcrumbs.join(" / ") || activeTitle}</span>
    ),
    emptyState: ({ query }) => <span>No result for "{query}"</span>
  }}
  sections={sections}
/>` }] },
      { id: "async-source", label: "Async source", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  source={async () => {
    const response = await fetch("/api/commands");
    return response.json();
  }}
  title="Workspace commands"
/>` }] },
      { id: "generate-css-variables", label: "Generate CSS variables", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import { createThemeCssText } from "@cmd-kit/core";

const css = createThemeCssText({
  accentColor: "#12b5e5",
  backgroundColor: "#0f1720",
  textColor: "#f5fbff"
});

const themeBlock = \`:root {
\${css}
}\`;` }] }
    ]
  },
  playground: {
    slug: "playground", navLabel: "Playground", eyebrow: "Playground", heading: "Playground Guide", title: "Cmd+kit | Playground Docs",
    description: "Learn how to use the Cmd+kit playground to configure commands, preview behavior, and export production-ready starter code.",
    intro: ["The playground is the fastest way to shape a <code>Cmd+kit</code> integration before moving the result into your codebase. It lets you configure the command model, test the interaction flow in a live preview, and export starter code for the supported adapters."],
    sections: [
      { id: "what-the-playground-is-for", label: "What the playground is for", blocks: [{ type: "list", items: ["prototype your command palette structure without editing source files first", "test nested navigation, search behavior, and command grouping in real time", "adjust theme tokens and copy before integrating the package", "export starter snippets for React, Vue, Preact, vanilla browser code, CSS, Tailwind, and JSON"] }] },
      { id: "main-areas", label: "Main areas", blocks: [{ type: "list", items: ["<strong>Basics</strong>: title, keyboard shortcut, source mode, and high-level settings", "<strong>Sections</strong>: create groups of commands and edit each item", "<strong>Nested commands</strong>: add child sections to model drill-down navigation", "<strong>Messages</strong>: customize placeholder, empty state, and related UI copy", "<strong>Theme</strong>: tune accent, surface, border, text, radius, and shadow values", "<strong>Preview</strong>: validate the interaction and keyboard flow live", "<strong>Code</strong>: export the current config in the format you need"] }] },
      { id: "how-to-work-with-it", label: "How to work with it", blocks: [{ type: "list", ordered: true, items: ["Start by defining your root sections and the commands inside each one.", "Add shortcuts, links, subtitles, and keywords where they improve discoverability.", "Create nested sections for flows that should drill into a second level.", "Adjust messages and theme tokens until the preview matches your product.", "Switch the export target and copy the generated starter code into your app."] }] },
      { id: "source-modes", label: "Source modes", blocks: [{ type: "paragraph", html: "The playground supports both static and async-style configuration. Use static mode to model inline sections. Use async mode when your final integration will load commands from an API or another runtime source and you want to verify loading behavior earlier." }] },
      { id: "exports", label: "Exports", blocks: [{ type: "paragraph", html: "The generated code is meant to be a practical starting point, not a locked template. Treat the export as a base integration and then refine naming, styles, and app-specific behavior inside your codebase." }] },
      { id: "best-practice", label: "Best practice", blocks: [{ type: "paragraph", html: "Use the playground to converge on structure and configuration quickly, then move to the package documentation pages for production API details. The playground accelerates onboarding; the docs remain the source of truth." }] }
    ]
  }
};

