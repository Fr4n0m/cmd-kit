import type { CommandSection } from "@cmd-kit/core";

import {
  BRAND_CORE_ICON,
  CUSTOMIZATION_ICON,
  DOCUMENTS_ICON,
  HOME_ICON,
  LEGAL_ICON,
  PLAYGROUND_ICON
} from "./site-palette-icons";
import { renderTablerIcon } from "./icons/tabler";

const GETTING_STARTED_ICON = renderTablerIcon("checklist");
const REACT_ICON = renderTablerIcon("brand-react");
const VUE_ICON = renderTablerIcon("brand-vue");
const PREACT_ICON = renderTablerIcon("atom-2");
const ASTRO_ICON = renderTablerIcon("brand-astro");
const PRIVACY_ICON = renderTablerIcon("file-text-shield");
const TERMS_ICON = renderTablerIcon("file-certificate");

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
          icon: HOME_ICON,
          shortcut: "mod+shift+h",
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
          icon: PLAYGROUND_ICON,
          shortcut: "mod+shift+p",
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
          icon: CUSTOMIZATION_ICON,
          shortcut: "mod+shift+u",
          href: hrefs.customizationHref,
          keywords: isEs
            ? ["tema", "estilos", "mensajes", "renderers", "personalizacion"]
            : ["theme", "styles", "messages", "renderers", "customization"]
        },
        {
          id: "docs-root",
          title: isEs ? "Documentación" : "Documentation",
          subtitle: isEs ? "Navega por todas las guías" : "Browse all guides",
          icon: DOCUMENTS_ICON,
          shortcut: "mod+shift+d",
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
                  shortcut: "mod+shift+1",
                  href: hrefs.docsGettingStartedHref,
                  icon: GETTING_STARTED_ICON
                },
                {
                  id: "docs-react",
                  title: isEs ? "React docs" : "React docs",
                  subtitle: isEs
                    ? "Componente lista para React y control programático"
                    : "Ready React component with programmatic control",
                  shortcut: "mod+shift+r",
                  href: hrefs.docsReactHref,
                  icon: REACT_ICON
                },
                {
                  id: "docs-vue",
                  title: isEs ? "Vue docs" : "Vue docs",
                  subtitle: isEs
                    ? "Integración con slots y composición nativa de Vue"
                    : "Integration with slots and native Vue composition",
                  shortcut: "mod+shift+v",
                  href: hrefs.docsVueHref,
                  icon: VUE_ICON
                },
                {
                  id: "docs-preact",
                  title: isEs ? "Preact docs" : "Preact docs",
                  subtitle: isEs
                    ? "API parecida a React con runtime más ligero"
                    : "React-like API with a lighter runtime",
                  shortcut: "mod+shift+e",
                  href: hrefs.docsPreactHref,
                  icon: PREACT_ICON
                },
                {
                  id: "docs-astro",
                  title: isEs ? "Astro docs" : "Astro docs",
                  subtitle: isEs
                    ? "Integración en islas para proyectos Astro"
                    : "Island-based integration for Astro projects",
                  shortcut: "mod+shift+a",
                  href: hrefs.docsAstroHref,
                  icon: ASTRO_ICON
                },
                {
                  id: "docs-core",
                  title: isEs ? "Core docs" : "Core docs",
                  subtitle: isEs
                    ? "Motor headless para construir tu propia UI"
                    : "Headless engine to build your own UI",
                  shortcut: "mod+shift+c",
                  href: hrefs.docsCoreHref,
                  icon: BRAND_CORE_ICON
                },
                {
                  id: "docs-playground",
                  title: isEs ? "Playground docs" : "Playground docs",
                  subtitle: isEs
                    ? "Guía para configurar y exportar snippets base"
                    : "Guide to configure and export starter snippets",
                  shortcut: "mod+shift+g",
                  href: hrefs.docsPlaygroundHref,
                  icon: PLAYGROUND_ICON
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
          icon: LEGAL_ICON,
          shortcut: "mod+shift+l",
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
                  shortcut: "mod+shift+i",
                  href: hrefs.legalPrivacyHref,
                  icon: PRIVACY_ICON
                },
                {
                  id: "legal-terms",
                  title: isEs ? "Términos" : "Terms",
                  subtitle: isEs
                    ? "Condiciones de uso y límites del servicio"
                    : "Usage conditions and service limitations",
                  shortcut: "mod+shift+t",
                  href: hrefs.legalTermsHref,
                  icon: TERMS_ICON
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

