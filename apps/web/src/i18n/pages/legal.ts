import type { LegalPageCopy } from "./shared";
import type { Locale } from "../site";

export const legalPages: Record<Locale, Record<"privacy" | "terms", LegalPageCopy>> = {
  en: {
    privacy: {
      description: "Privacy information for the Cmd+kit site.",
      eyebrow: "Legal",
      heading: "Privacy",
      paragraphs: [
        "Controller: `Code by Fran` (project and site owner). Public contact channel: `https://codebyfran.es`.",
        "This site provides public information, documentation, and interactive examples for `Cmd+kit`. It does not provide user accounts or a private application area.",
        "Current status: this site does not use analytics tools and does not use non-essential cookies. Only technical behavior required for normal site operation may be used.",
        "If analytics, contact forms, or additional third-party integrations are enabled in the future, this policy will be updated with collected data categories, processing purpose, retention period, and rights request process.",
        "External links (for example GitHub, Buy Me a Coffee, or personal portfolio pages) are governed by their own privacy policies once you leave this site."
      ],
      title: "Cmd+kit | Privacy"
    },
    terms: {
      description: "Terms information for the Cmd+kit site.",
      eyebrow: "Legal",
      heading: "Terms",
      paragraphs: [
        "Service owner: `Code by Fran`. Public contact: `https://codebyfran.es`.",
        "`Cmd+kit` is presented here as an open source project. Code usage, redistribution, and contribution rules should follow the repository license and contribution guidelines once they are published in the project root.",
        "The content on this site is provided for documentation, reference, and public presentation purposes. You should evaluate the package in your own environment before relying on it in production.",
        "External services linked from this site are operated independently and may apply their own terms of service.",
        "Applicable law and jurisdiction: Spain."
      ],
      title: "Cmd+kit | Terms"
    }
  },
  es: {
    privacy: {
      description: "Información de privacidad del sitio de Cmd+kit.",
      eyebrow: "Legal",
      heading: "Privacidad",
      paragraphs: [
        "Responsable: `Code by Fran` (titular del proyecto y del sitio). Canal de contacto público: `https://codebyfran.es`.",
        "Este sitio ofrece información pública, documentación y ejemplos interactivos de `Cmd+kit`. No ofrece cuentas de usuario ni un área privada de aplicación.",
        "Estado actual: este sitio no usa herramientas de analítica ni cookies no esenciales. Solo puede usar comportamiento técnico necesario para el funcionamiento normal de la web.",
        "Si en el futuro se activan analítica, formularios de contacto u otras integraciones de terceros, esta política se actualizará con las categorías de datos tratadas, finalidad, conservación y proceso de ejercicio de derechos.",
        "Los enlaces externos (por ejemplo GitHub, Buy Me a Coffee o páginas de portfolio personal) se rigen por sus propias políticas cuando abandonas este sitio."
      ],
      title: "Cmd+kit | Privacidad"
    },
    terms: {
      description: "Información legal del sitio de Cmd+kit.",
      eyebrow: "Legal",
      heading: "Términos",
      paragraphs: [
        "Titular del servicio: `Code by Fran`. Contacto público: `https://codebyfran.es`.",
        "`Cmd+kit` se presenta aquí como un proyecto open source. Las condiciones de uso, redistribución y contribución del código deben regirse por la licencia del repositorio y por sus guías de contribución cuando estén publicadas en la raíz del proyecto.",
        "El contenido de este sitio se ofrece con fines de documentación, referencia y presentación pública. Debes validar el paquete en tu propio entorno antes de adoptarlo en producción.",
        "Los servicios externos enlazados desde esta web se operan de forma independiente y pueden aplicar sus propios términos de uso.",
        "Ley aplicable y jurisdicción: España."
      ],
      title: "Cmd+kit | Términos"
    }
  }
};

