# @cmd-kit/vue

[![npm version](https://img.shields.io/npm/v/@cmd-kit/vue?label=npm)](https://www.npmjs.com/package/@cmd-kit/vue)
![Vue](https://img.shields.io/badge/Vue-3-42B883)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)
![License](https://img.shields.io/badge/license-MIT-1f2937)

Vue adapter for Cmd+kit with default UI, keyboard navigation, nested sections, async source, and slot customization.

## 🌐 Language

- [Español](#-español)
- [English](#-english)

---

## 🇪🇸 Español

### ⚡ Instalación

```bash
npm install @cmd-kit/vue vue
```

### ✅ Qué incluye

- `CommandPalette` (componente).
- `useCommandPalette` (composable).
- Atajo global (`mod+k` por defecto).
- Navegación por teclado y secciones anidadas.
- Soporte async (`source`).
- Recientes opcionales con deduplicación.
- Personalización por `slots`, `theme` y `classNames`.

### 🚀 Uso rápido

```vue
<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";
</script>

<template>
  <CommandPalette />
</template>
```

### 🧩 Ejemplo con secciones

```vue
<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";

const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "overview", title: "Overview", shortcut: "mod+o" },
      { id: "projects", title: "Projects", shortcut: "mod+p" }
    ]
  }
];
</script>

<template>
  <CommandPalette :sections="sections" title="Command menu" />
</template>
```

### 🎨 Slots disponibles

- `title`
- `section-title`
- `item`
- `empty-state`

Ejemplo:

```vue
<CommandPalette :sections="sections">
  <template #item="{ item, active }">
    <div :style="{ opacity: active ? 1 : 0.8 }">{{ item.title }}</div>
  </template>
</CommandPalette>
```

### 🛝 Integración desde Playground

1. Configura comandos en playground.
2. Exporta target `Vue`.
3. Copia `sections`/`items` + opcionales.
4. Pégalos en tu `<CommandPalette />`.

### 🤝 Contribuciones

Si encuentras un bug o mejora de integración Vue, abre issue/PR.

---

## 🇬🇧 English

### ⚡ Install

```bash
npm install @cmd-kit/vue vue
```

### ✅ What you get

- `CommandPalette` component.
- `useCommandPalette` composable.
- Global shortcut (`mod+k` by default).
- Keyboard + nested navigation.
- Async source support.
- Optional recents with dedupe.
- Slot-based customization + `theme` + `classNames`.

### 🚀 Quick start

```vue
<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";
</script>

<template>
  <CommandPalette />
</template>
```

### 🎨 Slots

- `title`
- `section-title`
- `item`
- `empty-state`

### 🛝 Playground integration

Use `Vue` export target and paste the generated config into your component integration.

### 🤝 Contributing

PRs are welcome for Vue adapter bugs and DX improvements.

---

Portfolio: **Fr4n0m** → https://codebyfran.es
