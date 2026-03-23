import type { DocPageData } from "@/i18n/docs/shared";

export const coreENDoc: DocPageData = {
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
      { id: "add-a-new-command", label: "Add a new command", blocks: [{ type: "paragraph", html: "To add a new option, append a new item in your section config. <code>shortcut</code> is optional at data level and only affects UI layers that render it." }, { type: "code", lang: "ts", label: "ts", code: `const config = createResolvedConfig({
  sections: [
    {
      id: "navigation",
      title: "Navigation",
      items: [
        { id: "dashboard", title: "Dashboard", href: "/dashboard" },
        { id: "billing", title: "Billing", href: "/billing", shortcut: "mod+b" },
        { id: "support", title: "Support", href: "/support" }
      ]
    }
  ]
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
      { id: "recent-commands", label: "Recent commands in Core", blocks: [{ type: "paragraph", html: "Core does not expose a <code>recents</code> prop because it is headless. Use <code>recordRecentCommand</code> and <code>resolveRecentCommands</code> to implement recents in your own state layer, or skip them entirely if you do not need that section." }, { type: "code", lang: "ts", label: "ts", code: `import {
  recordRecentCommand,
  resolveRecentCommands
} from "@cmd-kit/core";

let recentRecords: Array<{ itemId: string; timestamp: number }> = [];

recentRecords = recordRecentCommand({
  current: recentRecords,
  itemId: "dashboard",
  limit: 6
});

const recentItems = resolveRecentCommands(config.items, recentRecords);` }] },
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
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Does Core include any UI components?</strong> No. Core is headless and provides command modeling, filtering, snapshots, execution, messages, and theme helpers.", "<strong>When is Core the right starting point?</strong> Start with Core when you already know you need a custom UI layer or a custom framework adapter.", "<strong>Can Core load commands asynchronously?</strong> Yes. Use <code>source</code> and <code>loadCommandSource</code> with the same payload shape used by adapter packages.", "<strong>How do I execute links, callbacks, and nested navigation?</strong> Use <code>dispatchCommandExecution</code> with a <code>port</code> implementation for <code>openHref</code>, <code>runCallback</code>, and <code>navigate</code>.", "<strong>Can I share data between Core and adapter integrations?</strong> Yes. The command model is shared, so you can move between Core and adapters without redesigning item/section structures."] }] }
    ]
  };


