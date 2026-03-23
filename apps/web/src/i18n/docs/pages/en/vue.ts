import type { DocPageData } from "@/i18n/docs/shared";

export const vueENDoc: DocPageData = {
    slug: "vue", navLabel: "Vue", eyebrow: "Vue", heading: "Vue Integration", title: "Cmd+kit | Vue",
    description: "Install the Vue package and customize the default palette with props, slots, theme tokens, and async sources.",
    intro: ["<code>@cmd-kit/vue</code> provides a <code>CommandPalette</code> component plus a Vue composable for cases where you want to orchestrate state more directly."],
    sections: [
      { id: "install", label: "Install", blocks: [{ type: "install-selector", adapter: "vue", showAdapter: false, showLink: false }] },
      { id: "basic-usage", label: "Basic usage", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<script setup lang="ts">
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
  <CommandPalette :sections="sections" title="Project commands" />
</template>` }] },
      { id: "what-you-can-configure", label: "What you can configure", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code>, and <code>source</code>", "<code>messages</code> for localized or product-specific copy", "<code>theme</code> for palette colors and surfaces", "<code>classNames</code> for slot-level styling hooks", "<code>recents</code> for automatic recent command tracking"] }] },
      { id: "slots-and-icons", label: "Slots and icons", blocks: [{ type: "paragraph", html: "Vue customization is slot-based. Use the <code>item</code> slot to control icons and row layout." }, { type: "code", lang: "vue", label: "vue", code: `<CommandPalette :sections="sections" title="Project commands">
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
      { id: "messages-example", label: "Messages example", blocks: [{ type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :messages="{
    searchPlaceholder: 'Search docs, pages, or actions',
    noResults: 'No matching command found.'
  }"
  :sections="sections"
  title="Project commands"
/>` }] },
      { id: "add-a-new-command", label: "Add a new command", blocks: [{ type: "paragraph", html: "Add a new option by appending a new item to your section data. <code>shortcut</code> is optional." }, { type: "code", lang: "vue", label: "vue", code: `<script setup lang="ts">
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
      { id: "recent-commands", label: "Recent commands", blocks: [{ type: "paragraph", html: "<code>recents</code> is optional and off by default. Enable with <code>:recents=\"true\"</code> or configure an object with <code>limit</code> and <code>sectionTitle</code>. Disable with <code>:recents=\"false\"</code>." }, { type: "code", lang: "vue", label: "vue", code: `<CommandPalette
  :sections="sections"
  :recents="false"
  title="Project commands"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>Do I need <code>&lt;script setup&gt;</code> to use the Vue adapter?</strong> No. It works with regular Vue components too; <code>&lt;script setup&gt;</code> is only a convenience.", "<strong>How do I customize the item row in Vue?</strong> Use the <code>item</code> slot to render your own icon, layout, and metadata based on the current command item.", "<strong>Can I sync palette visibility with parent state?</strong> Yes. Bind <code>v-model:open</code> (or listen to <code>open-change</code>) to integrate with your app-level state.", "<strong>How do I disable recent commands in Vue?</strong> Keep <code>recents</code> unset (default off) or pass <code>:recents=\"false\"</code>.", "<strong>How do I style it without rewriting everything?</strong> Use <code>theme</code> for built-in tokens and <code>classNames</code> for slot-level CSS hooks.", "<strong>When should I switch from the Vue component to Core?</strong> Switch when slot-based customization is not enough and you need a fully custom rendering pipeline."] }] }
    ]
  };


