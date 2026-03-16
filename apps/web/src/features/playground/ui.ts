export interface PlaygroundLabels {
  accent: string;
  addItem: string;
  addNestedItem: string;
  addNestedSection: string;
  addSection: string;
  asyncMode: string;
  basicsEyebrow: string;
  basicsHeading: string;
  border: string;
  centered: string;
  closeLabel: string;
  code: string;
  codeDescription: string;
  codeExportLabel: string;
  codeLiveOutput: string;
  config: string;
  configuratorDescription: string;
  configuratorHeading: string;
  copy: string;
  copyFailed: string;
  copyReady: string;
  cssCode: string;
  defaultOpen: string;
  description: string;
  itemDisabled: string;
  itemHref: string;
  itemIcon: string;
  itemKeywords: string;
  itemShortcut: string;
  itemSubtitle: string;
  itemTitle: string;
  jsonCode: string;
  language: string;
  languageEnglish: string;
  languageSpanish: string;
  launch: string;
  layout: string;
  moveDown: string;
  moveUp: string;
  muted: string;
  nested: string;
  nestedSectionTitle: string;
  noResults: string;
  overlay: string;
  placeholder: string;
  preactCode: string;
  preview: string;
  previewBadgeExports: string;
  previewBadgeFramework: string;
  previewDescription: string;
  previewHeading: string;
  radius: string;
  reactCode: string;
  recents: string;
  recentsDisabled: string;
  recentsEnabled: string;
  recentsLimit: string;
  recentsTitle: string;
  remove: string;
  sectionTitle: string;
  sections: string;
  sectionsDescription: string;
  sectionsHeading: string;
  shadow: string;
  shortcut: string;
  sourceDelay: string;
  sourceMode: string;
  staticMode: string;
  summaryCommands: string;
  summaryRecents: string;
  summarySections: string;
  surface: string;
  tailwindCode: string;
  text: string;
  themeEyebrow: string;
  themeHeading: string;
  title: string;
  vanillaCode: string;
  vueCode: string;
  wide: string;
}

export interface PlaygroundDefaults {
  actionsSection: string;
  childComponents: string;
  childDocs: string;
  childScope: string;
  closeLabel: string;
  commandDescription: string;
  commandTitle: string;
  dashboardKeywords: string[];
  dashboardSubtitle: string;
  dashboardTitle: string;
  newItemTitle: string;
  newSectionTitle: string;
  newNestedSectionTitle: string;
  noResults: string;
  placeholder: string;
  preferencesSection: string;
  previewDescription: string;
  previewTitle: string;
  recentTitle: string;
  searchKeywords: string[];
  searchSubtitle: string;
  searchTitle: string;
  sectionNavigation: string;
  switchThemeSubtitle: string;
  switchThemeTitle: string;
}

interface PlaygroundLocaleBundle {
  defaults: PlaygroundDefaults;
  labels: PlaygroundLabels;
}

const playgroundCopy = {
  en: {
    labels: {
      accent: "Accent color",
      addItem: "Add item",
      addNestedItem: "Add nested item",
      addNestedSection: "Add nested section",
      addSection: "Add section",
      asyncMode: "Async source",
      basicsEyebrow: "Basics",
      basicsHeading: "Message and behavior",
      border: "Border color",
      centered: "Centered",
      closeLabel: "Close label",
      code: "Generated Code",
      codeDescription:
        "Switch frameworks, copy the snippet, and keep the same command structure.",
      codeExportLabel: "Export",
      codeLiveOutput: "Live output from the current configurator state",
      config: "Configurator",
      configuratorDescription:
        "Tune the visible product layer first, then export the code that matches it.",
      configuratorHeading: "Command surface",
      copy: "Copy",
      copyFailed: "Copy failed",
      copyReady: "Copy ready",
      cssCode: "CSS Variables",
      defaultOpen: "Open on load",
      description: "Preview description",
      itemDisabled: "Disabled",
      itemHref: "Item href",
      itemIcon: "Item icon",
      itemKeywords: "Item keywords",
      itemShortcut: "Item shortcut",
      itemSubtitle: "Item subtitle",
      itemTitle: "Item title",
      jsonCode: "JSON",
      language: "Language",
      languageEnglish: "English",
      languageSpanish: "Español",
      launch: "Open preview",
      layout: "Layout",
      moveDown: "Move down",
      moveUp: "Move up",
      muted: "Muted color",
      nested: "Nested commands",
      nestedSectionTitle: "Nested section title",
      noResults: "Empty state",
      overlay: "Overlay color",
      placeholder: "Search placeholder",
      preactCode: "Preact",
      preview: "Live Preview",
      previewBadgeExports: "Vue / Preact / Vanilla exports",
      previewBadgeFramework: "React first",
      previewDescription:
        "Edit content, theme, sections, nested commands, and exports in one place.",
      previewHeading: "Shape the palette, then take the code with you.",
      radius: "Radius",
      reactCode: "React",
      recents: "Recent items",
      recentsDisabled: "Off",
      recentsEnabled: "On",
      recentsLimit: "Recent limit",
      recentsTitle: "Recent title",
      remove: "Remove",
      sectionTitle: "Section title",
      sections: "Sections",
      sectionsDescription:
        "Define sections, commands, nested flows, and the order users move through.",
      sectionsHeading: "Information architecture",
      shadow: "Shadow",
      shortcut: "Shortcut",
      sourceDelay: "Async delay",
      sourceMode: "Data mode",
      staticMode: "Static",
      summaryCommands: "Commands",
      summaryRecents: "Recents",
      summarySections: "Sections",
      surface: "Surface color",
      tailwindCode: "Tailwind",
      text: "Text color",
      themeEyebrow: "Theme",
      themeHeading: "Palette and feel",
      title: "Palette title",
      vanillaCode: "Vanilla JS",
      vueCode: "Vue",
      wide: "Wide"
    },
    defaults: {
      actionsSection: "Actions",
      childComponents: "Components",
      childDocs: "Documentation",
      childScope: "Search scope",
      closeLabel: "Close command palette",
      commandDescription:
        "Tune colors, sections, and commands while exporting the exact code your project needs.",
      commandTitle: "Build your command palette live",
      dashboardKeywords: ["home", "overview"],
      dashboardSubtitle: "Open the main application view",
      dashboardTitle: "Go to dashboard",
      newItemTitle: "New item",
      newSectionTitle: "New section",
      newNestedSectionTitle: "Nested section",
      noResults: "No results found.",
      placeholder: "Search commands...",
      preferencesSection: "Preferences",
      previewDescription: "Describe this command",
      recentTitle: "Recent",
      searchKeywords: ["finder", "jump"],
      searchSubtitle: "Jump across the whole workspace",
      searchTitle: "Search everything",
      sectionNavigation: "Navigation",
      switchThemeSubtitle: "Preview alternate visual presets",
      switchThemeTitle: "Switch theme"
    }
  },
  es: {
    labels: {
      accent: "Color de acento",
      addItem: "Añadir item",
      addNestedItem: "Añadir item anidado",
      addNestedSection: "Añadir sección anidada",
      addSection: "Añadir sección",
      asyncMode: "Source async",
      basicsEyebrow: "Basics",
      basicsHeading: "Mensajes y comportamiento",
      border: "Color del borde",
      centered: "Centrado",
      closeLabel: "Etiqueta de cierre",
      code: "Código generado",
      codeDescription:
        "Cambia de framework, copia el snippet y mantén la misma estructura de comandos.",
      codeExportLabel: "Export",
      codeLiveOutput: "Salida viva desde el estado actual del configurador",
      config: "Configurador",
      configuratorDescription:
        "Ajusta primero la capa visible del producto y luego exporta el código que la representa.",
      configuratorHeading: "Superficie de comandos",
      copy: "Copiar",
      copyFailed: "Error al copiar",
      copyReady: "Copia lista",
      cssCode: "Variables CSS",
      defaultOpen: "Abrir al cargar",
      description: "Descripción de preview",
      itemDisabled: "Deshabilitado",
      itemHref: "Href del item",
      itemIcon: "Icono del item",
      itemKeywords: "Keywords del item",
      itemShortcut: "Atajo del item",
      itemSubtitle: "Subtítulo del item",
      itemTitle: "Título del item",
      jsonCode: "JSON",
      language: "Idioma",
      languageEnglish: "English",
      languageSpanish: "Español",
      launch: "Abrir preview",
      layout: "Layout",
      moveDown: "Bajar",
      moveUp: "Subir",
      muted: "Color secundario",
      nested: "Comandos anidados",
      nestedSectionTitle: "Título de sección anidada",
      noResults: "Estado vacío",
      overlay: "Color del overlay",
      placeholder: "Placeholder de búsqueda",
      preactCode: "Preact",
      preview: "Vista previa",
      previewBadgeExports: "Exports para Vue / Preact / Vanilla",
      previewBadgeFramework: "React first",
      previewDescription:
        "Edita contenido, tema, secciones, comandos anidados y exports en un mismo sitio.",
      previewHeading: "Da forma al palette y llévate luego el código.",
      radius: "Radio",
      reactCode: "React",
      recents: "Items recientes",
      recentsDisabled: "Off",
      recentsEnabled: "On",
      recentsLimit: "Límite de recientes",
      recentsTitle: "Título de recientes",
      remove: "Eliminar",
      sectionTitle: "Título de sección",
      sections: "Secciones",
      sectionsDescription:
        "Define secciones, comandos, flujos anidados y el orden por el que se mueve el usuario.",
      sectionsHeading: "Arquitectura de información",
      shadow: "Sombra",
      shortcut: "Atajo",
      sourceDelay: "Delay async",
      sourceMode: "Modo de datos",
      staticMode: "Estático",
      summaryCommands: "Comandos",
      summaryRecents: "Recientes",
      summarySections: "Secciones",
      surface: "Color de fondo",
      tailwindCode: "Tailwind",
      text: "Color del texto",
      themeEyebrow: "Theme",
      themeHeading: "Palette y sensación",
      title: "Título del palette",
      vanillaCode: "Vanilla JS",
      vueCode: "Vue",
      wide: "Ancho"
    },
    defaults: {
      actionsSection: "Acciones",
      childComponents: "Componentes",
      childDocs: "Documentación",
      childScope: "Ámbito de búsqueda",
      closeLabel: "Cerrar command palette",
      commandDescription:
        "Ajusta colores, secciones y comandos mientras exportas el código exacto que necesita tu proyecto.",
      commandTitle: "Construye tu command palette en vivo",
      dashboardKeywords: ["inicio", "resumen"],
      dashboardSubtitle: "Abre la vista principal de la aplicación",
      dashboardTitle: "Ir al dashboard",
      newItemTitle: "Nuevo item",
      newSectionTitle: "Nueva sección",
      newNestedSectionTitle: "Sección anidada",
      noResults: "No se han encontrado resultados.",
      placeholder: "Buscar comandos...",
      preferencesSection: "Preferencias",
      previewDescription: "Describe este comando",
      recentTitle: "Recientes",
      searchKeywords: ["buscador", "salto"],
      searchSubtitle: "Salta por todo el workspace",
      searchTitle: "Buscar en todo",
      sectionNavigation: "Navegación",
      switchThemeSubtitle: "Previsualiza presets visuales alternativos",
      switchThemeTitle: "Cambiar tema"
    }
  }
} satisfies Record<"en" | "es", PlaygroundLocaleBundle>;

export type PlaygroundLanguage = keyof typeof playgroundCopy;

export function getPlaygroundCopy(language: PlaygroundLanguage) {
  return playgroundCopy[language];
}

export type PlaygroundCopy = ReturnType<typeof getPlaygroundCopy>;
