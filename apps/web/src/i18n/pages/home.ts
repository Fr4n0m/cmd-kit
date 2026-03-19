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
      "Step-by-step docs for installation, adapter choice, theming, rendering overrides, and production rollout decisions.",
    docsEyebrow: "Docs",
    docsHeading: "Implementation guides that match the real API",
    heroBody:
      "Cmd+kit gives you a framework-agnostic command engine, official adapters, nested navigation, recent commands, and a playground that exports real code instead of static design snippets.",
    heroCta: "Open the playground",
    heroDocsCta: "Start with docs",
    heroHeading: "Make your command palette feel native.",
    heroKicker: "Headless engine. Official adapters. Production-oriented UI.",
    heroProofAdapterBody: "React, Vue, Preact, Astro islands and vanilla browser",
    heroProofAdapterLabel: "Adapters",
    heroProofCoreBody: "Framework-agnostic search, grouping, execution, recents",
    heroProofCoreLabel: "Core",
    heroStackCardTitle: "Compatibility",
    heroStageActiveShortcut: "G D",
    heroStageActiveSubtitle: "Jump into the workspace overview",
    heroStageActiveTitle: "Open dashboard",
    heroStageInactiveShortcut: "Enter",
    heroStageInactiveSubtitle: "Nested section with scoped commands",
    heroStageInactiveTitle: "Search docs",
    heroStageLabel: "Cmd+kit",
    heroStageNote:
      "Use Cmd / Ctrl + K to open it, search commands, and navigate nested sections in real time.",
    heroStageRecentLabel: "Recent",
    heroStageSearchPlaceholder: "Search commands, pages, and actions...",
    heroStageShortcut: "Cmd / Ctrl + K",
    heroStageSurface: "React first",
    heroStageSurfaceMuted: "mod+k",
    heroTerminalLabel: "terminal",
    heroTerminalTitle: "cmd-kit",
    installCommands: ["npm install @cmd-kit/react", "npm install @cmd-kit/core"],
    installDescription:
      "Start from one adapter and keep the core as your escape hatch. No framework lock-in, no migration rewrite later.",
    installEyebrow: "Install",
    installHeading: "Minimal setup, production-ready path",
    metaDescription:
      "Open source command palette toolkit with a framework-agnostic core, React bindings, and a live configurator.",
    metricOutputLabel: "Output",
    metricOutputValue: "React, Vue, Preact, CSS, Tailwind, JSON",
    metricSurfaceLabel: "Architecture",
    metricSurfaceValue: "Headless engine + UI adapters",
    overviewLargeBody:
      "Cmd+kit separates engine and presentation so teams can ship quickly with the default UI and move to custom surfaces without rebuilding command logic.",
    overviewLargeEyebrow: "Why it exists",
    overviewLargeHeading:
      "Most command palettes force a trade-off between shipping fast and keeping interface control.",
    overviewReactBody:
      "Ship with the packaged component first, then move to custom rendering while keeping the same command model and execution flow.",
    overviewReactEyebrow: "React",
    overviewReactHeading: "Composable integration surface",
    overviewSearchBody:
      "Fuzzy matching, grouped results, nested navigation, and recents live in the engine and stay consistent across all adapters.",
    overviewSearchEyebrow: "Search",
    overviewSearchHeading: "Search behavior that scales with content",
    playgroundAriaLabel: "Supported technologies",
    playgroundCta: "Open playground",
    playgroundDescription:
      "Design command UX, validate behavior in live preview, and export a clean starter your team can adapt to real product constraints.",
    playgroundEyebrow: "Playground",
    playgroundHeading: "A dedicated workspace for shaping command UX",
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
      "Guías paso a paso para instalación, elección de adaptador, tematización, overrides de render y decisiones de integración en producción.",
    docsEyebrow: "Docs",
    docsHeading: "Guías de implementación alineadas con la API real",
    heroBody:
      "Cmd+kit te da un motor de comandos agnóstico al framework, adaptadores oficiales, navegación anidada, recientes y un playground que exporta código real en vez de snippets decorativos.",
    heroCta: "Abrir playground",
    heroDocsCta: "Ir a la documentación",
    heroHeading: "Haz que tu command palette se sienta nativa.",
    heroKicker: "Motor headless. Adaptadores oficiales. UI orientada a producción.",
    heroProofAdapterBody: "React, Vue, Preact, Astro islands y uso vanilla en navegador",
    heroProofAdapterLabel: "Adaptadores",
    heroProofCoreBody: "Búsqueda, agrupación, ejecución y recientes sin acoplarse a la UI",
    heroProofCoreLabel: "Core",
    heroStackCardTitle: "Compatibilidad",
    heroStageActiveShortcut: "G D",
    heroStageActiveSubtitle: "Salta a la vista principal del workspace",
    heroStageActiveTitle: "Abrir dashboard",
    heroStageInactiveShortcut: "Enter",
    heroStageInactiveSubtitle: "Sección anidada con comandos por contexto",
    heroStageInactiveTitle: "Buscar docs",
    heroStageLabel: "Cmd+kit",
    heroStageNote:
      "Usa Cmd / Ctrl + K para abrirla, buscar comandos y navegar secciones anidadas en tiempo real.",
    heroStageRecentLabel: "Recientes",
    heroStageSearchPlaceholder: "Busca comandos, páginas y acciones...",
    heroStageShortcut: "Cmd / Ctrl + K",
    heroStageSurface: "React first",
    heroStageSurfaceMuted: "mod+k",
    heroTerminalLabel: "terminal",
    heroTerminalTitle: "cmd-kit",
    installCommands: ["npm install @cmd-kit/react", "npm install @cmd-kit/core"],
    installDescription:
      "Empieza por un adaptador y deja el core como vía de salida. Sin bloqueo por framework ni migraciones traumáticas después.",
    installEyebrow: "Instalación",
    installHeading: "Setup mínimo con camino a producción",
    metaDescription:
      "Toolkit open source de command palette con core agnóstico al framework, adaptadores oficiales y configurador en vivo.",
    metricOutputLabel: "Salida",
    metricOutputValue: "React, Vue, Preact, CSS, Tailwind, JSON",
    metricSurfaceLabel: "Arquitectura",
    metricSurfaceValue: "Motor headless + adaptadores UI",
    overviewLargeBody:
      "Cmd+kit separa motor y presentación para que puedas lanzar rápido con la UI por defecto y pasar a superficies custom sin rehacer la lógica de comandos.",
    overviewLargeEyebrow: "Por qué existe",
    overviewLargeHeading:
      "La mayoría de command palettes te obligan a elegir entre velocidad de entrega y control real de interfaz.",
    overviewReactBody:
      "Arranca con el componente empaquetado y evoluciona a render custom manteniendo el mismo modelo de comandos y flujo de ejecución.",
    overviewReactEyebrow: "React",
    overviewReactHeading: "Superficie de integración componible",
    overviewSearchBody:
      "Matching fuzzy, resultados agrupados, navegación anidada y recientes viven en el motor y se reutilizan igual en todos los adaptadores.",
    overviewSearchEyebrow: "Búsqueda",
    overviewSearchHeading: "Búsqueda diseñada para escalar contenido",
    playgroundAriaLabel: "Tecnologías soportadas",
    playgroundCta: "Abrir playground",
    playgroundDescription:
      "Diseña el UX del comando, valida el comportamiento en preview viva y exporta una base limpia adaptada a restricciones reales de producto.",
    playgroundEyebrow: "Playground",
    playgroundHeading: "Un workspace dedicado para diseñar el UX del comando",
    techAdapters: "Flujos anidados",
    techCore: "Core tipado",
    techNestedFlows: "Flujos anidados",
    techReact: "React first",
    technologyNames: ["React", "Vue", "Preact", "Astro", "Vanilla"],
    title: "Cmd+kit"
  }
};

