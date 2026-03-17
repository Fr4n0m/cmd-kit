import type { HomePageCopy } from "./shared";
import type { Locale } from "../site";

export const homePages: Record<Locale, HomePageCopy> = {
  en: {
    badge: "Open source command palette toolkit",
    customizationCta: "Customization",
    description:
      "Open source command palette toolkit with a framework-agnostic core, React bindings, and a live configurator.",
    docsCta: "Getting started",
    docsDescription:
      "The docs are part of the product surface, not an afterthought. They cover the adapters, the core, customization patterns, and release preparation.",
    docsEyebrow: "Docs",
    docsHeading: "Installation, customization, release flow",
    heroBody:
      "`Cmd+kit` gives you a framework-agnostic command engine, official adapters, nested navigation, recent commands, and a playground that exports real code instead of static design snippets.",
    heroCta: "Open the playground",
    heroDocsCta: "Start with docs",
    heroHeading: "Make your command palette feel native.",
    heroKicker: "Headless engine. Official adapters. Production-oriented UI.",
    heroProofAdapterBody: "React, Vue, Preact, Astro islands and vanilla browser",
    heroProofAdapterLabel: "Adapters",
    heroProofCoreBody: "Framework-agnostic search, grouping, execution, recents",
    heroProofCoreLabel: "Core",
    heroStageActiveShortcut: "G D",
    heroStageActiveSubtitle: "Jump into the workspace overview",
    heroStageActiveTitle: "Open dashboard",
    heroStageInactiveShortcut: "Enter",
    heroStageInactiveSubtitle: "Nested section with scoped commands",
    heroStageInactiveTitle: "Search docs",
    heroStageLabel: "Project commands",
    heroStageNote:
      "Astro for the shell. Interactive islands only where the product actually needs state.",
    heroStageRecentLabel: "Recent",
    heroStageSearchPlaceholder: "Search commands, pages, and actions...",
    heroStageShortcut: "Cmd / Ctrl + K",
    heroStageSurface: "React first",
    heroStageSurfaceMuted: "mod+k",
    heroTerminalLabel: "terminal",
    heroTerminalTitle: "cmd-kit",
    installCommands: ["npm install @cmd-kit/react", "npm install @cmd-kit/core"],
    installDescription:
      "Start with the adapter that gets you shipping fast, then drop into the core when you need full control.",
    installEyebrow: "Install",
    installHeading: "npm packages",
    metaDescription:
      "Open source command palette toolkit with a framework-agnostic core, React bindings, and a live configurator.",
    metricOutputLabel: "Output",
    metricOutputValue: "React, Vue, Preact, CSS, Tailwind, JSON",
    metricSurfaceLabel: "Surface",
    metricSurfaceValue: "Headless + styled",
    overviewLargeBody:
      "`Cmd+kit` keeps the engine portable and typed while letting teams ship a usable default UI or replace it without fighting the internals.",
    overviewLargeEyebrow: "Why it exists",
    overviewLargeHeading:
      "Most command palettes force you to choose between speed of shipping and control of the surface.",
    overviewReactBody:
      "Use the default UI, override renderers, or treat the hook as the integration boundary for your own command layer.",
    overviewReactEyebrow: "React",
    overviewReactHeading: "Composable surface",
    overviewSearchBody:
      "Fast matching, grouped sections, nested pages, and recents without leaking framework code into the core.",
    overviewSearchEyebrow: "Search",
    overviewSearchHeading: "Fuzzy by default",
    playgroundAriaLabel: "Supported technologies",
    playgroundCta: "Open playground",
    playgroundDescription:
      "The configurator now lives on its own page so the editor, preview, and generated code can use the full screen and keep the hierarchy clean.",
    playgroundEyebrow: "Playground",
    playgroundHeading: "A dedicated workspace for shaping the full command surface",
    techAdapters: "Nested flows",
    techCore: "Typed core",
    techNestedFlows: "Nested flows",
    techReact: "React-first",
    technologyNames: ["React", "Vue", "Preact", "Astro", "Vanilla"],
    title: "Cmd+kit"
  },
  es: {
    badge: "Toolkit open source de command palette",
    customizationCta: "Personalización",
    description:
      "Toolkit open source de command palette con core agnóstico al framework, adaptadores oficiales y configurador en vivo.",
    docsCta: "Primeros pasos",
    docsDescription:
      "La documentación forma parte de la superficie del producto. Cubre los adaptadores, el core, los patrones de personalización y la preparación de releases.",
    docsEyebrow: "Docs",
    docsHeading: "Instalación, personalización y release flow",
    heroBody:
      "`Cmd+kit` te da un motor de comandos agnóstico al framework, adaptadores oficiales, navegación anidada, recientes y un playground que exporta código real en vez de snippets decorativos.",
    heroCta: "Abrir playground",
    heroDocsCta: "Ir a la documentación",
    heroHeading: "Haz que tu command palette se sienta nativa.",
    heroKicker: "Motor headless. Adaptadores oficiales. UI orientada a producción.",
    heroProofAdapterBody: "React, Vue, Preact, Astro islands y uso vanilla en navegador",
    heroProofAdapterLabel: "Adaptadores",
    heroProofCoreBody: "Búsqueda, agrupación, ejecución y recientes sin acoplarse a la UI",
    heroProofCoreLabel: "Core",
    heroStageActiveShortcut: "G D",
    heroStageActiveSubtitle: "Salta a la vista principal del workspace",
    heroStageActiveTitle: "Abrir dashboard",
    heroStageInactiveShortcut: "Enter",
    heroStageInactiveSubtitle: "Sección anidada con comandos por contexto",
    heroStageInactiveTitle: "Buscar docs",
    heroStageLabel: "Comandos del proyecto",
    heroStageNote:
      "Astro para el shell. Islas interactivas solo donde el producto necesita estado real.",
    heroStageRecentLabel: "Recientes",
    heroStageSearchPlaceholder: "Busca comandos, páginas y acciones...",
    heroStageShortcut: "Cmd / Ctrl + K",
    heroStageSurface: "React first",
    heroStageSurfaceMuted: "mod+k",
    heroTerminalLabel: "terminal",
    heroTerminalTitle: "cmd-kit",
    installCommands: ["npm install @cmd-kit/react", "npm install @cmd-kit/core"],
    installDescription:
      "Empieza por el adaptador que te haga lanzar antes y baja al core cuando necesites control total.",
    installEyebrow: "Instalación",
    installHeading: "Paquetes npm",
    metaDescription:
      "Toolkit open source de command palette con core agnóstico al framework, adaptadores oficiales y configurador en vivo.",
    metricOutputLabel: "Salida",
    metricOutputValue: "React, Vue, Preact, CSS, Tailwind, JSON",
    metricSurfaceLabel: "Superficie",
    metricSurfaceValue: "Headless + styled",
    overviewLargeBody:
      "`Cmd+kit` mantiene el motor portable y tipado mientras deja a los equipos lanzar una UI por defecto útil o sustituirla sin pelearse con las tripas del sistema.",
    overviewLargeEyebrow: "Por qué existe",
    overviewLargeHeading:
      "La mayoría de command palettes te obligan a elegir entre velocidad de entrega y control de la superficie.",
    overviewReactBody:
      "Usa la UI por defecto, sobreescribe renderers o trata el hook como la frontera de integración de tu propia capa de comandos.",
    overviewReactEyebrow: "React",
    overviewReactHeading: "Superficie componible",
    overviewSearchBody:
      "Matching rápido, secciones agrupadas, páginas anidadas y recientes sin meter código de framework en el core.",
    overviewSearchEyebrow: "Búsqueda",
    overviewSearchHeading: "Fuzzy por defecto",
    playgroundAriaLabel: "Tecnologías soportadas",
    playgroundCta: "Abrir playground",
    playgroundDescription:
      "El configurador vive ahora en su propia página para que el editor, la preview y el código generado aprovechen todo el ancho y mantengan una jerarquía limpia.",
    playgroundEyebrow: "Playground",
    playgroundHeading: "Un workspace dedicado para dar forma a toda la superficie del comando",
    techAdapters: "Flujos anidados",
    techCore: "Core tipado",
    techNestedFlows: "Flujos anidados",
    techReact: "React first",
    technologyNames: ["React", "Vue", "Preact", "Astro", "Vanilla"],
    title: "Cmd+kit"
  }
};

