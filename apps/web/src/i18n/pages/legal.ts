import type { LegalPageCopy } from "./shared";
import type { Locale } from "../site";

export const legalPages: Record<Locale, Record<"privacy" | "terms", LegalPageCopy>> = {
  en: {
    privacy: {
      description: "Privacy information for the Cmd+kit site.",
      eyebrow: "Legal",
      heading: "Privacy",
      paragraphs: [
        "This site provides public information, documentation, and interactive examples for `Cmd+kit`. It does not provide user accounts or a private application area.",
        "If analytics, contact forms, or third-party integrations are added later, this page should be updated with the exact data collected, purpose of processing, retention period, and contact details for data requests.",
        "External links such as GitHub, Buy Me a Coffee, and Code by Fran are governed by their own privacy policies once you leave this site."
      ],
      title: "Cmd+kit | Privacy"
    },
    terms: {
      description: "Terms information for the Cmd+kit site.",
      eyebrow: "Legal",
      heading: "Terms",
      paragraphs: [
        "`Cmd+kit` is presented here as an open source project. Code usage, redistribution, and contribution rules should follow the repository license and contribution guidelines once they are published in the project root.",
        "The content on this site is provided for documentation, reference, and public presentation purposes. You should evaluate the package in your own environment before relying on it in production.",
        "External services linked from this site are operated independently and may apply their own terms of service."
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
        "Este sitio ofrece información pública, documentación y ejemplos interactivos de `Cmd+kit`. No ofrece cuentas de usuario ni un área privada de aplicación.",
        "Si en el futuro se añaden analítica, formularios de contacto o integraciones de terceros, esta página deberá actualizarse con el detalle exacto de los datos recogidos, su finalidad, el periodo de conservación y la información de contacto correspondiente.",
        "Los enlaces externos como GitHub, Buy Me a Coffee o Code by Fran se rigen por sus propias políticas una vez sales de este sitio."
      ],
      title: "Cmd+kit | Privacidad"
    },
    terms: {
      description: "Información legal del sitio de Cmd+kit.",
      eyebrow: "Legal",
      heading: "Términos",
      paragraphs: [
        "`Cmd+kit` se presenta aquí como un proyecto open source. Las condiciones de uso, redistribución y contribución del código deben regirse por la licencia del repositorio y por sus guías de contribución cuando estén publicadas en la raíz del proyecto.",
        "El contenido de este sitio se ofrece con fines de documentación, referencia y presentación pública. Debes validar el paquete en tu propio entorno antes de adoptarlo en producción.",
        "Los servicios externos enlazados desde esta web se operan de forma independiente y pueden aplicar sus propios términos de uso."
      ],
      title: "Cmd+kit | Términos"
    }
  }
};

