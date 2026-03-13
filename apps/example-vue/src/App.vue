<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [{ id: "dashboard", title: "Dashboard", href: "/dashboard" }]
  }
];
</script>

<template>
  <main style="padding: 2rem; font-family: system-ui, sans-serif">
    <h1>cmd+kit Vue Example</h1>
    <p>Press Cmd/Ctrl + K to open the palette.</p>
    <CommandPalette
      :recents="{ sectionTitle: 'Recent commands' }"
      :sections="sections"
      title="Vue example commands"
    />
  </main>
</template>
