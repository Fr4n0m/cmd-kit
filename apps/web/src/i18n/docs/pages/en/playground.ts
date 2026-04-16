import type { DocPageData } from "@/i18n/docs/shared";

export const playgroundENDoc: DocPageData = {
  slug: "playground",
  navLabel: "Playground",
  eyebrow: "Playground",
  heading: "Playground Guide",
  title: "Cmd+kit | Playground Docs",
  description:
    "Use the Cmd+kit playground to configure command UX, validate behavior in real time, and export adapter-ready code.",
  intro: [
    "The playground is a production-oriented workspace for shaping command UX before wiring everything in your app.",
    "Use it to define command architecture, test keyboard/navigation behavior live, and export starter code for <code>React</code>, <code>Vue</code>, <code>Preact</code>, <code>Astro</code>, and <code>Core (Vanilla)</code>."
  ],
  sections: [
    {
      id: "what-you-can-do",
      label: "What you can do in the playground",
      blocks: [
        {
          type: "list",
          items: [
            "model command structure before writing integration code",
            "preview nested navigation and active-item flow in real time",
            "configure light/dark tokens and check visual parity quickly",
            "validate copy, search placeholder, empty state, and close label",
            "export framework-specific starter snippets from one source of truth"
          ]
        }
      ]
    },
    {
      id: "workspace-map",
      label: "Workspace map",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Live preview</strong>: embedded palette that updates from configurator state",
            "<strong>Configurator</strong>: accordion-based control surface with progressive disclosure",
            "<strong>Code panel</strong>: adapter tabs with syntax-highlighted export and copy action",
            "<strong>Open preview action</strong>: keeps modal palette flow available for real interaction checks"
          ]
        }
      ]
    },
    {
      id: "controls-map-basics",
      label: "Controls map: Basics",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Language</strong>: switches configurator labels and default generated copy",
            "<strong>Palette title</strong>: top heading in the command dialog",
            "<strong>Search placeholder</strong>: input placeholder text",
            "<strong>Shortcut</strong>: keyboard trigger string used in generated config",
            "<strong>Recent items</strong>: toggle + title + limit for recents section",
            "<strong>Data mode</strong>: static sections or async source scaffold",
            "<strong>Open on load</strong>: exported default-open state"
          ]
        }
      ]
    },
    {
      id: "controls-map-appearance",
      label: "Controls map: Appearance",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Theme target (Light / Dark)</strong>: choose which mode to edit",
            "<strong>Accent / Surface / Text</strong>: main semantic tokens",
            "<strong>Title / Description / Muted</strong>: typography hierarchy tokens",
            "<strong>Section title / Item title / Item subtitle / Shortcut</strong>: list-level token granularity",
            "<strong>Border / Overlay</strong>: container + backdrop behavior",
            "<strong>Radius</strong>: rounded corners with live visual preview",
            "<strong>Shadow presets</strong>: quick depth presets plus optional advanced shadow value"
          ]
        },
        {
          type: "paragraph",
          html: "The generated code now includes both modes under one <code>theme</code> object (<code>theme.light</code> + <code>theme.dark</code>) so exports remain complete and consistent."
        }
      ]
    },
    {
      id: "controls-map-sections",
      label: "Controls map: Sections and commands",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Add / move / remove section</strong>: high-level information architecture",
            "<strong>Section title</strong>: visible command group label",
            "<strong>Add / move / remove item</strong>: command-level ordering and maintenance",
            "<strong>Item fields</strong>: title, icon, subtitle, shortcut, href, keywords, disabled",
            "<strong>Nested commands</strong>: drill-down groups under an item for multi-step flows",
            "<strong>Nested section controls</strong>: add/move/remove nested sections and nested items"
          ]
        }
      ]
    },
    {
      id: "controls-map-code-panel",
      label: "Controls map: Code and export panel",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Adapter tabs</strong>: React, Vue, Preact, Astro, Core (Vanilla)",
            "<strong>Copy action</strong>: copies current snippet with success/error feedback",
            "<strong>Expand snippet</strong>: partial-collapse editor view with animated expand/collapse",
            "<strong>Live sync</strong>: snippets update automatically from configurator state"
          ]
        }
      ]
    },
    {
      id: "export-examples",
      label: "Export examples",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          label: "React",
          code: `import { CommandPalette } from "@cmd-kit/react";

const sections = [
  {
    id: "commands",
    title: "Commands",
    items: [{ id: "toggle-theme", title: "Toggle theme", shortcut: "mod+t" }]
  }
];

const theme = {
  light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
  dark: { accentColor: "#35d7ff", backgroundColor: "#0b1116" }
};

export function Demo() {
  return (
    <CommandPalette
      sections={sections}
      shortcut="mod+k"
      title="Command menu"
      messages={{
        searchPlaceholder: "Search commands...",
        noResults: "No results found.",
        closeLabel: "Close command palette"
      }}
      recents={false}
      theme={theme}
    />
  );
}`
        },
        {
          type: "code",
          lang: "vue",
          label: "Vue",
          code: `<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";

const sections = [{ id: "commands", title: "Commands", items: [] }];
const theme = {
  light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
  dark: { accentColor: "#35d7ff", backgroundColor: "#0b1116" }
};
</script>

<template>
  <CommandPalette
    :sections="sections"
    :theme="theme"
    shortcut="mod+k"
    title="Command menu"
  />
</template>`
        },
        {
          type: "code",
          lang: "ts",
          label: "Core (Vanilla)",
          code: `import { createCommandPalette } from "@cmd-kit/core";

const palette = createCommandPalette({
  sections: [{ id: "commands", title: "Commands", items: [] }],
  theme: {
    light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
    dark: { accentColor: "#35d7ff", backgroundColor: "#0b1116" }
  },
  shortcut: "mod+k",
  title: "Command menu"
});

window.addEventListener("beforeunload", () => palette.destroy());`
        }
      ]
    },
    {
      id: "guided-flow-quick-start",
      label: "Guided flow #1: Quick start (10 minutes)",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Set language and title in <strong>Basics</strong>.",
            "Create your top-level sections and 3-5 core commands.",
            "Wire item subtitles + shortcuts to improve command scanning.",
            "Tune placeholder/no-results/close copy to match product tone.",
            "Open preview and validate keyboard flow end-to-end.",
            "Export your target adapter and integrate into app code."
          ]
        }
      ]
    },
    {
      id: "guided-flow-theme-system",
      label: "Guided flow #2: Dual-theme setup",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Switch <strong>Theme target</strong> to Light and set all core tokens.",
            "Switch to Dark and mirror the same semantic token intent.",
            "Check preview in both modes from the preview mode switch.",
            "Verify item title/subtitle/shortcut contrast and focus readability.",
            "Export code and confirm both <code>theme.light</code> and <code>theme.dark</code> are present."
          ]
        }
      ]
    },
    {
      id: "guided-flow-information-architecture",
      label: "Guided flow #3: Information architecture and nested flows",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Define high-level sections by user intent (navigation, actions, settings).",
            "Place frequent commands at the top of each section.",
            "Use nested sections only for true drill-down flows.",
            "Add keywords for commands that users might search with alternative terms.",
            "Use disabled state only for intentional, contextual commands."
          ]
        }
      ]
    },
    {
      id: "guided-flow-async-prep",
      label: "Guided flow #4: Async source preparation",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Switch data mode to <strong>Async source</strong>.",
            "Set realistic delay to simulate your backend latency envelope.",
            "Validate loading transitions and no-results behavior.",
            "Export snippet and replace mock source with real API client.",
            "Keep payload shape aligned with section/item schema."
          ]
        }
      ]
    },
    {
      id: "production-checklist",
      label: "Pre-production checklist",
      blocks: [
        {
          type: "list",
          items: [
            "keyboard open/close and arrow navigation validated",
            "nested back-navigation and breadcrumbs validated",
            "light/dark parity validated across dialog, items, and shortcuts",
            "copy/messages localized by app i18n layer",
            "generated snippet normalized to project lint/style rules",
            "real async/error states validated in app runtime"
          ]
        }
      ]
    },
    {
      id: "faq",
      label: "FAQ",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Should I ship exported code without changes?</strong> Usually no. Treat exports as starter scaffolding and adapt architecture, naming, and styling to your codebase.",
            "<strong>Is playground output API documentation?</strong> No. Use adapter docs as API source of truth and use playground output as integration baseline.",
            "<strong>Can I keep using the modal open action if I already have embedded preview?</strong> Yes. Embedded preview is for fast visual iteration; modal open flow is for realistic interaction validation.",
            "<strong>Why are only adapter tabs shown in export?</strong> The panel is intentionally focused on official adapter exports to keep output practical and less noisy.",
            "<strong>When should I move from playground to implementation?</strong> Once command architecture, preview behavior, and dual-theme tokens are stable."
          ]
        }
      ]
    }
  ]
};
