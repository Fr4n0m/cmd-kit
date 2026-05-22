import type { DocPageData } from "@/i18n/docs/shared";

export const vueESDoc: DocPageData = {
    slug: "vue", navLabel: "Vue", eyebrow: "Vue", heading: "Integración con Vue", title: "Cmd+kit | Vue",
    description: "Instala el paquete de Vue y configura secciones, mensajes, tema y comandos recientes.",
    intro: ["<code>@cmd-kit/vue</code> ofrece un componente <code>CommandPalette</code> y una API composable para los casos donde quieres controlar más directamente el estado de la palette."],
    sections: [
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "vue", showAdapter: false, showLink: false }] },
      { id: "enlaces-paquete", label: "Enlaces del paquete", blocks: [{ type: "list", items: ['<a href="https://www.npmjs.com/package/@cmd-kit/vue" target="_blank" rel="noopener noreferrer"><span aria-hidden="true" style="display:inline-flex;width:14px;height:14px;vertical-align:-2px;margin-right:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"/><path d="M12 12l8 -4.5"/><path d="M12 12l0 9"/><path d="M12 12l-8 -4.5"/><path d="M16 5.25l-8 4.5"/></svg></span>NPM: @cmd-kit/vue</a>'] }] },
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
      { id: "que-puedes-configurar", label: "Qué puedes configurar", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code> y <code>source</code>", "<code>messages</code> para copy localizado o del producto", "<code>theme</code> en modo simple o dual (<code>{ light, dark }</code>)", "<code>classNames</code> para hooks de estilo", "<code>recents</code> para recientes automáticos", "<code>reducedMotion</code> para desactivar animaciones de hover/movimiento", "<code>size</code>: <code>\"small\" | \"normal\" | \"large\"</code> — escala el palette uniformemente"] }] },
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
      { id: "anadir-un-comando-nuevo", label: "Añadir un comando nuevo", blocks: [{ type: "paragraph", html: "Para añadir una opción nueva, agrega un nuevo ítem en tus datos de sección. <code>shortcut</code> es opcional." }, { type: "code", lang: "vue", label: "vue", code: `<script setup lang="ts">
const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" },
      { id: "billing", title: "Billing", href: "/billing", shortcut: "mod+b" },
      { id: "support", title: "Support", href: "/support" }
    ]
  }
];
</script>` }] },
      { id: "comandos-recientes", label: "Comandos recientes", blocks: [{ type: "paragraph", html: "<code>recents</code> es opcional y está apagado por defecto. Actívalo con <code>:recents=\"true\"</code> o pasando un objeto con <code>limit</code> y <code>sectionTitle</code>. Desactívalo con <code>:recents=\"false\"</code>." }, { type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :sections="sections"
  :recents="false"
  title="Comandos del proyecto"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Necesito <code>&lt;script setup&gt;</code> para usar el adaptador de Vue?</strong> No. También funciona con componentes Vue tradicionales; <code>&lt;script setup&gt;</code> es solo una comodidad.", "<strong>¿Cómo personalizo la fila de resultados en Vue?</strong> Usa el slot <code>item</code> para renderizar tus iconos, layout y metadatos según cada comando.", "<strong>¿Puedo sincronizar el estado abierto/cerrado con un estado padre?</strong> Sí. Vincula <code>v-model:open</code> (o escucha <code>open-change</code>) para integrarlo con tu estado global.", "<strong>¿Cómo desactivo recientes en Vue?</strong> Deja <code>recents</code> sin pasar (apagado por defecto) o usa <code>:recents=\"false\"</code>.", "<strong>¿Cómo lo estilizo sin rehacer todo el componente?</strong> Usa <code>theme</code> para tokens base y <code>classNames</code> para hooks CSS por slot.", "<strong>¿Cuándo conviene ir de Vue a Core?</strong> Cuando la personalización por slots ya no sea suficiente y necesites un pipeline de render completamente propio."] }] }
    ]
  };


