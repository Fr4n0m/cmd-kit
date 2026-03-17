import type { PlaygroundPageCopy } from "./shared";
import type { Locale } from "../site";

export const playgroundPages: Record<Locale, PlaygroundPageCopy> = {
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

