import type { DocPageData } from "@/i18n/docs/shared";

export const astroESDoc: DocPageData = {
    slug: "astro", navLabel: "Astro", eyebrow: "Astro", heading: "Integración con Astro", title: "Cmd+kit | Astro",
    description: "Instala el paquete de Astro y monta tu primera palette en Astro sin dependencias de React.",
    intro: ["<code>@cmd-kit/astro</code> es el paquete de Astro para Cmd+kit. Renderiza la command palette por defecto directamente en Astro y mantiene el mismo modelo de comandos y la misma superficie de personalización que el resto de adaptadores."],
    sections: [
      { id: "cuando-usar-el-paquete-de-astro", label: "Cuándo usar el paquete de Astro", blocks: [{ type: "list", items: ["Usa <code>@cmd-kit/astro</code> cuando Astro sea el shell de la página y quieras la integración empaquetada más rápida sin depender de React.", "Quédate en el paquete de Astro si tu palette puede configurarse con props serializables como secciones, mensajes, tema y recientes.", "Pasa a <code>@cmd-kit/core</code> solo cuando necesites un render totalmente custom más allá del componente empaquetado de Astro.", "Usa otro adaptador solo si tu producto ya depende de ese framework para UI interactiva."] }] },
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "astro", showAdapter: false, showLink: false }] },
      { id: "enlaces-paquete", label: "Enlaces del paquete", blocks: [{ type: "list", items: ['<a href="https://www.npmjs.com/package/@cmd-kit/astro" target="_blank" rel="noopener noreferrer"><span aria-hidden="true" style="display:inline-flex;width:14px;height:14px;vertical-align:-2px;margin-right:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"/><path d="M12 12l8 -4.5"/><path d="M12 12l0 9"/><path d="M12 12l-8 -4.5"/><path d="M16 5.25l-8 4.5"/></svg></span>NPM: @cmd-kit/astro</a>'] }] },
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
      { id: "requisitos-runtime", label: "Requisitos de runtime", blocks: [{ type: "paragraph", html: "No necesitas integración de React. Instala <code>@cmd-kit/astro</code> en tu proyecto Astro y usa el componente directamente." }] },
      { id: "personalizacion", label: "Personalización", blocks: [{ type: "paragraph", html: "La superficie de personalización es la misma que en el resto de adaptadores: <code>sections</code>, <code>messages</code>, <code>theme</code> (modo simple o dual), <code>recents</code>, <code>reducedMotion</code> y <code>size</code> (<code>&quot;small&quot; | &quot;normal&quot; | &quot;large&quot;</code>)." }, { type: "code", lang: "astro", label: "astro", code: `---
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
    light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
    dark: { accentColor: "#12b5e5", backgroundColor: "#0f1720" }
  }}
  title="Comandos del proyecto"
/>` }] },
      { id: "anadir-un-comando-nuevo", label: "Añadir un comando nuevo", blocks: [{ type: "paragraph", html: "Para añadir una opción nueva, crea un nuevo ítem en tu lista de secciones. <code>shortcut</code> es opcional." }, { type: "code", lang: "astro", label: "astro", code: `---
const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" },
      { id: "billing", title: "Billing", href: "/billing", shortcut: "mod+b" },
      { id: "support", title: "Support", href: "/support" }
    ]
  }
];
---` }] },
      { id: "comandos-recientes", label: "Comandos recientes", blocks: [{ type: "paragraph", html: "<code>recents</code> es opcional y viene apagado por defecto. Actívalo con <code>recents={true}</code> o configúralo con <code>recents={{ limit, sectionTitle }}</code>. Desactívalo con <code>recents={false}</code>." }, { type: "code", lang: "astro", label: "astro", code: `<CommandPalette
  sections={sections}
  recents={false}
  title="Comandos del proyecto"
/>` }] },
      { id: "cuando-pasar-a-core", label: "Cuándo pasar a Core", blocks: [{ type: "paragraph", html: "Cuando necesites callbacks, comportamiento avanzado o render completamente custom, pasa a <code>@cmd-kit/core</code> y construye tu propia capa de UI. Mantén <code>@cmd-kit/astro</code> para la experiencia empaquetada por defecto." }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Necesito React para usar <code>@cmd-kit/astro</code>?</strong> No. El paquete de Astro ya no depende de React.", "<strong>¿Por qué se importa desde <code>@cmd-kit/astro/component</code>?</strong> Porque Astro consume el componente empaquetado a través de ese entrypoint.", "<strong>¿Puedo pasar callbacks desde un archivo <code>.astro</code>?</strong> Mantén props serializables en Astro. Para lógica con callbacks usa <code>@cmd-kit/core</code> y una UI propia.", "<strong>¿Cómo desactivo recientes en Astro?</strong> No pases <code>recents</code> (apagado por defecto) o usa <code>recents={false}</code>.", "<strong>¿Cuándo conviene pasar a Core?</strong> Cuando necesitas comportamiento o render que excede la superficie del componente empaquetado.", "<strong>¿Pierdo personalización de tema y mensajes en Astro?</strong> No. Puedes seguir configurando <code>theme</code>, <code>messages</code>, secciones y recientes desde props de Astro."] }] }
    ]
  };


