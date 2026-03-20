import type { DocPageData } from "@/i18n/docs/shared";

export const vueESDoc: DocPageData = {
    slug: "vue", navLabel: "Vue", eyebrow: "Vue", heading: "Integración con Vue", title: "Cmd+kit | Vue",
    description: "Instala el paquete de Vue y configura secciones, mensajes, tema y comandos recientes.",
    intro: ["<code>@cmd-kit/vue</code> ofrece un componente <code>CommandPalette</code> y una API composable para los casos donde quieres controlar más directamente el estado de la palette."],
    sections: [
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "vue", showAdapter: false, showLink: false }] },
      { id: "uso-basico", label: "Uso básico", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" }
    ]
  }
];
</script>

<template>
  <CommandPalette :sections="sections" title="Comandos del proyecto" />
</template>` }] },
      { id: "que-puedes-configurar", label: "Qué puedes configurar", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code> y <code>source</code>", "<code>messages</code> para copy localizado o del producto", "<code>theme</code> para colores y superficies", "<code>classNames</code> para hooks de estilo", "<code>recents</code> para recientes automáticos"] }] },
      { id: "slots-e-iconos", label: "Slots e iconos", blocks: [{ type: "paragraph", html: "La personalización en Vue se hace con slots. Usa el slot <code>item</code> cuando quieras cambiar iconos o la estructura de la fila." }, { type: "code", lang: "vue", label: "vue", code: `<CommandPalette :sections="sections" title="Comandos del proyecto">
  <template #item="{ item, active }">
    <div :class="['palette-row', { 'is-active': active }]">
      <MyIcon :name="item.id" />
      <div class="palette-row-copy">
        <strong>{{ item.title }}</strong>
        <span v-if="item.subtitle">{{ item.subtitle }}</span>
      </div>
    </div>
  </template>
</CommandPalette>` }] },
      { id: "ejemplo-de-mensajes", label: "Ejemplo de mensajes", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :messages="{
    searchPlaceholder: 'Busca docs, páginas o acciones',
    noResults: 'No se ha encontrado ningún comando.'
  }"
  :sections="sections"
  title="Comandos del proyecto"
/>` }] },
      { id: "comandos-recientes", label: "Comandos recientes", blocks: [{ type: "paragraph", html: "<code>recents</code> es opcional y está apagado por defecto. Actívalo con <code>:recents=\"true\"</code> o pasando un objeto con <code>limit</code> y <code>sectionTitle</code>. Desactívalo con <code>:recents=\"false\"</code>." }, { type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :sections="sections"
  :recents="false"
  title="Comandos del proyecto"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Necesito <code>&lt;script setup&gt;</code> para usar el adaptador de Vue?</strong> No. También funciona con componentes Vue tradicionales; <code>&lt;script setup&gt;</code> es solo una comodidad.", "<strong>¿Cómo personalizo la fila de resultados en Vue?</strong> Usa el slot <code>item</code> para renderizar tus iconos, layout y metadatos según cada comando.", "<strong>¿Puedo sincronizar el estado abierto/cerrado con un estado padre?</strong> Sí. Vincula <code>v-model:open</code> (o escucha <code>open-change</code>) para integrarlo con tu estado global.", "<strong>¿Cómo desactivo recientes en Vue?</strong> Deja <code>recents</code> sin pasar (apagado por defecto) o usa <code>:recents=\"false\"</code>.", "<strong>¿Cómo lo estilizo sin rehacer todo el componente?</strong> Usa <code>theme</code> para tokens base y <code>classNames</code> para hooks CSS por slot.", "<strong>¿Cuándo conviene ir de Vue a Core?</strong> Cuando la personalización por slots ya no sea suficiente y necesites un pipeline de render completamente propio."] }] }
    ]
  };


