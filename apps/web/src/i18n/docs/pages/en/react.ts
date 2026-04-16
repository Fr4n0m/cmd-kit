import type { DocPageData } from "@/i18n/docs/shared";

export const reactENDoc: DocPageData = {
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
      { id: "core-props", label: "Core props", blocks: [{ type: "list", items: ["<code>sections</code> or <code>items</code>: static data", "<code>source</code>: computed or async commands", "<code>messages</code>: placeholder, empty state, close label", "<code>theme</code>: single mode or dual mode (<code>{ light, dark }</code>) tokens", "<code>classNames</code> and <code>renderers</code>: visual and structural overrides", "<code>recents</code>: recent commands section (off by default)", "<code>reducedMotion</code>: disable hover and motion animations", "<code>open</code>, <code>defaultOpen</code>, <code>onOpenChange</code>: controlled state"] }] },
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
    light: {
      accentColor: "#0fa6d8",
      backgroundColor: "#ffffff",
      textColor: "#0e1720"
    },
    dark: {
      accentColor: "#12b5e5",
      backgroundColor: "#0f1720",
      textColor: "#f5fbff"
    }
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
      { id: "add-a-new-command", label: "Add a new command", blocks: [{ type: "paragraph", html: "Add a new option by pushing a new item into your section. <code>shortcut</code> is optional: use it when needed or omit it for click/Enter only." }, { type: "code", lang: "tsx", label: "tsx", code: `const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" },
      { id: "billing", title: "Billing", href: "/billing", shortcut: "mod+b" },
      { id: "support", title: "Support", href: "/support" }
    ]
  }
];` }] },
      { id: "recent-commands", label: "Recent commands", blocks: [{ type: "paragraph", html: "<code>recents</code> is optional and disabled by default. Enable it with <code>recents={true}</code> or configure it with <code>recents={{ limit: 6, sectionTitle: 'Recent' }}</code>. Disable it with <code>recents={false}</code>." }, { type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  recents={false}
  title="Workspace commands"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Should I use <code>CommandPalette</code> or <code>useCommandPalette</code>?</strong> Start with <code>CommandPalette</code>. Use <code>useCommandPalette</code> when you need to orchestrate state and rendering yourself.", "<strong>How do I avoid shortcut conflicts with my app?</strong> Override <code>shortcut</code> and pick a combination that does not collide with existing editor, search, or browser shortcuts.", "<strong>Can I control open state from React state?</strong> Yes. Use <code>open</code> and <code>onOpenChange</code> for controlled mode, or <code>defaultOpen</code> for uncontrolled mode.", "<strong>How do I disable recent commands in React?</strong> Keep <code>recents</code> undefined (default off) or pass <code>recents={false}</code>.", "<strong>How should I load commands from an API?</strong> Use <code>source</code> and return the same command shape (<code>items</code> and/or <code>sections</code>) that static configuration uses.", "<strong>What is the best way to customize row UI?</strong> Use <code>renderItem</code> for full row control, or <code>renderers</code> for targeted overrides like title, section title, and empty state."] }] }
    ]
  };


