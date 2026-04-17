<p>
  <img src="../../apps/web/public/brand/cmd-kit-logo.png" alt="Cmd+kit" width="250" />
</p>

# @cmd-kit/preact

[![npm version](https://img.shields.io/npm/v/@cmd-kit/preact?label=npm)](https://www.npmjs.com/package/@cmd-kit/preact)
![Preact](https://img.shields.io/badge/Preact-10-673AB8)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)
![License](https://img.shields.io/badge/license-MIT-1f2937)

Preact adapter for Cmd+kit with the same UI and behavior baseline as `@cmd-kit/react`.

**Website:** https://cmd-kit.vercel.app/  
**Docs:** https://cmd-kit.vercel.app/docs/preact

## 🌐 Language

- [Español](#-español)
- [English](#-english)

---

## 🇪🇸 Español

### ⚡ Instalación

```bash
npm install @cmd-kit/preact preact
```

### ✅ Qué incluye

- `CommandPalette` para Preact.
- `useCommandPalette` con API equivalente a React.
- Mismos defaults visuales/comportamiento que React.
- Soporte de `theme` simple o dual (`light`/`dark`).
- Atajos, navegación por teclado, anidado, async y recientes.

### 🚀 Uso rápido

```tsx
import { CommandPalette } from "@cmd-kit/preact";

export function App() {
  return <CommandPalette />;
}
```

### 🧩 Configuración base

```tsx
import { CommandPalette } from "@cmd-kit/preact";

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

export function App() {
  return <CommandPalette sections={sections} title="Command menu" />;
}
```

### 🎨 Personalización

Igual que React:

- `theme`
- `reducedMotion` (disable hover/motion animations)
- `classNames`
- `renderers`
- `renderItem`

Ejemplo de tema dual:

```tsx
<CommandPalette
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
2. Exporta target `Preact`.
3. Copia estructura (`sections`/`items`) y opcionales (`messages`, `theme`, `recents`, `reducedMotion`).
4. Integra en `<CommandPalette />`.

### 🤝 Contribuciones

PRs bienvenidas para bugs, mejoras de DX y parity entre adapters.

---

## 🇬🇧 English

### ⚡ Install

```bash
npm install @cmd-kit/preact preact
```

### ✅ What you get

- `CommandPalette` for Preact.
- `useCommandPalette` with React-like API.
- Same visual/behavior defaults as React.
- Supports single or dual `theme` mode (`light`/`dark`).
- Shortcuts, keyboard navigation, nested flows, async source, and recents.

### 🚀 Quick start

```tsx
import { CommandPalette } from "@cmd-kit/preact";

export function App() {
  return <CommandPalette />;
}
```

### 🎨 Customization

Same customization surface as React (`theme`, `classNames`, `renderers`, `renderItem`, `reducedMotion`).

Dual-theme example:

```tsx
<CommandPalette
  sections={sections}
  theme={{
    light: { accentColor: "#0fa6d8", backgroundColor: "#ffffff" },
    dark: { accentColor: "#35d7ff", backgroundColor: "#0b1116" }
  }}
  title="Command menu"
/>
```

### 🛝 Playground integration

Use the `Preact` export target, then paste `sections`/`items` (+ optional `messages`, `theme`, `recents`, `reducedMotion`) into your integration.

### 🤝 Contributing

PRs are welcome for bugs, DX improvements, and adapter parity.

---

Portfolio: **Fr4n0m** → https://codebyfran.es
