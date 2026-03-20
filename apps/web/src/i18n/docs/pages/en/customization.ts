import type { DocPageData } from "../../shared";

export const customizationENDoc: DocPageData = {
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
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Should icon components live in the command data model?</strong> Usually no. Keep data framework-agnostic and map icons in renderers/slots.", "<strong>What is the cleanest styling strategy?</strong> Use <code>theme</code> for shared design tokens and <code>classNames</code> for slot-level CSS control.", "<strong>Can I use both nested navigation and async source data?</strong> Yes, as long as async payloads keep the same section/item shape including nested <code>children</code>.", "<strong>How should I localize placeholder and empty-state text?</strong> Override <code>messages</code> from your app-level i18n layer instead of hard-coding strings in command data.", "<strong>How do I keep custom renderers maintainable?</strong> Keep renderer functions focused on presentation and avoid embedding business logic that belongs in command generation."] }] }
    ]
  };
