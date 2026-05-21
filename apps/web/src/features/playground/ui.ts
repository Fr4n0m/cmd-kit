export interface PlaygroundLabels {
  accent: string;
  addItem: string;
  astroCode: string;
  addNestedItem: string;
  addNestedSection: string;
  addSection: string;
  asyncMode: string;
  basicsDescription: string;
  basicsEyebrow: string;
  basicsHeading: string;
  border: string;
  captionColor: string;
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
  hideCode: string;
  cssCode: string;
  defaultOpen: string;
  description: string;
  itemDisabled: string;
  itemHref: string;
  itemIcon: string;
  itemKeywords: string;
  itemSubtitleColor: string;
  itemShortcut: string;
  itemTitleColor: string;
  itemSubtitle: string;
  itemTitle: string;
  language: string;
  languageEnglish: string;
  languageSpanish: string;
  launch: string;
  mobileDesktopNotice: string;
  mobileDesktopAcknowledge: string;
  mobileDesktopTitle: string;
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
  sectionTitleColor: string;
  sections: string;
  sectionsDescription: string;
  sectionsHeading: string;
  shadowAdvancedHide: string;
  shadowAdvancedShow: string;
  shadow: string;
  shortcut: string;
  shortcutColor: string;
  sourceDelay: string;
  sourceMode: string;
  size: string;
  sizeSmall: string;
  sizeNormal: string;
  sizeLarge: string;
  staticMode: string;
  showCode: string;
  summaryCommands: string;
  summaryRecents: string;
  summarySections: string;
  surface: string;
  tailwindCode: string;
  text: string;
  titleColor: string;
  themeModeDark: string;
  themeModeField: string;
  themeModeLight: string;
  themeDescription: string;
  themeEditorHint: string;
  themeEyebrow: string;
  themeHeading: string;
  themeLightSection: string;
  themeDarkSection: string;
  themePreviewModeField: string;
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
      astroCode: "Astro",
      addNestedItem: "Add nested item",
      addNestedSection: "Add nested section",
      addSection: "Add section",
      asyncMode: "Async source",
      basicsDescription: "Language, layout, title, search text, shortcut, and recents.",
      basicsEyebrow: "Basics",
      basicsHeading: "Essentials",
      border: "Border color",
      captionColor: "Description color",
      centered: "Centered",
      closeLabel: "Close label",
      code: "Generated Code",
      codeDescription:
        "Switch frameworks, copy the snippet, and keep the same command structure.",
      codeExportLabel: "Export",
      codeLiveOutput: "Live output from the current configurator state",
      config: "Configurator",
      configuratorDescription:
        "Move from the essentials to structure without facing every control at once.",
      configuratorHeading: "Set up the experience",
      copy: "Copy",
      copyFailed: "Copy failed",
      copyReady: "Copy ready",
      hideCode: "Hide code",
      cssCode: "CSS Variables",
      defaultOpen: "Open on load",
      description: "Preview description",
      itemDisabled: "Disabled",
      itemHref: "Item href",
      itemIcon: "Item icon",
      itemKeywords: "Item keywords",
      itemSubtitleColor: "Item subtitle color",
      itemShortcut: "Item shortcut",
      itemTitleColor: "Item title color",
      itemSubtitle: "Item subtitle",
      itemTitle: "Item title",
      language: "Language",
      languageEnglish: "English",
      languageSpanish: "Español",
      launch: "Preview",
      mobileDesktopAcknowledge: "OK, continue",
      mobileDesktopNotice:
        "This playground is optimized for desktop for full editing and preview controls.",
      mobileDesktopTitle: "Better on desktop",
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
      previewDescription:
        "Open the current palette at any point while content and exports keep updating.",
      previewHeading: "Try the current version",
      radius: "Radius",
      reactCode: "React",
      recents: "Recent items",
      recentsDisabled: "Off",
      recentsEnabled: "On",
      recentsLimit: "Recent limit",
      recentsTitle: "Recent title",
      remove: "Remove",
      sectionTitle: "Section title",
      sectionTitleColor: "Section title color",
      sections: "Sections",
      sectionsDescription:
        "Define sections, commands, nested flows, and the order users move through.",
      sectionsHeading: "Information architecture",
      shadowAdvancedHide: "Hide advanced",
      shadowAdvancedShow: "Advanced",
      shadow: "Shadow",
      shortcut: "Shortcut",
      shortcutColor: "Shortcut color",
      sourceDelay: "Async delay",
      sourceMode: "Data mode",
      size: "Palette size",
      sizeSmall: "Small",
      sizeNormal: "Normal",
      sizeLarge: "Large",
      staticMode: "Static",
      showCode: "Show code",
      summaryCommands: "Commands",
      summaryRecents: "Recents",
      summarySections: "Sections",
      surface: "Surface color",
      tailwindCode: "Tailwind",
      text: "Text color",
      titleColor: "Title color",
      themeModeDark: "Dark mode",
      themeModeField: "Theme target",
      themeModeLight: "Light mode",
      themeDescription: "Palette colors, overlay, radius, and shadow.",
      themeEditorHint:
        "Edit each mode separately. Hover and active states are derived automatically from the accent color.",
      themeEyebrow: "Theme",
      themeHeading: "Look and feel",
      themeLightSection: "Light mode palette",
      themeDarkSection: "Dark mode palette",
      themePreviewModeField: "Preview mode",
      title: "Palette title",
      vanillaCode: "Core (Vanilla JS)",
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
      previewTitle: "Preview command",
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
      addItem: "Añadir elemento",
      astroCode: "Astro",
      addNestedItem: "Añadir elemento anidado",
      addNestedSection: "Añadir sección anidada",
      addSection: "Añadir sección",
      asyncMode: "Fuente asíncrona",
      basicsDescription: "Idioma, layout, título, texto de búsqueda, atajo y recientes.",
      basicsEyebrow: "Básicos",
      basicsHeading: "Esenciales",
      border: "Color del borde",
      captionColor: "Color de descripción",
      centered: "Centrado",
      closeLabel: "Etiqueta de cierre",
      code: "Código generado",
      codeDescription:
        "Cambia de framework, copia el snippet y mantén la misma estructura de comandos.",
      codeExportLabel: "Exportar",
      codeLiveOutput: "Salida viva desde el estado actual del configurador",
      config: "Configurador",
      configuratorDescription:
        "Ve de lo esencial a la estructura sin tener todos los controles abiertos a la vez.",
      configuratorHeading: "Configura la experiencia",
      copy: "Copiar",
      copyFailed: "Error al copiar",
      copyReady: "Copia lista",
      hideCode: "Ocultar código",
      cssCode: "Variables CSS",
      defaultOpen: "Abrir al cargar",
      description: "Descripción de vista previa",
      itemDisabled: "Deshabilitado",
      itemHref: "Enlace del elemento",
      itemIcon: "Icono del elemento",
      itemKeywords: "Palabras clave",
      itemSubtitleColor: "Color subtítulo del elemento",
      itemShortcut: "Atajo del elemento",
      itemTitleColor: "Color título del elemento",
      itemSubtitle: "Subtítulo del elemento",
      itemTitle: "Título del elemento",
      language: "Idioma",
      languageEnglish: "English",
      languageSpanish: "Español",
      launch: "Vista",
      mobileDesktopAcknowledge: "Vale, continuar",
      mobileDesktopNotice:
        "Este playground está optimizado para escritorio para editar y previsualizar con todos los controles.",
      mobileDesktopTitle: "Mejor en escritorio",
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
      previewDescription:
        "Abre la paleta actual en cualquier momento mientras contenido y código se actualizan.",
      previewHeading: "Prueba la versión actual",
      radius: "Radio",
      reactCode: "React",
      recents: "Elementos recientes",
      recentsDisabled: "Desactivado",
      recentsEnabled: "Activado",
      recentsLimit: "Límite de recientes",
      recentsTitle: "Título de recientes",
      remove: "Eliminar",
      sectionTitle: "Título de sección",
      sectionTitleColor: "Color título de sección",
      sections: "Secciones",
      sectionsDescription:
        "Define secciones, comandos, flujos anidados y el orden por el que se mueve el usuario.",
      sectionsHeading: "Arquitectura de información",
      shadowAdvancedHide: "Ocultar avanzado",
      shadowAdvancedShow: "Avanzado",
      shadow: "Sombra",
      shortcut: "Atajo",
      shortcutColor: "Color de atajo",
      sourceDelay: "Delay async",
      sourceMode: "Modo de datos",
      size: "Tamaño de paleta",
      sizeSmall: "Pequeño",
      sizeNormal: "Normal",
      sizeLarge: "Grande",
      staticMode: "Estático",
      showCode: "Mostrar código",
      summaryCommands: "Comandos",
      summaryRecents: "Recientes",
      summarySections: "Secciones",
      surface: "Color de fondo",
      tailwindCode: "Tailwind",
      text: "Color del texto",
      titleColor: "Color del título",
      themeModeDark: "Modo oscuro",
      themeModeField: "Tema a editar",
      themeModeLight: "Modo claro",
      themeDescription: "Colores, overlay, radio y sombra de la paleta.",
      themeEditorHint:
        "Edita cada modo por separado. Los estados hover y activos se calculan automáticamente desde el color de acento.",
      themeEyebrow: "Tema",
      themeHeading: "Apariencia",
      themeLightSection: "Paleta modo claro",
      themeDarkSection: "Paleta modo oscuro",
      themePreviewModeField: "Modo de vista previa",
      title: "Título de la paleta",
      vanillaCode: "Core (Vanilla JS)",
      vueCode: "Vue",
      wide: "Ancho"
    },
    defaults: {
      actionsSection: "Acciones",
      childComponents: "Componentes",
      childDocs: "Documentación",
      childScope: "Ámbito de búsqueda",
      closeLabel: "Cerrar menú de comandos",
      commandDescription:
        "Ajusta colores, secciones y comandos mientras exportas el código exacto que necesita tu proyecto.",
      commandTitle: "Construye tu menú de comandos en vivo",
      dashboardKeywords: ["inicio", "resumen"],
      dashboardSubtitle: "Abre la vista principal de la aplicación",
      dashboardTitle: "Ir al dashboard",
      newItemTitle: "Nuevo elemento",
      newSectionTitle: "Nueva sección",
      newNestedSectionTitle: "Sección anidada",
      noResults: "No se han encontrado resultados.",
      placeholder: "Buscar comandos...",
      preferencesSection: "Preferencias",
      previewDescription: "Describe este comando",
      previewTitle: "Comando de vista previa",
      recentTitle: "Recientes",
      searchKeywords: ["buscador", "salto"],
      searchSubtitle: "Salta por todo el workspace",
      searchTitle: "Buscar en todo",
      sectionNavigation: "Navegación",
      switchThemeSubtitle: "Previsualiza preajustes visuales alternativos",
      switchThemeTitle: "Cambiar tema"
    }
  }
} satisfies Record<"en" | "es", PlaygroundLocaleBundle>;

export type PlaygroundLanguage = keyof typeof playgroundCopy;

export function getPlaygroundCopy(language: PlaygroundLanguage) {
  return playgroundCopy[language];
}

export type PlaygroundCopy = ReturnType<typeof getPlaygroundCopy>;
