import type { Locale } from "./site";

export type DocSlug =
  | "getting-started"
  | "react"
  | "vue"
  | "preact"
  | "astro"
  | "core"
  | "customization"
  | "playground";

export interface DocsNavItem {
  href: string;
  label: string;
}

export interface DocsSectionItem {
  id: string;
  label: string;
}

export type DocBlock =
  | { type: "paragraph"; html: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; lang: string; label?: string }
  | {
      type: "install-selector";
      adapter?: "core" | "preact" | "react" | "vue";
      showAdapter?: boolean;
      showLink?: boolean;
    };

export interface DocSection {
  blocks: DocBlock[];
  id: string;
  label: string;
}

export interface DocPageData {
  description: string;
  eyebrow: string;
  heading: string;
  intro: string[];
  navLabel: string;
  sections: DocSection[];
  slug: DocSlug;
  title: string;
}

export interface InstallSelectorCopy {
  codeLabel: string;
  installerLabel: string;
  packageHint: string;
  techLabel: string;
  technologies: Record<"core" | "preact" | "react" | "vue", string>;
}

export const docsSlugs: DocSlug[] = [
  "getting-started",
  "react",
  "vue",
  "preact",
  "astro",
  "core",
  "customization",
  "playground"
];

const docsByLocale = {
  en: {} as Record<DocSlug, DocPageData>,
  es: {} as Record<DocSlug, DocPageData>
} satisfies Record<Locale, Record<DocSlug, DocPageData>>;

docsByLocale.en = {
  "getting-started": {
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
  }
};

Object.assign(docsByLocale.en, {
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
});

Object.assign(docsByLocale.es, {
  "getting-started": {
    slug: "getting-started", navLabel: "Primeros pasos", eyebrow: "Docs", heading: "Primeros pasos", title: "Cmd+kit | Primeros pasos",
    description: "Instala Cmd+kit, elige el adaptador adecuado y configura tu primera palette.",
    intro: ["<code>Cmd+kit</code> es un sistema de command palette distribuido como paquetes npm. Elige el adaptador que encaje con tu stack, instálalo con tu gestor de paquetes y configura la palette mediante secciones tipadas, copy, tokens de tema y fuentes asíncronas si las necesitas."],
    sections: [
      { id: "paquetes", label: "Paquetes", blocks: [{ type: "list", items: ["<code>@cmd-kit/react</code>: componente oficial y hook para React", "<code>@cmd-kit/vue</code>: componente y API composable para Vue", "<code>@cmd-kit/preact</code>: adaptador para Preact alineado con la API de React", "<code>@cmd-kit/core</code>: primitivas headless para UIs propias e integraciones custom"] }] },
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector" }] },
      { id: "modelo-de-comandos", label: "Modelo de comandos", blocks: [{ type: "paragraph", html: "Todos los adaptadores comparten la misma estructura: las secciones contienen items, y los items pueden abrir enlaces, ejecutar callbacks o navegar a secciones anidadas." }, { type: "code", lang: "ts", label: "ts", code: `const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "home", title: "Home", href: "/" },
      { id: "settings", title: "Settings", shortcut: "G S" }
    ]
  }
];` }] },
      { id: "elige-tu-adaptador", label: "Elige tu adaptador", blocks: [{ type: "list", items: ['<a href="/es/docs/react">React</a>: la opción empaquetada más completa', '<a href="/es/docs/vue">Vue</a>: integración propia para Vue', '<a href="/es/docs/preact">Preact</a>: runtime más ligero con una API cercana', '<a href="/es/docs/core">Core</a>: camino headless para una UI custom', '<a href="/es/docs/playground">Playground</a>: guía del configurador y sus exports'] }] },
      { id: "personalizacion", label: "Personalización", blocks: [{ type: "paragraph", html: 'Cuando la integración base funcione, pasa a <a href="/es/docs/customization">Personalización</a> para ajustar estilos, mensajes, renderizado y fuentes asíncronas.' }] }
    ]
  },
  react: {
    slug: "react", navLabel: "React", eyebrow: "React", heading: "Integración con React", title: "Cmd+kit | React",
    description: "Instala el paquete de React y configura secciones, tema, mensajes y overrides de render.",
    intro: ["<code>@cmd-kit/react</code> incluye el componente <code>CommandPalette</code> y el hook <code>useCommandPalette</code> para integraciones más personalizadas."],
    sections: [
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "react", showAdapter: false, showLink: false }] },
      { id: "uso-basico", label: "Uso básico", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `import { CommandPalette } from "@cmd-kit/react";

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
  return <CommandPalette sections={sections} title="Comandos del proyecto" />;
}` }] },
      { id: "props-principales", label: "Props principales", blocks: [{ type: "list", items: ["<code>sections</code> o <code>items</code>: datos estáticos", "<code>source</code>: comandos calculados o asíncronos", "<code>messages</code>: placeholder, estado vacío y cierre", "<code>theme</code>: colores, borde, radio y sombra", "<code>classNames</code> y <code>renderers</code>: overrides visuales y estructurales", "<code>open</code>, <code>defaultOpen</code>, <code>onOpenChange</code>: control de estado"] }] },
      { id: "ejemplo-de-personalizacion", label: "Ejemplo de personalización", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  classNames={{
    dialog: "palette-shell",
    item: "palette-item"
  }}
  messages={{
    searchPlaceholder: "Busca acciones",
    noResults: "No hay comandos para esta búsqueda."
  }}
  theme={{
    accentColor: "#12b5e5",
    backgroundColor: "#0f1720",
    textColor: "#f5fbff"
  }}
  sections={sections}
  title="Comandos del workspace"
/>` }] },
      { id: "fuente-asincrona", label: "Fuente asíncrona", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  source={async () => {
    const response = await fetch("/api/commands");
    return response.json();
  }}
  title="Comandos del workspace"
/>` }] }
    ]
  },
  vue: {
    slug: "vue", navLabel: "Vue", eyebrow: "Vue", heading: "Integración con Vue", title: "Cmd+kit | Vue",
    description: "Instala el paquete de Vue y configura secciones, mensajes, tema y comandos recientes.",
    intro: ["<code>@cmd-kit/vue</code> ofrece un componente <code>CommandPalette</code> y una API composable para los casos donde quieres controlar más directamente el estado de la palette."],
    sections: [
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "vue", showAdapter: false, showLink: false }] },
      { id: "uso-basico", label: "Uso básico", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<script setup lang="ts">
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
  <CommandPalette :sections="sections" title="Comandos del proyecto" />
</template>` }] },
      { id: "que-puedes-configurar", label: "Qué puedes configurar", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code> y <code>source</code>", "<code>messages</code> para copy localizado o del producto", "<code>theme</code> para colores y superficies", "<code>classNames</code> para hooks de estilo", "<code>recents</code> para recientes automáticos"] }] },
      { id: "ejemplo-de-mensajes", label: "Ejemplo de mensajes", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :messages="{
    searchPlaceholder: 'Busca docs, páginas o acciones',
    noResults: 'No se ha encontrado ningún comando.'
  }"
  :sections="sections"
  title="Comandos del proyecto"
/>` }] }
    ]
  },
  preact: {
    slug: "preact", navLabel: "Preact", eyebrow: "Preact", heading: "Integración con Preact", title: "Cmd+kit | Preact",
    description: "Instala el paquete de Preact y configura una command palette con la misma API base.",
    intro: ["<code>@cmd-kit/preact</code> replica la API pública de React sobre Preact."],
    sections: [
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "preact", showAdapter: false, showLink: false }] },
      { id: "uso-basico", label: "Uso básico", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `import { CommandPalette } from "@cmd-kit/preact";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [{ id: "dashboard", title: "Dashboard", href: "/dashboard" }]
  }
];

export function Example() {
  return <CommandPalette sections={sections} title="Comandos del proyecto" />;
}` }] },
      { id: "superficie-de-configuracion", label: "Superficie de configuración", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code> y <code>source</code>", "<code>messages</code> para copy específico del producto", "<code>theme</code> para tokens visuales", "<code>classNames</code> para estilos por slot", "<code>renderers</code> para overrides de renderizado", "<code>recents</code> para comandos recientes"] }] }
    ]
  }
});

Object.assign(docsByLocale.es, {
  astro: {
    slug: "astro", navLabel: "Astro", eyebrow: "Astro", heading: "Integracion con Astro", title: "Cmd+kit | Astro",
    description: "Usa Cmd+kit en Astro combinando un shell estatico con una isla de React, Vue o Preact.",
    intro: ["Astro es el shell recomendado para docs y marketing porque mantiene rapida la parte estatica y solo hidrata <code>Cmd+kit</code> donde la interfaz necesita interactividad real."],
    sections: [
      { id: "enfoque-recomendado", label: "Enfoque recomendado", blocks: [{ type: "list", items: ["renderiza landing y docs como paginas estaticas de Astro", "usa <code>@cmd-kit/react</code>, <code>@cmd-kit/vue</code> o <code>@cmd-kit/preact</code> dentro de una isla de Astro", "hidrata la palette solo en rutas o componentes interactivos"] }] },
      { id: "ejemplo-con-react", label: "Ejemplo con React", blocks: [{ type: "code", lang: "astro", label: "astro", code: `---
import PlaygroundPalette from "../components/PlaygroundPalette.tsx";
---

<PlaygroundPalette client:load />` }] },
      { id: "por-que-encaja-con-el-proyecto", label: "Por que encaja con el proyecto", blocks: [{ type: "paragraph", html: "<code>Cmd+kit</code> separa el core headless de sus adaptadores de UI. Eso hace de Astro un shell de entrega, no un framework que haya que atacar con un motor de render especifico." }] },
      { id: "estado", label: "Estado", blocks: [{ type: "paragraph", html: "La guia de Astro ya esta documentada y esta misma web la usa. Un paquete especifico para Astro no es necesario todavia porque el patrón de islas ya cubre la integración real." }] }
    ]
  },
  core: {
    slug: "core", navLabel: "Core", eyebrow: "Core", heading: "Core headless", title: "Cmd+kit | Core",
    description: "Usa el core headless de Cmd+kit para construir una command palette en vanilla o en tu propio adaptador.",
    intro: ["<code>@cmd-kit/core</code> es el centro agnostico al framework del proyecto. Te da secciones tipadas, fuzzy search, snapshot building, primitivas de ejecucion, seguimiento de recientes y helpers de tema sin imponer ninguna capa de render."],
    sections: [
      { id: "instalacion", label: "Instalacion", blocks: [{ type: "install-selector", adapter: "core", showAdapter: false, showLink: false }] },
      { id: "que-cubre", label: "Que cubre", blocks: [{ type: "list", items: ["items y secciones de comandos", "filtrado fuzzy mediante el pipeline de busqueda compartido", "snapshots agrupados para renderizado", "modelado de navegacion anidada", "despacho de ejecucion para callbacks, links y paginas anidadas", "primitivas de estado para recientes", "resolucion de tema y helpers de CSS variables"] }] },
      { id: "ejemplo-minimo", label: "Ejemplo minimo", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import {
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
      { id: "cuando-usarlo-directamente", label: "Cuando usarlo directamente", blocks: [{ type: "paragraph", html: "Usa el core directamente cuando quieras construir tu propia UI, integrarte en otro framework o mantener la implementación totalmente custom. Si quieres un componente listo para usar, empieza por uno de los adaptadores oficiales." }] }
    ]
  },
  customization: {
    slug: "customization", navLabel: "Personalización", eyebrow: "Personalización", heading: "Personalización", title: "Cmd+kit | Personalización",
    description: "Personaliza estructura de comandos, tokens de tema, copy, renderizado y fuentes asíncronas en Cmd+kit.",
    intro: ["<code>Cmd+kit</code> se configura en código. La superficie principal de personalización es la propia estructura de comandos, seguida de mensajes, tema, renderers y fuentes asíncronas.", 'Si quieres explorar estos ajustes con una interfaz guiada antes de llevarlos a código, consulta la <a href="/es/docs/playground">documentación del playground</a>.'],
    sections: [
      { id: "define-secciones-e-items", label: "Define secciones e items", blocks: [{ type: "code", lang: "ts", label: "ts", code: `const sections = [
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
      { id: "navegacion-anidada", label: "Navegación anidada", blocks: [{ type: "code", lang: "ts", label: "ts", code: `const sections = [
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
      { id: "tokens-de-tema", label: "Tokens de tema", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
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
      { id: "mensajes", label: "Mensajes", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  messages={{
    searchPlaceholder: "Busca comandos",
    noResults: "No hay resultados para esta búsqueda.",
    closeLabel: "Cerrar palette"
  }}
/>` }] },
      { id: "overrides-de-render-y-estilo", label: "Overrides de render y estilo", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  classNames={{
    dialog: "palette-shell",
    item: "palette-item",
    emptyState: "palette-empty"
  }}
  renderers={{
    title: ({ activeTitle, breadcrumbs }) => (
      <span>{breadcrumbs.join(" / ") || activeTitle}</span>
    ),
    emptyState: ({ query }) => <span>Sin resultados para "{query}"</span>
  }}
  sections={sections}
/>` }] },
      { id: "fuente-asincrona", label: "Fuente asíncrona", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  source={async () => {
    const response = await fetch("/api/commands");
    return response.json();
  }}
  title="Comandos del workspace"
/>` }] }
    ]
  },
  playground: {
    slug: "playground", navLabel: "Playground", eyebrow: "Playground", heading: "Guía del playground", title: "Cmd+kit | Documentación del playground",
    description: "Aprende a usar el playground de Cmd+kit para configurar comandos, validar el comportamiento y exportar código base para producción.",
    intro: ["El playground es la forma más rápida de definir una integración con <code>Cmd+kit</code> antes de llevarla a tu código. Te permite configurar la estructura de comandos, validar el flujo en una preview viva y exportar código base para los adaptadores soportados."],
    sections: [
      { id: "para-que-sirve", label: "Para qué sirve", blocks: [{ type: "list", items: ["prototipar la estructura de la command palette sin editar ficheros de código al principio", "probar navegación anidada, búsqueda y agrupación en tiempo real", "ajustar tokens de tema y copy antes de integrar el paquete", "exportar snippets base para React, Vue, Preact, navegador vanilla, CSS, Tailwind y JSON"] }] },
      { id: "areas-principales", label: "Áreas principales", blocks: [{ type: "list", items: ["<strong>Basics</strong>: título, atajo, modo de source y ajustes generales", "<strong>Sections</strong>: creación de grupos de comandos y edición de cada item", "<strong>Nested commands</strong>: secciones hijas para modelar navegación en profundidad", "<strong>Messages</strong>: personalización del placeholder y del estado vacío", "<strong>Theme</strong>: ajuste de colores, borde, texto, radio y sombra", "<strong>Preview</strong>: validación en vivo de interacción y teclado", "<strong>Code</strong>: exportación de la configuración al formato que necesites"] }] },
      { id: "como-trabajar-con-el", label: "Cómo trabajar con él", blocks: [{ type: "list", ordered: true, items: ["Define primero las secciones raíz y los comandos de cada una.", "Añade atajos, enlaces, subtítulos y keywords cuando aporten claridad.", "Crea secciones anidadas para los flujos que necesiten un segundo nivel.", "Ajusta mensajes y tokens de tema hasta que la preview encaje con tu producto.", "Cambia el target de exportación y lleva el código generado a tu aplicación."] }] },
      { id: "modos-de-source", label: "Modos de source", blocks: [{ type: "paragraph", html: "El playground soporta configuración estática y configuración orientada a carga asíncrona. Usa el modo estático para modelar secciones inline. Usa el modo async cuando tu integración final vaya a cargar comandos desde una API o desde otra fuente dinámica." }] },
      { id: "exports", label: "Exports", blocks: [{ type: "paragraph", html: "El código generado está pensado como punto de partida práctico, no como plantilla cerrada. Lo normal es exportarlo, integrarlo en tu proyecto y seguir refinándolo según tu naming, estilos y comportamiento real." }] },
      { id: "buena-practica", label: "Buena práctica", blocks: [{ type: "paragraph", html: "Usa el playground para cerrar estructura y configuración rápidamente, y después apóyate en la documentación de los paquetes para la integración final. El playground acelera diseño y onboarding; la documentación sigue siendo la fuente de verdad para la API." }] }
    ]
  }
});

export function getDocPage(locale: Locale, slug: DocSlug) {
  return docsByLocale[locale][slug];
}

export function getDocSlugs() {
  return docsSlugs;
}

export function getDocHeadings(locale: Locale, slug: DocSlug): DocsSectionItem[] {
  return docsByLocale[locale][slug].sections.map((section) => ({
    id: section.id,
    label: section.label
  }));
}

export function getDocsNavigation(locale: Locale): DocsNavItem[] {
  return docsSlugs.map((slug) => ({
    href: `/docs/${slug}`,
    label: docsByLocale[locale][slug].navLabel
  }));
}

export function getInstallSelectorCopy(locale: Locale): InstallSelectorCopy {
  if (locale === "es") {
    return {
      codeLabel: "bash",
      installerLabel: "Gestor de paquetes",
      packageHint: "Ver documentación del adaptador",
      techLabel: "Tecnología",
      technologies: { core: "Core", preact: "Preact", react: "React", vue: "Vue" }
    };
  }

  return {
    codeLabel: "bash",
    installerLabel: "Package manager",
    packageHint: "Open adapter documentation",
    techLabel: "Technology",
    technologies: { core: "Core", preact: "Preact", react: "React", vue: "Vue" }
  };
}
