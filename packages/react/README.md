<p>
  <img src="https://cmd-kit.vercel.app/brand/cmd-kit-logo-readme.webp" alt="Cmd+kit" width="250" />
</p>

# @cmd-kit/react

[![npm version](https://img.shields.io/npm/v/@cmd-kit/react?label=npm)](https://www.npmjs.com/package/@cmd-kit/react)
![React](https://img.shields.io/badge/React-19-149ECA)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)
![License](https://img.shields.io/badge/license-MIT-1f2937)

React adapter for Cmd+kit with default UI, keyboard navigation, nested sections, recents, and render customization.

**Website:** https://cmd-kit.vercel.app/  
**Docs:** https://cmd-kit.vercel.app/docs/react

## 🌐 Language

- [Español](#-español)
- [English](#-english)

---

## 🇪🇸 Español

### ⚡ Instalación

```bash
npm install @cmd-kit/react react react-dom
```

### ✅ Qué incluye

- `CommandPalette` listo para usar.
- `useCommandPalette` para control programático.
- Atajo global (`mod+k` por defecto).
- Navegación por teclado (↑ ↓ Enter Escape).
- Navegación anidada (`children`).
- Soporte de `source` async.
- Recientes opcionales con deduplicación.
- Estilos por defecto + overrides (`theme`, `classNames`, `renderers`).
- `theme` admite modo simple o modo dual (`light`/`dark`).
- `reducedMotion` para desactivar animaciones de hover/movimiento.

### 🚀 Uso rápido

```tsx
import { CommandPalette } from "@cmd-kit/react";

export function App() {
  return <CommandPalette />;
}
```

Si no pasas `items`, `sections` ni `source`, el paquete renderiza datos demo por defecto.

### 🧩 Configuración con secciones

```tsx
import { CommandPalette } from "@cmd-kit/react";

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

export function App() {
  return (
    <CommandPalette
      recents={{ limit: 6, sectionTitle: "Recent commands" }}
      sections={sections}
      title="Command menu"
    />
  );
}
```

### 🎨 Personalización

```tsx
<CommandPalette
  classNames={{
    dialog: "my-dialog",
    item: "my-item"
  }}
  renderers={{
    title: ({ activeTitle, canGoBack, goBack }) => (
      <span>
        {canGoBack ? <button onClick={goBack}>←</button> : null}
        {activeTitle}
      </span>
    )
  }}
  theme={{
    light: {
      accentColor: "#0fa6d8",
      backgroundColor: "#ffffff",
      textColor: "#0e1720"
    },
    dark: {
      accentColor: "#35d7ff",
      backgroundColor: "#0b1116",
      textColor: "#eff7fb"
    }
  }}
/>
```

### 🧠 Hook `useCommandPalette`

```tsx
import { useCommandPalette } from "@cmd-kit/react";

const palette = useCommandPalette({
  sections,
  defaultOpen: true
});

palette.setOpenState(false);
palette.moveNext();
```

### 🛝 Integración desde Playground

Flujo recomendado:

1. Configura comandos en el playground.
2. Exporta para `React`.
3. Copia `sections`/`items` y opcionalmente `messages`, `theme`, `recents`, `reducedMotion`.
4. Pégalos en tu componente que renderiza `<CommandPalette />`.

Si exportas modo async, conecta el resultado al prop `source`.

### 📦 API principal

- `CommandPalette`
- `useCommandPalette`
- tipos reexportados desde `@cmd-kit/core`:
  `CommandItem`, `CommandSection`, `CommandMessages`, `CommandTheme`, etc.

### 🤝 Contribuciones

PRs y mejoras son bienvenidas. Si detectas un bug o quieres mejorar la DX, abre un issue o PR con contexto reproducible.

---

## 🇬🇧 English

### ⚡ Install

```bash
npm install @cmd-kit/react react react-dom
```

### ✅ What you get

- Ready-to-use `CommandPalette`.
- `useCommandPalette` for programmatic control.
- Global shortcut (`mod+k` by default).
- Keyboard navigation (↑ ↓ Enter Escape).
- Nested navigation (`children`).
- Async `source` support.
- Optional recents with dedupe.
- Built-in defaults + overrides (`theme`, `classNames`, `renderers`).
- `theme` supports single mode or dual mode (`light`/`dark`).
- `reducedMotion` prop to disable hover/motion animations.

### 🚀 Quick start

```tsx
import { CommandPalette } from "@cmd-kit/react";

export function App() {
  return <CommandPalette />;
}
```

If you do not pass `items`, `sections`, or `source`, the package renders built-in demo data.

### 🧩 Configure with sections

```tsx
import { CommandPalette } from "@cmd-kit/react";

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
      }
    ]
  }
];

export function App() {
  return (
    <CommandPalette
      recents={{ limit: 6, sectionTitle: "Recent commands" }}
      sections={sections}
      title="Command menu"
    />
  );
}
```

### 🎨 Customization

Use:

- `theme` for palette tokens.
- `reducedMotion` to disable hover/motion animations.
- `classNames` for slot-level CSS hooks.
- `renderers` / `renderItem` for render overrides.

### 🧠 `useCommandPalette` hook

Use the hook when you need direct control (`setOpenState`, `moveNext`, `runItem`, `reloadSource`, etc.).

### 🛝 Playground integration

Recommended flow:

1. Shape your data in the playground.
2. Export `React`.
3. Copy `sections`/`items` (+ optional `messages`, `theme`, `recents`, `reducedMotion`).
4. Paste into your `<CommandPalette />` integration.

For async mode, wire exported payload to `source`.

### 📦 Main API

- `CommandPalette`
- `useCommandPalette`
- re-exported core types from `@cmd-kit/core`

### 🤝 Contributing

PRs are welcome. If you find a bug or want to improve DX, open an issue/PR with a clear reproduction.

---

Portfolio: **Fr4n0m** → https://codebyfran.es
