import type { CommandSection } from "@cmd-kit/core";

const HOME_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z"/></svg>`;
const PLAYGROUND_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21v-15l5 -3l5 3v15"></path><path d="M8 21v-7"></path><path d="M3 14h10"></path><path d="M6 10a2 2 0 1 1 4 0"></path><path d="M13 13c6 0 3 8 8 8"></path></svg>`;
const CUSTOMIZATION_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 2a3 3 0 0 1 2.995 2.824l.005 .176a3 3 0 0 1 3 3a6 6 0 0 1 -5.775 5.996l-.225 .004h-4l.15 .005a2 2 0 0 1 1.844 1.838l.006 .157v4a2 2 0 0 1 -1.85 1.995l-.15 .005h-2a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-4a2 2 0 0 1 1.85 -1.995l.15 -.005v-1a1 1 0 0 1 .883 -.993l.117 -.007h5a4 4 0 0 0 4 -4a1 1 0 0 0 -.883 -.993l-.117 -.007l-.005 .176a3 3 0 0 1 -2.819 2.819l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-2a3 3 0 0 1 2.824 -2.995l.176 -.005h10z"/></svg>`;
const DOCUMENTS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm3 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2"></path><path d="M19 7h-4l-.001 -4.001z"></path></svg>`;
const LEGAL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm.002 7a2 2 0 0 0 -1.995 1.85l-.005 .15l.005 .15a2 2 0 0 0 .995 1.581v1.769l.007 .117a1 1 0 0 0 1.993 -.117l.001 -1.768a2 2 0 0 0 -1.001 -3.732z"></path></svg>`;
const PRIVACY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M13 3v4a.997 .997 0 0 0 1 1h4"></path><path d="M11 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v3.5"></path><path d="M8 9h1"></path><path d="M8 12.994l3 0"></path><path d="M8 16.997l2 0"></path><path d="M21 15.994c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5"></path></svg>`;
const TERMS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8"></path><path d="M14 19l2 2l4 -4"></path><path d="M9 8h4"></path><path d="M9 12h2"></path></svg>`;
const GETTING_STARTED_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065"></path><path d="M10 9v6l5 -3l-5 -3"></path></svg>`;
const REACT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102"></path><path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102"></path><path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2"></path><path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2"></path><path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896"></path><path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897"></path><path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732"></path></svg>`;
const VUE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M16.5 4l-4.5 8l-4.5 -8"></path><path d="M3 4l9 16l9 -16"></path></svg>`;
const PREACT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 296" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="m128 0 128 73.9v147.8l-128 73.9L0 221.7V73.9z" fill="currentColor" opacity="0.38"></path><path d="M34.865 220.478c17.016 21.78 71.095 5.185 122.15-34.704 51.055-39.888 80.24-88.345 63.224-110.126-17.017-21.78-71.095-5.184-122.15 34.704-51.055 39.89-80.24 88.346-63.224 110.126Zm7.27-5.68c-5.644-7.222-3.178-21.402 7.573-39.253 11.322-18.797 30.541-39.548 54.06-57.923 23.52-18.375 48.303-32.004 69.281-38.442 19.922-6.113 34.277-5.075 39.92 2.148 5.644 7.223 3.178 21.403-7.573 39.254-11.322 18.797-30.541 39.547-54.06 57.923-23.52 18.375-48.304 32.004-69.281 38.441-19.922 6.114-34.277 5.076-39.92-2.147Z" fill="currentColor"></path><path d="M220.239 220.478c17.017-21.78-12.169-70.237-63.224-110.126C105.96 70.464 51.88 53.868 34.865 75.648c-17.017 21.78 12.169 70.238 63.224 110.126 51.055 39.889 105.133 56.485 122.15 34.704Zm-7.27-5.68c-5.643 7.224-19.998 8.262-39.92 2.148-20.978-6.437-45.761-20.066-69.28-38.441-23.52-18.376-42.74-39.126-54.06-57.923-10.752-17.851-13.218-32.03-7.575-39.254 5.644-7.223 19.999-8.261 39.92-2.148 20.978 6.438 45.762 20.067 69.281 38.442 23.52 18.375 42.739 39.126 54.06 57.923 10.752 17.85 13.218 32.03 7.574 39.254Z" fill="currentColor"></path><path d="M127.552 167.667c10.827 0 19.603-8.777 19.603-19.604 0-10.826-8.776-19.603-19.603-19.603-10.827 0-19.604 8.777-19.604 19.603 0 10.827 8.777 19.604 19.604 19.604Z" fill="currentColor"></path></svg>`;
const ASTRO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14.972 3.483c.163 .196 .247 .46 .413 .987l3.64 11.53a15.5 15.5 0 0 0 -4.352 -1.42l-2.37 -7.723a.31 .31 0 0 0 -.296 -.213a.31 .31 0 0 0 -.295 .214l-2.342 7.718a15.5 15.5 0 0 0 -4.37 1.422l3.657 -11.53c.168 -.527 .251 -.79 .415 -.986c.144 -.172 .331 -.306 .544 -.388c.242 -.094 .527 -.094 1.099 -.094h2.612c.572 0 .858 0 1.1 .094c.213 .082 .4 .217 .545 .39"></path><path d="M9 18c0 1.5 2 3 3 4c1 -1 3 -3 3 -4q -3 1.5 -6 0"></path></svg>`;
const BRAND_ICON = `<svg aria-hidden="true" viewBox="0 0 24 24" width="100%" height="100%" style="display:block"><rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="none" stroke="currentColor" stroke-width="1.8"></rect><text x="12" y="14" text-anchor="middle" fill="currentColor" font-size="7.2" font-weight="700" font-family='Inter, "Segoe UI", system-ui, -apple-system, sans-serif'>Cmd</text></svg>`;

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
                  icon: BRAND_ICON
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
