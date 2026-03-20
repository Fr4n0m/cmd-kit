import type { DocPageData } from "@/i18n/docs/shared";

export const gettingStartedESDoc: DocPageData = {
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
      { id: "comandos-recientes", label: "Comandos recientes", blocks: [{ type: "paragraph", html: "<code>recents</code> está desactivado por defecto. Actívalo con <code>recents={true}</code> o configúralo con <code>recents={{ limit, sectionTitle }}</code>. Si quieres desactivarlo explícitamente, usa <code>recents={false}</code>." }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Qué paquete instalo si mi app mezcla varias tecnologías?</strong> Instala el adaptador del árbol de UI que va a renderizar la palette. Usa <code>@cmd-kit/core</code> solo si vas a construir tu propia capa de UI.", "<strong>¿Tengo que instalar las peer dependencies manualmente?</strong> Sí. Instala el adaptador junto al runtime que ya usa tu proyecto (React, Vue, Preact o Astro).", "<strong>¿Puedo empezar con secciones estáticas y luego pasar a datos asíncronos?</strong> Sí. Puedes arrancar con <code>sections</code> o <code>items</code> y migrar después a <code>source</code> sin cambiar el modelo de comandos.", "<strong>¿Puedo desactivar completamente los comandos recientes?</strong> Sí. No pases <code>recents</code> (por defecto está apagado) o pásalo como <code>recents={false}</code>.", "<strong>¿Cmd+kit está listo para producción?</strong> Sí, siempre que valides en tu app real la estructura de comandos, el flujo de teclado y el comportamiento específico del producto.", "<strong>¿Cuándo tiene sentido pasar de un adaptador a Core?</strong> Cuando necesitas control total del renderizado y de la interacción más allá de lo que ofrece el componente empaquetado."] }] }
    ]
  };


