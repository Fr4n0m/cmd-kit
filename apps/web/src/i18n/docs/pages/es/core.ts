import type { DocPageData } from "@/i18n/docs/shared";

export const coreESDoc: DocPageData = {
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
      { id: "comandos-recientes-en-core", label: "Comandos recientes en Core", blocks: [{ type: "paragraph", html: "Core no expone una prop <code>recents</code> porque es headless. Para implementar recientes usa <code>recordRecentCommand</code> y <code>resolveRecentCommands</code> en tu estado, o no lo uses si no necesitas esa sección." }, { type: "code", lang: "ts", label: "ts", code: `import {
  recordRecentCommand,
  resolveRecentCommands
} from "@cmd-kit/core";

let recentRecords: Array<{ itemId: string; timestamp: number }> = [];

recentRecords = recordRecentCommand({
  current: recentRecords,
  itemId: "home",
  limit: 6
});

const recentItems = resolveRecentCommands(config.items, recentRecords);` }] },
      { id: "cuando-usarlo-directamente", label: "Cuándo usarlo directamente", blocks: [{ type: "paragraph", html: "Usa el core directamente cuando quieras construir tu propia UI, integrarte en otro framework o mantener la implementación totalmente custom. Si quieres un componente listo para usar, empieza por uno de los adaptadores oficiales." }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Core incluye componentes visuales?</strong> No. Core es headless y aporta modelado de comandos, filtrado, snapshots, ejecución y helpers de tema/mensajes.", "<strong>¿Cuándo debo empezar directamente por Core?</strong> Cuando ya sabes que necesitas una UI completamente custom o un adaptador propio.", "<strong>¿Core soporta carga asíncrona de comandos?</strong> Sí. Puedes usar <code>source</code> y <code>loadCommandSource</code> con el mismo shape de datos que en los adaptadores.", "<strong>¿Cómo ejecuto enlaces, callbacks y navegación anidada?</strong> Con <code>dispatchCommandExecution</code> y una implementación de <code>port</code> para <code>openHref</code>, <code>runCallback</code> y <code>navigate</code>.", "<strong>¿Puedo compartir datos entre Core y los adaptadores?</strong> Sí. El modelo de comandos es común, así que puedes migrar sin rediseñar la estructura de ítems/secciones."] }] }
    ]
  };


