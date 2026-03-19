import type { DocPageData, DocSlug } from "./shared";
export const docsEs: Record<DocSlug, DocPageData> = {"getting-started": {
    slug: "getting-started", navLabel: "Primeros pasos", eyebrow: "Docs", heading: "Primeros pasos", title: "Cmd+kit | Primeros pasos",
    description: "Instala Cmd+kit desde npm, elige el paquete correcto y entiende el modelo de comandos antes de integrarlo en tu aplicación.",
    intro: ["<code>Cmd+kit</code> se instala desde npm. Elige el paquete que encaja con tu runtime, define tus comandos en código y después personaliza la palette con mensajes, tokens de tema y overrides de render."],
    sections: [
      { id: "que-se-instala", label: "Qué se instala", blocks: [{ type: "list", items: ["<code>@cmd-kit/react</code>: componente listo para usar y hook para React", "<code>@cmd-kit/vue</code>: componente y API composable para Vue", "<code>@cmd-kit/preact</code>: adaptador para Preact con una API muy cercana a React", "<code>@cmd-kit/astro</code>: punto de entrada para Astro con integración basada en islas", "<code>@cmd-kit/core</code>: primitivas headless para UIs propias o integraciones avanzadas"] }] },
      { id: "elige-el-paquete-correcto", label: "Elige el paquete correcto", blocks: [{ type: "list", items: ['<a href="/es/docs/react">React</a>: úsalo si tu UI ya es React y quieres la surface empaquetada más completa', '<a href="/es/docs/vue">Vue</a>: úsalo si tu aplicación es Vue y quieres slots y una integración propia de Vue', '<a href="/es/docs/preact">Preact</a>: úsalo si buscas una API estilo React sobre un runtime más ligero', '<a href="/es/docs/astro">Astro</a>: úsalo si tu shell es Astro y quieres un paquete pensado para islas de Astro', '<a href="/es/docs/core">Core</a>: úsalo si necesitas controlar toda la UI o crear tu propio adaptador'] }] },
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector" }] },
      { id: "modelo-de-comandos", label: "Modelo de comandos", blocks: [{ type: "paragraph", html: "La palette se construye con <strong>secciones</strong>. Cada sección contiene <strong>ítems</strong>. Un ítem puede abrir un enlace, ejecutar un callback o navegar a secciones hijas." }, { type: "code", lang: "ts", label: "ts", code: `const sections = [
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
      { id: "checklist-de-la-primera-integracion", label: "Checklist de la primera integración", blocks: [{ type: "list", ordered: true, items: ["Elige el paquete que coincide con el runtime de tu UI.", "Instálalo con tu gestor de paquetes junto con las peer dependencies que necesite.", "Empieza con una o dos secciones raíz y unos pocos ítems.", "Confirma que enlaces, callbacks y navegación anidada funcionan antes de estilizar mucho.", 'Después pasa a <a href="/es/docs/customization">Personalización</a> para iconos, estilos, mensajes y datos asíncronos.'] }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Qué paquete instalo si mi app mezcla varias tecnologías?</strong> Instala el adaptador del árbol de UI que va a renderizar la palette. Usa <code>@cmd-kit/core</code> solo si vas a construir tu propia capa de UI.", "<strong>¿Tengo que instalar las peer dependencies manualmente?</strong> Sí. Instala el adaptador junto a sus peers necesarios (por ejemplo React + React DOM, Vue, Preact o Astro + integración de React).", "<strong>¿Puedo empezar con secciones estáticas y luego pasar a datos asíncronos?</strong> Sí. Puedes arrancar con <code>sections</code> o <code>items</code> y migrar después a <code>source</code> sin cambiar el modelo de comandos.", "<strong>¿Cmd+kit está listo para producción?</strong> Sí, siempre que valides en tu app real la estructura de comandos, el flujo de teclado y el comportamiento específico del producto.", "<strong>¿Cuándo tiene sentido pasar de un adaptador a Core?</strong> Cuando necesitas control total del renderizado y de la interacción más allá de lo que ofrece el componente empaquetado."] }] }
    ]
  },
  react: {
    slug: "react", navLabel: "React", eyebrow: "React", heading: "Integración con React", title: "Cmd+kit | React",
    description: "Instala el paquete de React y personaliza iconos, estilos, datos asíncronos y comportamiento con la API pública del paquete.",
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
      { id: "iconos-y-layout-de-item", label: "Iconos y layout de ítem", blocks: [{ type: "paragraph", html: "Usa <code>renderItem</code> cuando quieras controlar completamente la fila del ítem, incluyendo iconos, espaciado y metadatos." }, { type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
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
  title="Comandos del proyecto"
/>` }] },
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
  recents={{ limit: 6, sectionTitle: "Recientes" }}
  title="Comandos del workspace"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Cuándo uso <code>CommandPalette</code> y cuándo <code>useCommandPalette</code>?</strong> Empieza por <code>CommandPalette</code>. Usa <code>useCommandPalette</code> cuando quieras orquestar estado y render por tu cuenta.", "<strong>¿Cómo evito conflictos de atajos con mi aplicación?</strong> Sobrescribe <code>shortcut</code> y usa una combinación que no choque con atajos globales del producto o del navegador.", "<strong>¿Puedo controlar la apertura desde estado de React?</strong> Sí. Usa <code>open</code> y <code>onOpenChange</code> en modo controlado, o <code>defaultOpen</code> en modo no controlado.", "<strong>¿Cuál es la forma recomendada de cargar comandos desde API?</strong> Usa <code>source</code> y devuelve la misma estructura (<code>items</code> y/o <code>sections</code>) que usarías en configuración estática.", "<strong>¿Cómo personalizo bien la fila del ítem?</strong> Usa <code>renderItem</code> si quieres control total de la fila o <code>renderers</code> para overrides puntuales (título, sección, estado vacío)."] }] }
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
      { id: "slots-e-iconos", label: "Slots e iconos", blocks: [{ type: "paragraph", html: "La personalización en Vue se hace con slots. Usa el slot <code>item</code> cuando quieras cambiar iconos o la estructura de la fila." }, { type: "code", lang: "vue", label: "vue", code: `<CommandPalette :sections="sections" title="Comandos del proyecto">
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
      { id: "ejemplo-de-mensajes", label: "Ejemplo de mensajes", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :messages="{
    searchPlaceholder: 'Busca docs, páginas o acciones',
    noResults: 'No se ha encontrado ningún comando.'
  }"
  :sections="sections"
  title="Comandos del proyecto"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Necesito <code>&lt;script setup&gt;</code> para usar el adaptador de Vue?</strong> No. También funciona con componentes Vue tradicionales; <code>&lt;script setup&gt;</code> es solo una comodidad.", "<strong>¿Cómo personalizo la fila de resultados en Vue?</strong> Usa el slot <code>item</code> para renderizar tus iconos, layout y metadatos según cada comando.", "<strong>¿Puedo sincronizar el estado abierto/cerrado con un estado padre?</strong> Sí. Vincula <code>v-model:open</code> (o escucha <code>open-change</code>) para integrarlo con tu estado global.", "<strong>¿Cómo lo estilizo sin rehacer todo el componente?</strong> Usa <code>theme</code> para tokens base y <code>classNames</code> para hooks CSS por slot.", "<strong>¿Cuándo conviene ir de Vue a Core?</strong> Cuando la personalización por slots ya no sea suficiente y necesites un pipeline de render completamente propio."] }] }
    ]
  },
  preact: {
    slug: "preact", navLabel: "Preact", eyebrow: "Preact", heading: "Integración con Preact", title: "Cmd+kit | Preact",
    description: "Instala el paquete de Preact y personaliza una command palette con el mismo modelo de comandos que usa el adaptador de React.",
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
      { id: "superficie-de-configuracion", label: "Superficie de configuración", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code> y <code>source</code>", "<code>messages</code> para copy específico del producto", "<code>theme</code> para tokens visuales", "<code>classNames</code> para estilos por slot", "<code>renderers</code> para overrides de renderizado", "<code>recents</code> para comandos recientes"] }] },
      { id: "iconos-y-layout", label: "Iconos y layout", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  renderItem={(item, active) => (
    <div className={active ? "palette-row is-active" : "palette-row"}>
      <MyIcon name={item.id} />
      <span>{item.title}</span>
    </div>
  )}
  title="Comandos del proyecto"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿La API de Preact es intencionalmente parecida a React?</strong> Sí. El adaptador replica la API de React para compartir patrones y configuración.", "<strong>¿Necesito alias de compatibilidad de React para usarlo?</strong> No. Con <code>@cmd-kit/preact</code> trabajas directamente sobre Preact.", "<strong>¿También tengo <code>source</code> asíncrono y recientes en Preact?</strong> Sí. <code>source</code> y <code>recents</code> están soportados en el adaptador de Preact.", "<strong>¿Cómo reemplazo la UI por defecto de cada fila?</strong> Usa <code>renderItem</code> para controlar toda la fila o <code>renderers</code> para overrides puntuales.", "<strong>¿Cuándo es mejor usar Core en vez del adaptador de Preact?</strong> Cuando tu producto requiere una interacción o un render que sobrepasa los límites del componente empaquetado."] }] }
    ]
  },
  astro: {
    slug: "astro", navLabel: "Astro", eyebrow: "Astro", heading: "Integración con Astro", title: "Cmd+kit | Astro",
    description: "Instala el paquete de Astro, monta tu primera palette en una isla y entiende cuándo te conviene quedarte en el paquete de Astro o pasar a una isla propia.",
    intro: ["<code>@cmd-kit/astro</code> es el paquete de Astro para Cmd+kit. Te da un punto de entrada pensado para Astro, manteniendo el mismo modelo de comandos y la misma superficie de personalización que el resto de adaptadores."],
    sections: [
      { id: "cuando-usar-el-paquete-de-astro", label: "Cuándo usar el paquete de Astro", blocks: [{ type: "list", items: ["Usa <code>@cmd-kit/astro</code> cuando Astro sea el shell de la página y quieras la integración empaquetada más rápida.", "Quédate en el paquete de Astro si tu palette puede configurarse con props serializables como secciones, mensajes, tema y recientes.", "Pasa a una isla propia de React, Vue o Preact cuando necesites callbacks avanzados, hooks locales o renderizado totalmente custom.", "Usa <code>@cmd-kit/core</code> si quieres construir toda la capa de UI tú mismo."] }] },
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "astro", showAdapter: false, showLink: false }] },
      { id: "uso-basico", label: "Uso básico", blocks: [{ type: "code", lang: "astro", label: "astro", code: `---
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

<CommandPalette sections={sections} title="Comandos del proyecto" />` }] },
      { id: "activar-react-en-astro", label: "Activar React en Astro", blocks: [{ type: "code", lang: "bash", label: "bash", code: `npx astro add react` }, { type: "paragraph", html: "El paquete de Astro usa islas de Astro y React por debajo, así que tu proyecto necesita tener activada la integración oficial de React." }] },
      { id: "personalizacion", label: "Personalización", blocks: [{ type: "paragraph", html: "La superficie de personalización es la misma que en el resto de adaptadores: <code>sections</code>, <code>messages</code>, <code>theme</code> y configuración de recientes. Si necesitas cambiar iconos y layouts de fila con lógica propia, crea una isla de tu proyecto y lleva ahí el render avanzado." }, { type: "code", lang: "astro", label: "astro", code: `---
import CommandPalette from "@cmd-kit/astro/component";

const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "search-docs", title: "Buscar documentación", href: "/docs" }
    ]
  }
];
---

<CommandPalette
  sections={sections}
  messages={{
    searchPlaceholder: "Busca docs, páginas o acciones",
    noResults: "No hay ningún comando para esta búsqueda."
  }}
  theme={{
    accentColor: "#12b5e5",
    backgroundColor: "#0f1720",
    textColor: "#f5fbff"
  }}
  title="Comandos del proyecto"
/>` }] },
      { id: "patron-de-isla-avanzada", label: "Patrón de isla avanzada", blocks: [{ type: "paragraph", html: "Cuando necesites callbacks, hooks de framework o una fila totalmente custom, crea una isla en tu aplicación y usa dentro el adaptador que prefieras. Astro sigue siendo el shell y la isla controla el comportamiento avanzado." }, { type: "code", lang: "astro", label: "astro", code: `---
import ProjectPaletteIsland from "../components/ProjectPaletteIsland.tsx";
---

<ProjectPaletteIsland client:load />` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Necesito instalar <code>@cmd-kit/astro</code> y además la integración de React?</strong> Sí. El paquete funciona como isla interactiva y requiere la integración de React en Astro.", "<strong>¿Por qué se importa desde <code>@cmd-kit/astro/component</code>?</strong> Porque Astro consume el componente empaquetado a través de ese entrypoint.", "<strong>¿Puedo pasar callbacks desde un archivo <code>.astro</code>?</strong> No de forma fiable. Mantén props serializables y mueve la lógica con callbacks a una isla de framework.", "<strong>¿Cuándo conviene pasar a una isla personalizada?</strong> Cuando necesitas hooks de framework, callbacks de render o composición de UI que no cabe en props serializables.", "<strong>¿Pierdo personalización de tema y mensajes en Astro?</strong> No. Puedes seguir configurando <code>theme</code>, <code>messages</code>, secciones y recientes desde props de Astro."] }] }
    ]
  },
  core: {
    slug: "core", navLabel: "Core", eyebrow: "Core", heading: "Core headless", title: "Cmd+kit | Core",
    description: "Usa el core headless de Cmd+kit para construir una command palette en vanilla o en tu propio adaptador.",
    intro: ["<code>@cmd-kit/core</code> es el centro agnóstico al framework del proyecto. Te da secciones tipadas, fuzzy search, snapshot building, primitivas de ejecución, seguimiento de recientes y helpers de tema sin imponer ninguna capa de render."],
    sections: [
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "core", showAdapter: false, showLink: false }] },
      { id: "que-cubre", label: "Qué cubre", blocks: [{ type: "list", items: ["ítems y secciones de comandos", "filtrado fuzzy mediante el pipeline de búsqueda compartido", "snapshots agrupados para renderizado", "modelado de navegación anidada", "despacho de ejecución para callbacks, links y páginas anidadas", "primitivas de estado para recientes", "resolución de tema y helpers de CSS variables"] }] },
      { id: "ejemplo-minimo", label: "Ejemplo mínimo", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import {
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
      { id: "cuando-usarlo-directamente", label: "Cuándo usarlo directamente", blocks: [{ type: "paragraph", html: "Usa el core directamente cuando quieras construir tu propia UI, integrarte en otro framework o mantener la implementación totalmente custom. Si quieres un componente listo para usar, empieza por uno de los adaptadores oficiales." }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Core incluye componentes visuales?</strong> No. Core es headless y aporta modelado de comandos, filtrado, snapshots, ejecución y helpers de tema/mensajes.", "<strong>¿Cuándo debo empezar directamente por Core?</strong> Cuando ya sabes que necesitas una UI completamente custom o un adaptador propio.", "<strong>¿Core soporta carga asíncrona de comandos?</strong> Sí. Puedes usar <code>source</code> y <code>loadCommandSource</code> con el mismo shape de datos que en los adaptadores.", "<strong>¿Cómo ejecuto enlaces, callbacks y navegación anidada?</strong> Con <code>dispatchCommandExecution</code> y una implementación de <code>port</code> para <code>openHref</code>, <code>runCallback</code> y <code>navigate</code>.", "<strong>¿Puedo compartir datos entre Core y los adaptadores?</strong> Sí. El modelo de comandos es común, así que puedes migrar sin rediseñar la estructura de ítems/secciones."] }] }
    ]
  },
  customization: {
    slug: "customization", navLabel: "Personalización", eyebrow: "Personalización", heading: "Personalización", title: "Cmd+kit | Personalización",
    description: "Personaliza estructura de comandos, tokens de tema, copy, renderizado y fuentes asíncronas en Cmd+kit.",
    intro: ["<code>Cmd+kit</code> se configura en código. La superficie principal de personalización es la propia estructura de comandos, seguida de mensajes, tema, renderers y fuentes asíncronas.", 'Si quieres explorar estos ajustes con una interfaz guiada antes de llevarlos a código, consulta la <a href="/es/docs/playground">documentación del playground</a>.'],
    sections: [
      { id: "define-secciones-e-items", label: "Define secciones e ítems", blocks: [{ type: "code", lang: "ts", label: "ts", code: `const sections = [
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
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Debo meter componentes de icono dentro del modelo de datos?</strong> Normalmente no. Mantén el modelo agnóstico y mapea iconos en renderers o slots.", "<strong>¿Qué estrategia de estilos es más limpia?</strong> Usa <code>theme</code> para tokens de diseño comunes y <code>classNames</code> para control CSS por slot.", "<strong>¿Puedo combinar navegación anidada con <code>source</code> asíncrono?</strong> Sí, siempre que la respuesta asíncrona respete el mismo shape de comandos.", "<strong>¿Cómo localizo placeholder y estado vacío?</strong> Sobrescribe <code>messages</code> desde tu capa de i18n en vez de hardcodearlo en los datos.", "<strong>¿Cómo mantener renderers custom sin que se vuelvan inmantenibles?</strong> Deja la lógica de negocio en la generación de comandos y usa renderers solo para presentación."] }] }
    ]
  },
  playground: {
    slug: "playground", navLabel: "Playground", eyebrow: "Playground (Provisional)", heading: "Guía del playground (Provisional)", title: "Cmd+kit | Documentación del playground",
    description: "Aprende a usar el playground de Cmd+kit para configurar comandos, validar el comportamiento y exportar código base para producción.",
    intro: ["Esta guía es <strong>provisional</strong> y se cerrará cuando el playground esté terminado a nivel de UX y exports. La versión final incluirá capturas reales y flujos completos para producción.", "El playground es la forma más rápida de definir una integración con <code>Cmd+kit</code> antes de llevarla a tu código. Te permite configurar la estructura de comandos, validar el flujo en una preview viva y exportar código base para los adaptadores soportados."],
    sections: [
      { id: "para-que-sirve", label: "Para qué sirve", blocks: [{ type: "list", items: ["prototipar la estructura de la command palette sin editar ficheros de código al principio", "probar navegación anidada, búsqueda y agrupación en tiempo real", "ajustar tokens de tema y copy antes de integrar el paquete", "exportar snippets base para React, Vue, Preact, navegador vanilla, CSS, Tailwind y JSON"] }] },
      { id: "areas-principales", label: "Áreas principales", blocks: [{ type: "list", items: ["<strong>Basics</strong>: título, atajo, modo de source y ajustes generales", "<strong>Sections</strong>: creación de grupos de comandos y edición de cada ítem", "<strong>Nested commands</strong>: secciones hijas para modelar navegación en profundidad", "<strong>Messages</strong>: personalización del placeholder y del estado vacío", "<strong>Theme</strong>: ajuste de colores, borde, texto, radio y sombra", "<strong>Preview</strong>: validación en vivo de interacción y teclado", "<strong>Code</strong>: exportación de la configuración al formato que necesites"] }] },
      { id: "como-trabajar-con-el", label: "Cómo trabajar con él", blocks: [{ type: "list", ordered: true, items: ["Define primero las secciones raíz y los comandos de cada una.", "Añade atajos, enlaces, subtítulos y keywords cuando aporten claridad.", "Crea secciones anidadas para los flujos que necesiten un segundo nivel.", "Ajusta mensajes y tokens de tema hasta que la preview encaje con tu producto.", "Cambia el target de exportación y lleva el código generado a tu aplicación."] }] },
      { id: "modos-de-source", label: "Modos de source", blocks: [{ type: "paragraph", html: "El playground soporta configuración estática y configuración orientada a carga asíncrona. Usa el modo estático para modelar secciones inline. Usa el modo async cuando tu integración final vaya a cargar comandos desde una API o desde otra fuente dinámica." }] },
      { id: "exports", label: "Exports", blocks: [{ type: "paragraph", html: "El código generado está pensado como punto de partida práctico, no como plantilla cerrada. Lo normal es exportarlo, integrarlo en tu proyecto y seguir refinándolo según tu naming, estilos y comportamiento real." }] },
      { id: "buena-practica", label: "Buena práctica", blocks: [{ type: "paragraph", html: "Usa el playground para cerrar estructura y configuración rápidamente, y después apóyate en la documentación de los paquetes para la integración final. El playground acelera diseño y onboarding; la documentación sigue siendo la fuente de verdad para la API." }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Debo llevarme el código exportado tal cual a producción?</strong> Normalmente no. Úsalo como base y adáptalo a tu arquitectura, naming y estilos.", "<strong>¿El playground es la referencia oficial de API?</strong> No. La referencia oficial está en la documentación de cada paquete (React, Vue, Preact, Astro y Core).", "<strong>¿Tiene sentido usar playground si voy a implementar sobre Core?</strong> Sí. Es útil para validar primero la estructura de comandos antes de montar tu render custom.", "<strong>¿Por qué el snippet exportado no coincide al 100% con mi estilo de proyecto?</strong> Porque el export está diseñado como plantilla neutral. Ajusta formato, estructura y convenciones internas.", "<strong>¿Qué debería validar antes de pasar del playground a producción?</strong> Flujo de teclado, navegación anidada, labels de accesibilidad y comportamiento de carga/error en tu contexto real."] }] }
    ]
  }
};

