import type { LegalPageCopy } from "@/i18n/pages/shared";

export const legalPrivacyEs: LegalPageCopy = {
  description: "Política de privacidad de Cmd+kit.",
  eyebrow: "Legal",
  heading: "Política de Privacidad",
  lastUpdatedLabel: "Última actualización",
  lastUpdatedValue: "16 de abril de 2026",
  sections: [
    {
      id: "responsable",
      title: "Responsable del tratamiento",
      paragraphs: [
        "Responsable: <code>Fr4n0m</code> (titular del proyecto y del sitio web de Cmd+kit).",
        "Contacto de privacidad y uso del sitio: <code>fran11799@outlook.com</code>."
      ]
    },
    {
      id: "datos-tratados",
      title: "Qué datos tratamos",
      paragraphs: ["En el estado actual del sitio, tratamos el mínimo de información técnica necesaria para que la web funcione correctamente."],
      items: [
        "<strong>Datos técnicos básicos:</strong> información de conexión y logs técnicos de infraestructura (por ejemplo, IP, agente de usuario o trazas de error), gestionados por el proveedor de hosting/CDN para seguridad y operación.",
        "<strong>Preferencias locales:</strong> guardamos la preferencia de tema claro/oscuro en <code>localStorage</code> del navegador (<code>cmd-kit-theme</code>).",
        "<strong>No hay cuentas de usuario:</strong> actualmente no existe registro/login ni área privada.",
        "<strong>No hay formularios activos:</strong> el sitio no recoge formularios de contacto o soporte en este momento."
      ]
    },
    {
      id: "finalidades-base",
      title: "Finalidades y base jurídica",
      paragraphs: ["Usamos esta información para:"],
      items: [
        "prestar el sitio y su documentación pública;",
        "mantener seguridad, estabilidad y diagnóstico técnico;",
        "recordar preferencias de interfaz del usuario.",
        "La base jurídica aplicable puede ser el interés legítimo (seguridad/operación), la ejecución de medidas precontractuales o el consentimiento cuando corresponda."
      ]
    },
    {
      id: "cookies-almacenamiento",
      title: "Cookies y almacenamiento local",
      paragraphs: [
        "Cmd+kit no instala cookies de marketing ni de perfilado desde código propio.",
        "El sitio utiliza almacenamiento local del navegador para recordar preferencias de interfaz (tema).",
        "El proveedor de infraestructura podría establecer cookies estrictamente técnicas necesarias para entrega/seguridad del servicio."
      ]
    },
    {
      id: "terceros",
      title: "Proveedores y enlaces de terceros",
      paragraphs: [
        "El sitio puede apoyarse en proveedores técnicos de infraestructura (hosting, CDN, seguridad y repositorio de código).",
        "Además, incluye enlaces externos (por ejemplo, GitHub, Buy Me a Coffee o portfolio). Al salir de este sitio, aplica la política de privacidad del tercero correspondiente."
      ]
    },
    {
      id: "conservacion",
      title: "Conservación de datos",
      paragraphs: [
        "La información técnica se conserva únicamente durante el tiempo necesario para operación, seguridad, diagnóstico y cumplimiento legal aplicable."
      ]
    },
    {
      id: "derechos",
      title: "Tus derechos",
      paragraphs: [
        "Cuando resulte aplicable conforme a la normativa de protección de datos, puedes solicitar:"
      ],
      items: [
        "acceso a tus datos;",
        "rectificación de datos inexactos;",
        "supresión;",
        "limitación u oposición al tratamiento;",
        "portabilidad;",
        "presentar reclamación ante la autoridad de control competente."
      ]
    },
    {
      id: "cambios",
      title: "Cambios en esta política",
      paragraphs: [
        "Podemos actualizar esta política para reflejar cambios legales, técnicos o funcionales del sitio. Publicaremos aquí la versión vigente con su fecha de actualización."
      ]
    }
  ],
  title: "Cmd+kit | Política de Privacidad"
};

