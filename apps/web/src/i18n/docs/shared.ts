export type DocSlug =
  | "getting-started"
  | "react"
  | "vue"
  | "preact"
  | "astro"
  | "core"
  | "customization"
  | "playground";

export interface DocsNavItem {
  href: string;
  label: string;
}

export interface DocsSectionItem {
  id: string;
  label: string;
}

export type DocBlock =
  | { type: "paragraph"; html: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; lang: string; label?: string }
  | {
      type: "install-selector";
      adapter?: "astro" | "core" | "preact" | "react" | "vue";
      showAdapter?: boolean;
      showLink?: boolean;
    };

export interface DocSection {
  blocks: DocBlock[];
  id: string;
  label: string;
}

export interface DocPageData {
  description: string;
  eyebrow: string;
  heading: string;
  intro: string[];
  navLabel: string;
  sections: DocSection[];
  slug: DocSlug;
  title: string;
}

export interface InstallSelectorCopy {
  codeLabel: string;
  installerLabel: string;
  packageHint: string;
  techLabel: string;
  technologies: Record<"astro" | "core" | "preact" | "react" | "vue", string>;
}

export const docsSlugs: DocSlug[] = [
  "getting-started",
  "react",
  "vue",
  "preact",
  "astro",
  "core",
  "customization",
  "playground"
];

