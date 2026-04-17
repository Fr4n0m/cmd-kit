<p>
  <img src="../../apps/web/public/brand/cmd-kit-logo.png" alt="Cmd+kit" width="250" />
</p>

# @cmd-kit/astro

[![npm version](https://img.shields.io/npm/v/@cmd-kit/astro?label=npm)](https://www.npmjs.com/package/@cmd-kit/astro)
![Astro](https://img.shields.io/badge/Astro-5-BC52EE)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)
![License](https://img.shields.io/badge/license-MIT-1f2937)

Astro adapter for Cmd+kit. Import the component with `@cmd-kit/astro/component`.

**Website:** https://cmd-kit.vercel.app/  
**Docs:** https://cmd-kit.vercel.app/docs/astro

## 🌐 Language

- [Español](#-español)
- [English](#-english)

---

## 🇪🇸 Español

### ⚡ Instalación

```bash
npm install @cmd-kit/astro astro
```

### 🚀 Uso rápido

```astro
---
import CommandPalette from "@cmd-kit/astro/component";
---

<CommandPalette />
```

### ✅ Qué incluye

- Componente Astro listo para usar.
- Atajo global (`mod+k` por defecto).
- Navegación por teclado.
- Secciones anidadas con `children`.
- Recientes opcionales con deduplicación.
- Tema adaptable (oscuro/claro) por defecto.
- `theme` en modo simple o dual (`light`/`dark`).
- `reducedMotion` para desactivar animaciones de hover/movimiento.

### 🧩 Configuración de comandos

```astro
---
import CommandPalette from "@cmd-kit/astro/component";

const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      {
        id: "overview",
        title: "Overview",
        subtitle: "Open the workspace overview",
        shortcut: "mod+o"
      },
      {
        id: "resources",
        title: "Resources",
        children: [
          {
            id: "resources-page",
            title: "Resources",
            items: [{ id: "guides", title: "Guides" }]
          }
        ]
      }
    ]
  }
];
---

<CommandPalette
  recents={{ limit: 6, sectionTitle: "Recent commands" }}
  sections={sections}
  theme={{
    light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
    dark: { accentColor: "#35d7ff", backgroundColor: "#0b1116" }
  }}
  title="Command menu"
/>
```

### 🛝 Integración desde Playground

1. Configura en playground.
2. Exporta target `Astro`.
3. Copia `sections` (o `items`) y props opcionales (`messages`, `theme`, `recents`, `shortcut`, `reducedMotion`).
4. Pégalos en tu página/componente Astro.

Nota: en Astro, el prop `source` es un `CommandSourcePayload` serializable (no función runtime).

### 📦 Props más usadas

- `items`
- `sections`
- `source`
- `messages`
- `theme`
- `title`
- `shortcut`
- `open` / `defaultOpen`
- `className`
- `classNames`
- `recents`
- `reducedMotion`

### 🤝 Contribuciones

PRs e issues son bienvenidos para mejorar la experiencia Astro.

---

## 🇬🇧 English

### ⚡ Install

```bash
npm install @cmd-kit/astro astro
```

### 🚀 Quick start

```astro
---
import CommandPalette from "@cmd-kit/astro/component";
---

<CommandPalette />
```

### ✅ What you get

- Ready-to-use Astro component.
- Global shortcut (`mod+k` default).
- Keyboard navigation.
- Nested sections.
- Optional recents with dedupe.
- Default adaptive light/dark theme.
- `theme` supports single mode or dual mode (`light`/`dark`).
- `reducedMotion` prop to disable hover/motion animations.

### 🛝 Playground integration

Use the `Astro` export target, then paste generated `sections`/`items` (+ optional props) into your Astro integration.

`source` in this package is a serializable payload object (`CommandSourcePayload`), not a runtime function.

### 🤝 Contributing

PRs are welcome for Astro integration bugs and improvements.

---

Portfolio: **Fr4n0m** → https://codebyfran.es
