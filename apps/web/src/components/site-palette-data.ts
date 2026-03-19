import type { CommandSection } from "@cmd-kit/react";

export interface SitePaletteHrefs {
  customizationHref: string;
  docsAstroHref: string;
  docsCoreHref: string;
  docsGettingStartedHref: string;
  docsPlaygroundHref: string;
  docsPreactHref: string;
  docsReactHref: string;
  docsVueHref: string;
  homeHref: string;
  legalPrivacyHref: string;
  legalTermsHref: string;
  playgroundHref: string;
}

export function buildSitePaletteSections(
  locale: "en" | "es",
  hrefs: SitePaletteHrefs
): CommandSection[] {
  const isEs = locale === "es";

  return [
    {
      id: "navigation",
      title: isEs ? "Navegación" : "Navigation",
      items: [
        {
          id: "go-home",
          title: isEs ? "Inicio" : "Home",
          subtitle: isEs
            ? "Volver a la landing de Cmd+kit"
            : "Go back to Cmd+kit landing",
          href: hrefs.homeHref,
          keywords: isEs
            ? ["home", "landing", "principal", "inicio"]
            : ["home", "landing", "main"]
        },
        {
          id: "open-playground",
          title: isEs ? "Abrir playground" : "Open playground",
          subtitle: isEs
            ? "Configura y prueba comandos en vivo"
            : "Configure and test commands live",
          href: hrefs.playgroundHref,
          keywords: isEs
            ? ["playground", "configurador", "preview", "demo"]
            : ["playground", "configurator", "preview", "demo"]
        },
        {
          id: "open-customization",
          title: isEs ? "Personalización" : "Customization",
          subtitle: isEs
            ? "Ajusta tema, mensajes y renderers"
            : "Tune theme, messages, and renderers",
          href: hrefs.customizationHref,
          keywords: isEs
            ? ["tema", "estilos", "mensajes", "renderers", "personalizacion"]
            : ["theme", "styles", "messages", "renderers", "customization"]
        },
        {
          id: "docs-root",
          title: isEs ? "Documentación" : "Documentation",
          subtitle: isEs ? "Navega por todas las guías" : "Browse all guides",
          children: [
            {
              id: "docs-sections",
              title: isEs ? "Documentación" : "Documentation",
              items: [
                {
                  id: "docs-getting-started",
                  title: isEs ? "Primeros pasos" : "Getting started",
                  subtitle: isEs
                    ? "Instalación y primer setup"
                    : "Install and first setup",
                  href: hrefs.docsGettingStartedHref,
                  icon: "🚀"
                },
                {
                  id: "docs-react",
                  title: isEs ? "React docs" : "React docs",
                  subtitle: isEs
                    ? "Componente lista para React y control programático"
                    : "Ready React component with programmatic control",
                  href: hrefs.docsReactHref,
                  icon: "⚛"
                },
                {
                  id: "docs-vue",
                  title: isEs ? "Vue docs" : "Vue docs",
                  subtitle: isEs
                    ? "Integración con slots y composición nativa de Vue"
                    : "Integration with slots and native Vue composition",
                  href: hrefs.docsVueHref,
                  icon: "🟢"
                },
                {
                  id: "docs-preact",
                  title: isEs ? "Preact docs" : "Preact docs",
                  subtitle: isEs
                    ? "API parecida a React con runtime más ligero"
                    : "React-like API with a lighter runtime",
                  href: hrefs.docsPreactHref,
                  icon: "🔷"
                },
                {
                  id: "docs-astro",
                  title: isEs ? "Astro docs" : "Astro docs",
                  subtitle: isEs
                    ? "Integración en islas para proyectos Astro"
                    : "Island-based integration for Astro projects",
                  href: hrefs.docsAstroHref,
                  icon: "🪐"
                },
                {
                  id: "docs-core",
                  title: isEs ? "Core docs" : "Core docs",
                  subtitle: isEs
                    ? "Motor headless para construir tu propia UI"
                    : "Headless engine to build your own UI",
                  href: hrefs.docsCoreHref,
                  icon: "⚙"
                },
                {
                  id: "docs-playground",
                  title: isEs ? "Playground docs" : "Playground docs",
                  subtitle: isEs
                    ? "Guía para configurar y exportar snippets base"
                    : "Guide to configure and export starter snippets",
                  href: hrefs.docsPlaygroundHref,
                  icon: "🧪"
                }
              ]
            }
          ],
          keywords: isEs
            ? ["docs", "guias", "api", "documentacion"]
            : ["docs", "guides", "api", "documentation"]
        },
        {
          id: "legal-root",
          title: isEs ? "Legal y privacidad" : "Legal and privacy",
          subtitle: isEs
            ? "Términos y política de privacidad"
            : "Terms and privacy policy",
          children: [
            {
              id: "legal-sections",
              title: "Legal",
              items: [
                {
                  id: "legal-privacy",
                  title: isEs ? "Privacidad" : "Privacy",
                  subtitle: isEs
                    ? "Qué datos se usan y cómo se protegen"
                    : "What data is used and how it is protected",
                  href: hrefs.legalPrivacyHref,
                  icon: "🔒"
                },
                {
                  id: "legal-terms",
                  title: isEs ? "Términos" : "Terms",
                  subtitle: isEs
                    ? "Condiciones de uso y límites del servicio"
                    : "Usage conditions and service limitations",
                  href: hrefs.legalTermsHref,
                  icon: "⚖"
                }
              ]
            }
          ],
          keywords: isEs
            ? ["legal", "privacidad", "terminos", "cookies"]
            : ["legal", "privacy", "terms", "cookies"]
        }
      ]
    }
  ];
}
