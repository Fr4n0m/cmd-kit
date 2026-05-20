import type { Locale } from "@/i18n/site";

export type CatalogResource = {
  id: string;
  title: string;
  url: string;
  summary: string;
};

const resourcesByLocale: Record<Locale, CatalogResource[]> = {
  es: [
    {
      id: "resource:playground",
      title: "Playground cmd+kit",
      url: "https://cmd-kit.vercel.app/es/playground",
      summary: "Prueba configuración, comandos y exportes en vivo."
    },
    {
      id: "resource:dev-crate",
      title: "Dev Crate",
      url: "https://dev-crate-kappa.vercel.app/",
      summary: "Repositorio de recursos y utilidades para desarrollo."
    },
    {
      id: "resource:contract-kit",
      title: "Contract Kit",
      url: "https://ngx-contract-kit-docs.vercel.app/",
      summary: "Toolkit para contratos y capa de integración."
    },
    {
      id: "resource:local-tools",
      title: "Local Tools",
      url: "https://local-tools-omega.vercel.app/",
      summary: "Colección de herramientas locales para flujos técnicos."
    },
    {
      id: "resource:github",
      title: "Repositorio GitHub",
      url: "https://github.com/Fr4n0m/cmd-kit",
      summary: "Código fuente, issues y PRs del proyecto."
    }
  ],
  en: [
    {
      id: "resource:playground",
      title: "cmd+kit Playground",
      url: "https://cmd-kit.vercel.app/playground",
      summary: "Try command setup, flows, and exports live."
    },
    {
      id: "resource:dev-crate",
      title: "Dev Crate",
      url: "https://dev-crate-kappa.vercel.app/",
      summary: "Resource hub and utilities for development workflows."
    },
    {
      id: "resource:contract-kit",
      title: "Contract Kit",
      url: "https://ngx-contract-kit-docs.vercel.app/",
      summary: "Toolkit for contracts and integration layers."
    },
    {
      id: "resource:local-tools",
      title: "Local Tools",
      url: "https://local-tools-omega.vercel.app/",
      summary: "Collection of local tools for technical workflows."
    },
    {
      id: "resource:github",
      title: "GitHub Repository",
      url: "https://github.com/Fr4n0m/cmd-kit",
      summary: "Source code, issues, and PRs for the project."
    }
  ]
};

export function getResourcesCatalog(locale: Locale): CatalogResource[] {
  return resourcesByLocale[locale];
}

export function searchResources(query: string, locale: Locale): CatalogResource[] {
  const normalized = query.trim().toLowerCase();
  const items = getResourcesCatalog(locale);
  if (!normalized) return items.slice(0, 12);

  return items
    .filter((item) => {
      const haystack = `${item.id} ${item.title} ${item.summary} ${item.url}`.toLowerCase();
      return haystack.includes(normalized);
    })
    .slice(0, 20);
}
