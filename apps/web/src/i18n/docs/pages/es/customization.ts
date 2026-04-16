import type { DocPageData } from "@/i18n/docs/shared";

export const customizationESDoc: DocPageData = {
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
    light: {
      accentColor: "#0fa6d8",
      backgroundColor: "#ffffff",
      textColor: "#0e1720"
    },
    dark: {
      accentColor: "#12b5e5",
      backgroundColor: "#0f1720",
      textColor: "#f5fbff",
      mutedColor: "#9fb4c4",
      borderColor: "#264152",
      overlayColor: "rgba(4, 9, 13, 0.64)",
      radius: "22px",
      shadow: "0 24px 80px rgba(0, 0, 0, 0.42)"
    }
  }}
/>` }] },
      { id: "variables-css", label: "Variables CSS", blocks: [{ type: "code", lang: "ts", label: "ts", code: `import { createThemeCssText } from "@cmd-kit/core";

const themes = {
  light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
  dark: { accentColor: "#12b5e5", backgroundColor: "#0f1720" }
};

const darkCss = createThemeCssText(themes.dark);
const lightCss = createThemeCssText(themes.light);

const themeBlock = \`:root {
\${darkCss}
}

html[data-theme="light"] {
\${lightCss}
}\`;` }] },
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
  };


