import type { DocPageData } from "@/i18n/docs/shared";

export const gettingStartedENDoc: DocPageData = {
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
      { id: "recent-commands", label: "Recent commands", blocks: [{ type: "paragraph", html: "<code>recents</code> is disabled by default. Enable it with <code>recents={true}</code> or configure it with <code>recents={{ limit, sectionTitle }}</code>. Disable it explicitly with <code>recents={false}</code>." }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Which package should I install if my app mixes multiple frameworks?</strong> Install the adapter used by the UI tree that will render the palette. Use <code>@cmd-kit/core</code> only if you are building your own UI layer.", "<strong>Do I need to install peer dependencies manually?</strong> Yes. Install the adapter package together with the runtime your project already uses (React, Vue, Preact, or Astro).", "<strong>Can I start with static sections and move to async data later?</strong> Yes. You can begin with <code>sections</code> or <code>items</code> and later migrate to <code>source</code> without changing the command model.", "<strong>Can I disable recent commands completely?</strong> Yes. Do not pass <code>recents</code> (default is off) or pass <code>recents={false}</code> explicitly.", "<strong>Is Cmd+kit suitable for production apps?</strong> Yes, as long as you validate your command structure, keyboard flow, and app-specific behavior in your own environment before shipping.", "<strong>When should I move from an adapter to Core?</strong> Move to Core when you need complete control over rendering and interaction details that exceed the packaged component surface."] }] }
    ]
  };


