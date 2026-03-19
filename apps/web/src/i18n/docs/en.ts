import type { DocPageData, DocSlug } from "./shared";
export const docsEn: Record<DocSlug, DocPageData> = {"getting-started": {
    slug: "getting-started",
    navLabel: "Getting Started",
    eyebrow: "Docs",
    heading: "Getting Started",
    title: "Cmd+kit | Getting Started",
    description: "Install Cmd+kit from npm, choose the right package, and understand the command model before integrating it into your app.",
    intro: [
      "<code>Cmd+kit</code> is installed from npm. Choose the package that matches your runtime, define your commands in code, and then customize the palette with messages, theme tokens, and rendering overrides."
    ],
    sections: [
      { id: "what-you-install", label: "What you install", blocks: [{ type: "list", items: ["<code>@cmd-kit/react</code>: ready-to-use React component and hook", "<code>@cmd-kit/vue</code>: Vue component and composable integration", "<code>@cmd-kit/preact</code>: Preact adapter with an API close to React", "<code>@cmd-kit/astro</code>: Astro-first entry point for island-based integration", "<code>@cmd-kit/core</code>: headless primitives for custom UIs or advanced integrations"] }] },
      { id: "choose-the-right-package", label: "Choose the right package", blocks: [{ type: "list", items: ['<a href="/docs/react">React</a>: use this if your application UI is React and you want the most complete packaged surface', '<a href="/docs/vue">Vue</a>: use this if your application is Vue and you want slots plus Vue-first state handling', '<a href="/docs/preact">Preact</a>: use this if you want the React-style API on a lighter runtime', '<a href="/docs/astro">Astro</a>: use this if your app shell is Astro and you want a package designed for Astro islands', '<a href="/docs/core">Core</a>: use this if you need a fully custom UI or a custom framework adapter'] }] },
      { id: "install", label: "Install", blocks: [{ type: "install-selector" }] },
      { id: "command-model", label: "Command model", blocks: [{ type: "paragraph", html: "The palette is built from <strong>sections</strong>. Each section contains <strong>items</strong>. An item can open a link, run a callback, or navigate into child sections." }, { type: "code", lang: "ts", label: "ts", code: `const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "Open the main workspace",
        href: "/dashboard",
        shortcut: "G D"
      },
      {
        id: "settings",
        title: "Settings",
        children: [
          {
            id: "preferences",
            title: "Preferences",
            items: [
              { id: "theme", title: "Theme" },
              { id: "account", title: "Account" }
            ]
          }
        ]
      }
    ]
  }
];` }] },
      { id: "first-integration-checklist", label: "First integration checklist", blocks: [{ type: "list", ordered: true, items: ["Choose the package that matches your UI runtime.", "Install it with your package manager together with the peer dependencies it needs.", "Start with one or two root sections and a handful of items.", "Make sure links, callbacks, and nested sections behave correctly before styling heavily.", 'Then move to <a href="/docs/customization">Customization</a> for icons, styles, messages, and async data.'] }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Do I need to start with <code>@cmd-kit/core</code>?</strong> No. Start with React, Vue, Preact, or Astro if one matches your app. Move to Core only if you need full control.", "<strong>Can I change icons, labels, and styles later?</strong> Yes. Sections, messages, theme tokens, class names, renderers, and slots are all meant to be customized.", "<strong>What if I use Astro?</strong> Use <code>@cmd-kit/astro</code> for the Astro entry point, then move to a custom island only if you need more advanced render control."] }] }
    ]
  },
  react: {
    slug: "react",
    navLabel: "React",
    eyebrow: "React",
    heading: "React Integration",
    title: "Cmd+kit | React",
    description: "Install the React package, render your first palette, and customize icons, styling, async data, and behavior with the public API.",
    intro: ["<code>@cmd-kit/react</code> ships a ready-to-use <code>CommandPalette</code> component plus the <code>useCommandPalette</code> hook for custom integrations."],
    sections: [
      { id: "install", label: "Install", blocks: [{ type: "install-selector", adapter: "react", showAdapter: false, showLink: false }] },
      { id: "basic-usage", label: "Basic usage", blocks: [{ type: "paragraph", html: "Start with one section and one item. That is enough to confirm the integration before you spend time on styling." }, { type: "code", lang: "tsx", label: "tsx", code: `import { CommandPalette } from "@cmd-kit/react";

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
      { id: "icons-and-custom-item-layout", label: "Icons and custom item layout", blocks: [{ type: "paragraph", html: "Use <code>renderItem</code> when you want to control the item row completely, including icons, spacing, and extra metadata." }, { type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  renderItem={(item, active) => (
    <div className={active ? "palette-row is-active" : "palette-row"}>
      <MyIcon name={item.id} />
      <div className="palette-row-copy">
        <strong>{item.title}</strong>
        {item.subtitle ? <span>{item.subtitle}</span> : null}
      </div>
    </div>
  )}
  title="Project commands"
/>` }] },
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
  recents={{ limit: 6, sectionTitle: "Recent" }}
  title="Workspace commands"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>How do I change the item icon?</strong> Use <code>renderItem</code> or <code>renderers.item</code> and map item ids to your own icon components.", "<strong>How do I restyle the component?</strong> Use <code>classNames</code> for slots and <code>theme</code> for the built-in tokens.", "<strong>Can I open it programmatically?</strong> Yes. Use controlled state with <code>open</code> and <code>onOpenChange</code>."] }] }
    ]
  },
  vue: {
    slug: "vue", navLabel: "Vue", eyebrow: "Vue", heading: "Vue Integration", title: "Cmd+kit | Vue",
    description: "Install the Vue package and customize the default palette with props, slots, theme tokens, and async sources.",
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
      { id: "slots-and-icons", label: "Slots and icons", blocks: [{ type: "paragraph", html: "Vue customization is slot-based. Use the <code>item</code> slot to control icons and row layout." }, { type: "code", lang: "vue", label: "vue", code: `<CommandPalette :sections="sections" title="Project commands">
  <template #item="{ item, active }">
    <div :class="['palette-row', { 'is-active': active }]">
      <MyIcon :name="item.id" />
      <div class="palette-row-copy">
        <strong>{{ item.title }}</strong>
        <span v-if="item.subtitle">{{ item.subtitle }}</span>
      </div>
    </div>
  </template>
</CommandPalette>` }] },
      { id: "messages-example", label: "Messages example", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :messages="{
    searchPlaceholder: 'Search docs, pages, or actions',
    noResults: 'No matching command found.'
  }"
  :sections="sections"
  title="Project commands"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>How do I change icons in Vue?</strong> Use the <code>item</code> slot and render your own icon component based on the current item.", "<strong>Can I customize the title area?</strong> Yes. Vue exposes <code>title</code>, <code>section-title</code>, <code>item</code>, and <code>empty-state</code> slots.", "<strong>How do I style it?</strong> Use <code>classNames</code> for class hooks and <code>theme</code> for the built-in palette tokens."] }] }
    ]
  },
  preact: {
    slug: "preact", navLabel: "Preact", eyebrow: "Preact", heading: "Preact Integration", title: "Cmd+kit | Preact",
    description: "Install the Preact package and customize a command palette with the same core model used by the React adapter.",
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
      { id: "icons-and-item-layout", label: "Icons and item layout", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  renderItem={(item, active) => (
    <div className={active ? "palette-row is-active" : "palette-row"}>
      <MyIcon name={item.id} />
      <span>{item.title}</span>
    </div>
  )}
  title="Project commands"
/>` }] },
      { id: "theme-example", label: "Theme example", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  theme={{
    accentColor: "#12b5e5",
    backgroundColor: "#0f1720",
    textColor: "#f5fbff"
  }}
  title="Project commands"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Is the API close to React?</strong> Yes. That is the point of the Preact adapter.", "<strong>Can I replace the default row UI?</strong> Yes. Use <code>renderItem</code> or the renderer hooks.", "<strong>When should I switch to Core?</strong> Only if the packaged UI stops fitting your product surface."] }] }
    ]
  },
  astro: {
    slug: "astro", navLabel: "Astro", eyebrow: "Astro", heading: "Astro Integration", title: "Cmd+kit | Astro",
    description: "Install the Astro package, mount your first palette in an island, and understand when to stay on the Astro package versus moving to a custom island.",
    intro: ["<code>@cmd-kit/astro</code> is the Astro package for Cmd+kit. It gives you an Astro-facing entry point for the packaged command palette, while still keeping the same command model and customization surface used across the other adapters."],
    sections: [
      { id: "when-to-use-the-astro-package", label: "When to use the Astro package", blocks: [{ type: "list", items: ["Use <code>@cmd-kit/astro</code> when Astro owns the page shell and you want the quickest packaged setup.", "Stay on the Astro package if your palette can be configured with serializable props such as sections, messages, theme, and recent-command settings.", "Move to a custom React, Vue, or Preact island only when you need advanced render callbacks, app-local hooks, or framework-specific composition.", "Use <code>@cmd-kit/core</code> if you want to build the entire UI layer yourself."] }] },
      { id: "install", label: "Install", blocks: [{ type: "install-selector", adapter: "astro", showAdapter: false, showLink: false }] },
      { id: "basic-usage", label: "Basic usage", blocks: [{ type: "code", lang: "astro", label: "astro", code: `---
import CommandPalette from "@cmd-kit/astro/component";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" }
    ]
  }
];
---

<CommandPalette sections={sections} title="Project commands" />` }] },
      { id: "astro-react-integration", label: "Enable the React integration in Astro", blocks: [{ type: "code", lang: "bash", label: "bash", code: `npx astro add react` }, { type: "paragraph", html: "The Astro package uses Astro islands plus React under the hood, so your project needs the React integration enabled." }] },
      { id: "customization", label: "Customization", blocks: [{ type: "paragraph", html: "The customization surface is the same one you already use in the other adapters: <code>sections</code>, <code>messages</code>, <code>theme</code>, and recent-command settings. If you need custom item layouts with your own icon components, build a small island component in your project and pass the render logic there." }, { type: "code", lang: "astro", label: "astro", code: `---
import CommandPalette from "@cmd-kit/astro/component";

const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "search-docs", title: "Search docs", href: "/docs" }
    ]
  }
];
---

<CommandPalette
  sections={sections}
  messages={{
    searchPlaceholder: "Search docs, pages, or actions",
    noResults: "No command matches this query."
  }}
  theme={{
    accentColor: "#12b5e5",
    backgroundColor: "#0f1720",
    textColor: "#f5fbff"
  }}
  title="Project commands"
/>` }] },
      { id: "advanced-island", label: "Advanced island pattern", blocks: [{ type: "paragraph", html: "When you need callbacks, framework hooks, or fully custom row rendering, create a framework island in your app and use the relevant adapter inside it. Astro stays as the shell; the island owns the advanced behavior." }, { type: "code", lang: "astro", label: "astro", code: `---
import ProjectPaletteIsland from "../components/ProjectPaletteIsland.tsx";
---

<ProjectPaletteIsland client:load />` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Do I install <code>@cmd-kit/astro</code>?</strong> Yes. That is the package intended for Astro projects.", "<strong>Why does Astro still need the React integration?</strong> Because the packaged palette runs as an interactive island.", "<strong>When should I move to a custom island?</strong> Move to a custom island when you need render callbacks, local hooks, or UI composition that goes beyond serializable Astro props."] }] }
    ]
  },
  core: {
    slug: "core", navLabel: "Core", eyebrow: "Core", heading: "Headless Core", title: "Cmd+kit | Core",
    description: "Use the framework-agnostic core when you want to own the UI layer and build the command experience around your own rendering system.",
    intro: ["<code>@cmd-kit/core</code> is the engine layer. It exports the command types, message and theme helpers, filtering utilities, snapshot creation, source loading, recent-command helpers, and execution primitives."],
    sections: [
      { id: "install", label: "Install", blocks: [{ type: "install-selector", adapter: "core", showAdapter: false, showLink: false }] },
      { id: "what-core-is-for", label: "What Core is for", blocks: [{ type: "list", items: ["build your own dialog, input, and item list UI", "keep the command model framework-agnostic", "integrate the engine into a custom framework adapter", "reuse theme and message helpers even when you do not use the packaged UI"] }] },
      { id: "build-a-resolved-config", label: "Build a resolved config", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import { createResolvedConfig } from "@cmd-kit/core";

const config = createResolvedConfig({
  sections: [
    {
      id: "navigation",
      title: "Navigation",
      items: [
        { id: "dashboard", title: "Dashboard", href: "/dashboard" }
      ]
    }
  ],
  messages: {
    searchPlaceholder: "Search commands"
  }
});` }] },
      { id: "create-a-search-snapshot", label: "Create a search snapshot", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import { createCommandSnapshot } from "@cmd-kit/core";

const snapshot = createCommandSnapshot(config, "dash");

console.log(snapshot.groups);
console.log(snapshot.items);` }] },
      { id: "execute-results", label: "Execute results", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import {
  dispatchCommandExecution,
  executeCommand
} from "@cmd-kit/core";

const result = executeCommand(snapshot.items[0]);

await dispatchCommandExecution({
  item: snapshot.items[0],
  port: {
    openHref: ({ href }) => window.location.assign(href),
    navigate: ({ title, sections }) => {
      console.log("navigate", title, sections);
    },
    runCallback: async ({ callback }) => callback()
  }
});` }] },
      { id: "theme-and-message-helpers", label: "Theme and message helpers", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import {
  createThemeCssText,
  defaultMessages,
  resolveMessages,
  resolveTheme
} from "@cmd-kit/core";

const theme = resolveTheme({
  accentColor: "#12b5e5"
});

const messages = resolveMessages({
  searchPlaceholder: "Search commands"
});

const cssText = createThemeCssText(theme);` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Should I start with Core?</strong> Only if you know you need a fully custom UI.", "<strong>Does Core render anything?</strong> No. Core is the engine and utility layer.", "<strong>Can I still use the same command model as React, Vue, and Preact?</strong> Yes. That shared model is exactly the point of Core."] }] }
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
      { id: "icons", label: "Icons", blocks: [{ type: "paragraph", html: "Icons are usually customized in the render layer. In React and Preact use <code>renderItem</code> or <code>renderers.item</code>. In Vue use the <code>item</code> slot." }, { type: "code", lang: "tsx", label: "tsx", code: `renderItem={(item, active) => (
  <div className={active ? "palette-row is-active" : "palette-row"}>
    <MyIcon name={item.id} />
    <span>{item.title}</span>
  </div>
)}` }, { type: "code", lang: "vue", label: "vue", code: `<template #item="{ item, active }">
  <div :class="['palette-row', { 'is-active': active }]">
    <MyIcon :name="item.id" />
    <span>{{ item.title }}</span>
  </div>
</template>` }] },
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
}\`;` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Should I customize icons in the data model?</strong> Usually no. Keep the data model clean and map icons in the renderer layer.", "<strong>Do I style only with CSS classes?</strong> No. Use <code>theme</code> for built-in tokens and <code>classNames</code> for slot hooks.", "<strong>Can I mix nested navigation and async sources?</strong> Yes, as long as your source returns the same command structure."] }] }
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
      { id: "common-mistakes", label: "Common mistakes", blocks: [{ type: "list", items: ["trying to model every command in detail before validating the top-level structure", "treating generated code as untouchable instead of adapting it to your project", "using the playground as package API documentation instead of pairing it with the adapter docs"] }] },
      { id: "best-practice", label: "Best practice", blocks: [{ type: "paragraph", html: "Use the playground to converge on structure and configuration quickly, then move to the package documentation pages for production API details. The playground accelerates onboarding; the docs remain the source of truth." }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Should I copy the export and ship it as-is?</strong> Usually no. Refine naming, styles, and app-specific behavior inside your real codebase.", "<strong>Is the playground the source of truth for the API?</strong> No. The adapter docs and core docs are the source of truth for package APIs.", "<strong>Can I use the playground even if I plan to build on Core?</strong> Yes. It is still useful for shaping the command model."] }] }
    ]
  }
};

