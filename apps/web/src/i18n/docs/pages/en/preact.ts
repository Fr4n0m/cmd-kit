import type { DocPageData } from "@/i18n/docs/shared";

export const preactENDoc: DocPageData = {
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
      { id: "configuration-surface", label: "Configuration surface", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code>, and <code>source</code> for static or async data", "<code>messages</code> for copy overrides", "<code>theme</code> as single mode or dual mode (<code>{ light, dark }</code>)", "<code>classNames</code> for slot-level styling", "<code>renderers</code> for rendering overrides", "<code>recents</code> for automatic recent commands", "<code>reducedMotion</code> to disable hover/motion animations"] }] },
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
    light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
    dark: { accentColor: "#12b5e5", backgroundColor: "#0f1720" }
  }}
  title="Project commands"
/>` }] },
      { id: "add-a-new-command", label: "Add a new command", blocks: [{ type: "paragraph", html: "Add a new option by appending a new item in your section. <code>shortcut</code> is optional." }, { type: "code", lang: "tsx", label: "tsx", code: `const sections = [
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
      { id: "recent-commands", label: "Recent commands", blocks: [{ type: "paragraph", html: "<code>recents</code> is optional and disabled by default. Enable with <code>recents={true}</code> or configure <code>recents={{ limit, sectionTitle }}</code>. Disable with <code>recents={false}</code>." }, { type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  recents={false}
  title="Project commands"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Is the Preact API intentionally close to React?</strong> Yes. The adapter mirrors the React-facing API so teams can share patterns and configuration.", "<strong>Do I need React compatibility aliases to use it?</strong> No. Use <code>@cmd-kit/preact</code> directly with Preact in your project.", "<strong>Can I still use async loading and recents?</strong> Yes. <code>source</code> and <code>recents</code> are available in the Preact adapter.", "<strong>How do I disable recent commands in Preact?</strong> Keep <code>recents</code> undefined (default off) or pass <code>recents={false}</code>.", "<strong>How do I replace the default item UI?</strong> Use <code>renderItem</code> for full row ownership or <code>renderers</code> for targeted render overrides.", "<strong>When is Core a better fit than the Preact adapter?</strong> When your product requires UI behavior that goes beyond the packaged component boundaries."] }] }
    ]
  };


