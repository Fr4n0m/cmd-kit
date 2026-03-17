import type { DocPageData, DocSlug } from "./shared";
export const docsEs: Record<DocSlug, DocPageData> = {"getting-started": {
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
  },
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
};

