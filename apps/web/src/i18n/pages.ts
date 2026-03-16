import type { Locale } from "./site";

export interface HomePageCopy {
  badge: string;
  customizationCta: string;
  description: string;
  docsCta: string;
  docsDescription: string;
  docsEyebrow: string;
  docsHeading: string;
  heroBody: string;
  heroCta: string;
  heroDocsCta: string;
  heroHeading: string;
  heroKicker: string;
  heroProofAdapterBody: string;
  heroProofAdapterLabel: string;
  heroProofCoreBody: string;
  heroProofCoreLabel: string;
  heroStageActiveShortcut: string;
  heroStageActiveSubtitle: string;
  heroStageActiveTitle: string;
  heroStageInactiveShortcut: string;
  heroStageInactiveSubtitle: string;
  heroStageInactiveTitle: string;
  heroStageLabel: string;
  heroStageNote: string;
  heroStageRecentLabel: string;
  heroStageSearchPlaceholder: string;
  heroStageShortcut: string;
  heroStageSurface: string;
  heroStageSurfaceMuted: string;
  heroTerminalLabel: string;
  heroTerminalTitle: string;
  installCommands: string[];
  installDescription: string;
  installEyebrow: string;
  installHeading: string;
  metaDescription: string;
  metricOutputLabel: string;
  metricOutputValue: string;
  metricSurfaceLabel: string;
  metricSurfaceValue: string;
  overviewLargeBody: string;
  overviewLargeEyebrow: string;
  overviewLargeHeading: string;
  overviewReactBody: string;
  overviewReactEyebrow: string;
  overviewReactHeading: string;
  overviewSearchBody: string;
  overviewSearchEyebrow: string;
  overviewSearchHeading: string;
  playgroundAriaLabel: string;
  playgroundCta: string;
  playgroundDescription: string;
  playgroundEyebrow: string;
  playgroundHeading: string;
  techAdapters: string;
  techCore: string;
  techNestedFlows: string;
  techReact: string;
  technologyNames: string[];
  title: string;
}

export interface PlaygroundPageCopy {
  badge: string;
  description: string;
  heading: string;
  metaDescription: string;
  metricCoverageLabel: string;
  metricCoverageValue: string;
  metricExportsLabel: string;
  metricExportsValue: string;
  stackAriaLabel: string;
  stackCss: string;
  stackNames: string[];
  title: string;
}

export interface LegalPageCopy {
  description: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  title: string;
}

const homePages: Record<Locale, HomePageCopy> = {
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

const playgroundPages: Record<Locale, PlaygroundPageCopy> = {
  en: {
    badge: "Configurator",
    description:
      "Edit structure, theme, nested commands, messages, and exports with room to think. The preview stays interactive while the generated code tracks every change in real time.",
    heading:
      "Work in a dedicated playground that behaves more like a tool than a landing page.",
    metaDescription:
      "Dedicated playground for shaping the command palette, tuning sections and theme, and exporting real code.",
    metricCoverageLabel: "Coverage",
    metricCoverageValue: "Theme, messages, recents, nested commands, async source",
    metricExportsLabel: "Exports",
    metricExportsValue: "React, Vue, Preact, Vanilla, Tailwind, CSS, JSON",
    stackAriaLabel: "Playground stack",
    stackCss: "CSS / Tailwind",
    stackNames: ["React", "Vue", "Preact", "Astro"],
    title: "Cmd+kit | Playground"
  },
  es: {
    badge: "Configurador",
    description:
      "Edita estructura, tema, comandos anidados, mensajes y exports con espacio real para pensar. La preview sigue viva mientras el código generado refleja cada cambio.",
    heading:
      "Trabaja en un playground dedicado que se comporte más como una herramienta que como una landing.",
    metaDescription:
      "Playground dedicado para construir la command palette, ajustar secciones y tema, y exportar código real.",
    metricCoverageLabel: "Cobertura",
    metricCoverageValue: "Tema, mensajes, recientes, comandos anidados y source async",
    metricExportsLabel: "Exports",
    metricExportsValue: "React, Vue, Preact, Vanilla, Tailwind, CSS, JSON",
    stackAriaLabel: "Stack del playground",
    stackCss: "CSS / Tailwind",
    stackNames: ["React", "Vue", "Preact", "Astro"],
    title: "Cmd+kit | Playground"
  }
};

const legalPages: Record<
  Locale,
  Record<"privacy" | "terms", LegalPageCopy>
> = {
  en: {
    privacy: {
      description: "Privacy information for the Cmd+kit website.",
      eyebrow: "Legal",
      heading: "Privacy",
      paragraphs: [
        "This website is a product and documentation site for `Cmd+kit`. It does not provide user accounts or a private application area.",
        "If analytics, contact forms, or third-party integrations are added later, this page should be updated with the exact data collected, purpose of processing, retention period, and contact details for data requests.",
        "External links such as GitHub, Buy Me a Coffee, and Code by Fran are governed by their own privacy policies once you leave this site."
      ],
      title: "Cmd+kit | Privacy"
    },
    terms: {
      description: "Terms information for the Cmd+kit website.",
      eyebrow: "Legal",
      heading: "Terms",
      paragraphs: [
        "`Cmd+kit` is presented here as an open source project. Code usage, redistribution, and contribution rules should follow the repository license and contribution guidelines once they are published in the project root.",
        "The website content is provided for documentation and product presentation purposes. You should evaluate the package in your own environment before relying on it in production.",
        "External services linked from this site are operated independently and may apply their own terms of service."
      ],
      title: "Cmd+kit | Terms"
    }
  },
  es: {
    privacy: {
      description: "Información de privacidad del sitio web de Cmd+kit.",
      eyebrow: "Legal",
      heading: "Privacidad",
      paragraphs: [
        "Este sitio web es una web de producto y documentación para `Cmd+kit`. No ofrece cuentas de usuario ni un área privada de aplicación.",
        "Si en el futuro se añaden analítica, formularios de contacto o integraciones de terceros, esta página deberá actualizarse con el detalle exacto de los datos recogidos, su finalidad, el periodo de conservación y la información de contacto correspondiente.",
        "Los enlaces externos como GitHub, Buy Me a Coffee o Code by Fran se rigen por sus propias políticas una vez sales de este sitio."
      ],
      title: "Cmd+kit | Privacidad"
    },
    terms: {
      description: "Información legal del sitio web de Cmd+kit.",
      eyebrow: "Legal",
      heading: "Términos",
      paragraphs: [
        "`Cmd+kit` se presenta aquí como un proyecto open source. Las condiciones de uso, redistribución y contribución del código deben regirse por la licencia del repositorio y por sus guías de contribución cuando estén publicadas en la raíz del proyecto.",
        "El contenido de esta web se ofrece con fines de documentación y presentación del producto. Debes validar el paquete en tu propio entorno antes de adoptarlo en producción.",
        "Los servicios externos enlazados desde esta web se operan de forma independiente y pueden aplicar sus propios términos de uso."
      ],
      title: "Cmd+kit | Términos"
    }
  }
};

export function getHomePage(locale: Locale) {
  return homePages[locale];
}

export function getPlaygroundPage(locale: Locale) {
  return playgroundPages[locale];
}

export function getLegalPage(locale: Locale, slug: "privacy" | "terms") {
  return legalPages[locale][slug];
}
