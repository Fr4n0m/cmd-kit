import type { DocPageData } from "@/i18n/docs/shared";

export const astroENDoc: DocPageData = {
    slug: "astro", navLabel: "Astro", eyebrow: "Astro", heading: "Astro Integration", title: "Cmd+kit | Astro",
    description: "Install the Astro package and mount your first palette in Astro without React dependencies.",
    intro: ["<code>@cmd-kit/astro</code> is the Astro package for Cmd+kit. It renders the default command palette directly in Astro while keeping the same command model and customization surface used across adapters."],
    sections: [
      { id: "when-to-use-the-astro-package", label: "When to use the Astro package", blocks: [{ type: "list", items: ["Use <code>@cmd-kit/astro</code> when Astro owns the page shell and you want the quickest packaged setup without React dependencies.", "Stay on the Astro package if your palette can be configured with serializable props such as sections, messages, theme, and recent-command settings.", "Move to <code>@cmd-kit/core</code> only when you need full custom rendering beyond the packaged Astro component.", "Use another framework adapter only if your product already uses that framework for interactive UI."] }] },
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
      { id: "astro-runtime", label: "Runtime requirements", blocks: [{ type: "paragraph", html: "No React integration is required. Install <code>@cmd-kit/astro</code> in your Astro project and use the component directly." }] },
      { id: "customization", label: "Customization", blocks: [{ type: "paragraph", html: "The customization surface is the same one you already use in other adapters: <code>sections</code>, <code>messages</code>, <code>theme</code>, and recent-command settings." }, { type: "code", lang: "astro", label: "astro", code: `---
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
      { id: "recent-commands", label: "Recent commands", blocks: [{ type: "paragraph", html: "<code>recents</code> is optional and disabled by default. Enable with <code>recents={true}</code> or configure <code>recents={{ limit, sectionTitle }}</code>. Disable with <code>recents={false}</code>." }, { type: "code", lang: "astro", label: "astro", code: `<CommandPalette
  sections={sections}
  recents={false}
  title="Project commands"
/>` }] },
      { id: "advanced-custom-ui", label: "When to move to Core", blocks: [{ type: "paragraph", html: "When you need callback-driven commands or a fully custom item renderer, move to <code>@cmd-kit/core</code> and implement your own UI layer. Keep <code>@cmd-kit/astro</code> for the packaged default experience." }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Do I need React to use <code>@cmd-kit/astro</code>?</strong> No. The Astro package no longer depends on React.", "<strong>Why does the package export <code>/component</code>?</strong> Astro consumes the packaged component through <code>@cmd-kit/astro/component</code>.", "<strong>Can I pass callbacks from <code>.astro</code> files?</strong> Keep props serializable in Astro. For callback-driven behavior, use <code>@cmd-kit/core</code> with a custom UI.", "<strong>How do I disable recent commands in Astro?</strong> Do not pass <code>recents</code> (default off) or set <code>recents={false}</code>.", "<strong>When should I move to Core?</strong> Move when you need behavior or rendering beyond the packaged Astro component surface.", "<strong>Does Astro limit theme or messages customization?</strong> No. You can still configure <code>theme</code>, <code>messages</code>, sections, and recents from Astro props."] }] }
    ]
  };


