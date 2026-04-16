import type { DocPageData } from "@/i18n/docs/shared";

export const playgroundESDoc: DocPageData = {
  slug: "playground",
  navLabel: "Playground",
  eyebrow: "Playground",
  heading: "Guía del Playground",
  title: "Cmd+kit | Documentación Playground",
  description:
    "Usa el playground de Cmd+kit para configurar UX de comandos, validar comportamiento en vivo y exportar código listo por adaptador.",
  intro: [
    "El playground es un workspace orientado a producción para diseñar la experiencia de comandos antes de cerrar la integración en tu aplicación.",
    "Te permite definir arquitectura de comandos, validar flujo de teclado/navegación en vivo y exportar código base para <code>React</code>, <code>Vue</code>, <code>Preact</code>, <code>Astro</code> y <code>Core (Vanilla)</code>."
  ],
  sections: [
    {
      id: "que-puedes-hacer",
      label: "Qué puedes hacer en el playground",
      blocks: [
        {
          type: "list",
          items: [
            "modelar la estructura de comandos antes de escribir código de integración",
            "probar navegación anidada y flujo de elemento activo en tiempo real",
            "configurar tokens de tema claro/oscuro y validar paridad visual",
            "ajustar copy de placeholder, estado vacío y etiqueta de cierre",
            "exportar snippets base por framework desde una única configuración"
          ]
        }
      ]
    },
    {
      id: "mapa-del-workspace",
      label: "Mapa del workspace",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Vista previa en vivo</strong>: palette embebida que se actualiza con el configurador",
            "<strong>Configurador</strong>: superficie de control por acordeones con divulgación progresiva",
            "<strong>Panel de código</strong>: pestañas por adaptador con export y copiado",
            "<strong>Acción de abrir preview</strong>: mantiene el flujo modal para validar interacción real"
          ]
        }
      ]
    },
    {
      id: "mapa-de-controles-basicos",
      label: "Mapa de controles: Básicos",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Idioma</strong>: cambia etiquetas del configurador y copy por defecto",
            "<strong>Título de la paleta</strong>: encabezado principal del diálogo",
            "<strong>Placeholder de búsqueda</strong>: texto del input de búsqueda",
            "<strong>Atajo</strong>: trigger de teclado exportado en la config",
            "<strong>Elementos recientes</strong>: activación + título + límite de sección reciente",
            "<strong>Modo de datos</strong>: secciones estáticas o source asíncrono",
            "<strong>Abrir al cargar</strong>: estado inicial de apertura exportado"
          ]
        }
      ]
    },
    {
      id: "mapa-de-controles-apariencia",
      label: "Mapa de controles: Apariencia",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Tema a editar (Claro / Oscuro)</strong>: selecciona el modo que vas a modificar",
            "<strong>Acento / Fondo / Texto</strong>: tokens semánticos principales",
            "<strong>Título / Descripción / Muted</strong>: jerarquía tipográfica",
            "<strong>Título de sección / título de item / subtítulo / atajo</strong>: granularidad fina por zona",
            "<strong>Borde / Overlay</strong>: contenedor y capa de fondo",
            "<strong>Radio</strong>: redondeado global con preview visual",
            "<strong>Presets de sombra</strong>: presets rápidos + valor avanzado opcional"
          ]
        },
        {
          type: "paragraph",
          html: "El código generado incluye ambos modos dentro de un único objeto <code>theme</code> (<code>theme.light</code> + <code>theme.dark</code>) para mantener exports completos y coherentes."
        }
      ]
    },
    {
      id: "mapa-de-controles-secciones",
      label: "Mapa de controles: Secciones y comandos",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Añadir / mover / eliminar sección</strong>: arquitectura de información de alto nivel",
            "<strong>Título de sección</strong>: etiqueta visible de grupo",
            "<strong>Añadir / mover / eliminar item</strong>: ordenación y mantenimiento de comandos",
            "<strong>Campos de item</strong>: título, icono, subtítulo, atajo, href, keywords, deshabilitado",
            "<strong>Comandos anidados</strong>: grupos en profundidad bajo un item",
            "<strong>Controles anidados</strong>: añadir/mover/eliminar secciones e ítems anidados"
          ]
        }
      ]
    },
    {
      id: "mapa-de-controles-codigo",
      label: "Mapa de controles: Código y export",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>Pestañas de adaptador</strong>: React, Vue, Preact, Astro, Core (Vanilla)",
            "<strong>Acción copiar</strong>: copia snippet activo con feedback visual de éxito/error",
            "<strong>Expandir snippet</strong>: vista colapsada parcial con animación de expansión",
            "<strong>Sincronización en vivo</strong>: snippets actualizados automáticamente según estado del configurador"
          ]
        }
      ]
    },
    {
      id: "ejemplos-de-export",
      label: "Ejemplos de export",
      blocks: [
        {
          type: "code",
          lang: "tsx",
          label: "React",
          code: `import { CommandPalette } from "@cmd-kit/react";

const sections = [
  {
    id: "commands",
    title: "Comandos",
    items: [{ id: "toggle-theme", title: "Cambiar tema", shortcut: "mod+t" }]
  }
];

const theme = {
  light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
  dark: { accentColor: "#35d7ff", backgroundColor: "#0b1116" }
};

export function Demo() {
  return (
    <CommandPalette
      sections={sections}
      shortcut="mod+k"
      title="Menú de comandos"
      messages={{
        searchPlaceholder: "Buscar comandos...",
        noResults: "No se han encontrado resultados.",
        closeLabel: "Cerrar menú de comandos"
      }}
      recents={false}
      theme={theme}
    />
  );
}`
        },
        {
          type: "code",
          lang: "vue",
          label: "Vue",
          code: `<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";

const sections = [{ id: "commands", title: "Comandos", items: [] }];
const theme = {
  light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
  dark: { accentColor: "#35d7ff", backgroundColor: "#0b1116" }
};
</script>

<template>
  <CommandPalette
    :sections="sections"
    :theme="theme"
    shortcut="mod+k"
    title="Menú de comandos"
  />
</template>`
        },
        {
          type: "code",
          lang: "ts",
          label: "Core (Vanilla)",
          code: `import { createCommandPalette } from "@cmd-kit/core";

const palette = createCommandPalette({
  sections: [{ id: "commands", title: "Comandos", items: [] }],
  theme: {
    light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
    dark: { accentColor: "#35d7ff", backgroundColor: "#0b1116" }
  },
  shortcut: "mod+k",
  title: "Menú de comandos"
});

window.addEventListener("beforeunload", () => palette.destroy());`
        }
      ]
    },
    {
      id: "flujo-guiado-arranque-rapido",
      label: "Flujo guiado #1: Arranque rápido (10 minutos)",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Configura idioma y título en <strong>Básicos</strong>.",
            "Crea secciones principales y 3-5 comandos core.",
            "Añade subtítulos y atajos para mejorar lectura y escaneo.",
            "Ajusta placeholder/estado vacío/cierre al tono de producto.",
            "Abre preview y valida el flujo completo por teclado.",
            "Exporta tu adaptador objetivo e intégralo en tu app."
          ]
        }
      ]
    },
    {
      id: "flujo-guiado-tema-dual",
      label: "Flujo guiado #2: Configuración dual de tema",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Selecciona <strong>Modo claro</strong> y define tokens principales.",
            "Cambia a <strong>Modo oscuro</strong> y replica la misma intención semántica.",
            "Valida preview en ambos modos con el selector de modo de vista previa.",
            "Revisa contraste en título, subtítulo y atajos.",
            "Exporta y confirma presencia de <code>theme.light</code> y <code>theme.dark</code>."
          ]
        }
      ]
    },
    {
      id: "flujo-guiado-arquitectura",
      label: "Flujo guiado #3: Arquitectura y flujos anidados",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Define secciones por intención de usuario (navegación, acciones, settings).",
            "Coloca primero los comandos más frecuentes.",
            "Usa anidados solo cuando haya navegación real en profundidad.",
            "Añade keywords para cubrir sinónimos de búsqueda.",
            "Usa estado deshabilitado solo para casos intencionales y contextuales."
          ]
        }
      ]
    },
    {
      id: "flujo-guiado-async",
      label: "Flujo guiado #4: Preparación para source asíncrono",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Cambia modo de datos a <strong>Fuente asíncrona</strong>.",
            "Ajusta delay para aproximar latencia real de backend.",
            "Valida transiciones de carga y estado vacío.",
            "Exporta snippet y sustituye la fuente mock por tu cliente API real.",
            "Mantén el shape de payload alineado con el esquema section/item."
          ]
        }
      ]
    },
    {
      id: "checklist-preproduccion",
      label: "Checklist preproducción",
      blocks: [
        {
          type: "list",
          items: [
            "validado abrir/cerrar por teclado y navegación con flechas",
            "validada navegación de vuelta y breadcrumbs en anidados",
            "validada paridad claro/oscuro en diálogo, items y atajos",
            "mensajes/localización conectados a capa i18n de aplicación",
            "snippet exportado normalizado a reglas de lint/estilo del proyecto",
            "estados async/error validados en runtime real"
          ]
        }
      ]
    },
    {
      id: "faq",
      label: "FAQ",
      blocks: [
        {
          type: "list",
          items: [
            "<strong>¿Debo subir a producción el código exportado sin cambios?</strong> Normalmente no. Úsalo como base y adáptalo a tu arquitectura, naming y estilos.",
            "<strong>¿La salida del playground es documentación de API?</strong> No. La referencia de API está en los docs de cada adaptador; el playground es base de integración.",
            "<strong>¿Puedo mantener la apertura modal si ya uso preview embebida?</strong> Sí. La embebida acelera iteración visual y la modal sirve para validar interacción real.",
            "<strong>¿Por qué solo salen pestañas de adaptadores en export?</strong> Se prioriza foco en salidas oficiales y prácticas para reducir ruido.",
            "<strong>¿Cuándo pasar del playground a implementación?</strong> Cuando tengas estable la arquitectura de comandos, la preview y los tokens duales."
          ]
        }
      ]
    }
  ]
};
