<p align="center">
  <img src="https://cmd-kit.vercel.app/brand/cmd-kit-logo-readme.webp" alt="Cmd+kit logo" width="243" />
</p>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-3178C6" />
  <img alt="Astro" src="https://img.shields.io/badge/Astro-5-BC52EE" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA" />
  <img alt="Vue" src="https://img.shields.io/badge/Vue-3-42B883" />
  <img alt="Preact" src="https://img.shields.io/badge/Preact-10-673AB8" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-1f2937" />
</p>

# Cmd+kit

**Quick navigation / Navegación rápida**
- [Español](#-español)
- [English](#-english)

---

## 🇪🇸 Español

### ✨ Qué es Cmd+kit
Cmd+kit es un sistema open source de command palette para crear experiencias de comando reales en múltiples frameworks.

### 📦 Paquetes
| Paquete | Propósito | Docs |
| --- | --- | --- |
| `@cmd-kit/core` | Motor agnóstico: snapshots, filtrado, ejecución, recientes y runtime sin framework | [README](./packages/core/README.md) |
| `@cmd-kit/react` | Adaptador React con UI por defecto y hook | [README](./packages/react/README.md) |
| `@cmd-kit/preact` | Adaptador Preact alineado con React | [README](./packages/preact/README.md) |
| `@cmd-kit/vue` | Adaptador Vue con composable y slots | [README](./packages/vue/README.md) |
| `@cmd-kit/astro` | Componente oficial para Astro | [README](./packages/astro/README.md) |

Nota: no existe paquete `@cmd-kit/vanilla`; la integración vanilla vive en `@cmd-kit/core`.

### 📚 Documentación web
- Español: `apps/web` -> `/es/docs`
- English: `apps/web` -> `/docs`

### 🚀 Instalación rápida
```bash
npm install @cmd-kit/react react react-dom
npm install @cmd-kit/preact preact
npm install @cmd-kit/vue vue
npm install @cmd-kit/astro astro
npm install @cmd-kit/core
```

### 🧪 Desarrollo del repo
```bash
npm install
npm run dev:web
npm run build
npm run test
npm run typecheck
```

### 🧭 Superficie pública
- `apps/web`: landing, documentación y playground.
- El playground exporta bases reales para React, Vue, Preact, Astro y Core/Vanilla.
- El detalle técnico de cada integración está en los README de cada paquete.

### 🤝 Contribuciones
PRs bienvenidas. Si quieres contribuir:
- abre un issue o PR con contexto reproducible,
- mantén docs y comportamiento alineados,
- actualiza el README del paquete si cambias API o patrón de uso.

### 🔗 Enlaces
- [Guía de contribución](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)

---

## 🇬🇧 English

### ✨ What Cmd+kit is
Cmd+kit is an open source command palette system for shipping real command experiences across frameworks.

### 📦 Packages
| Package | Purpose | Docs |
| --- | --- | --- |
| `@cmd-kit/core` | Framework-agnostic engine: snapshots, filtering, execution, recents, and framework-free runtime | [README](./packages/core/README.md) |
| `@cmd-kit/react` | React adapter with default UI and hook | [README](./packages/react/README.md) |
| `@cmd-kit/preact` | Preact adapter aligned with React baseline | [README](./packages/preact/README.md) |
| `@cmd-kit/vue` | Vue adapter with composable and slots | [README](./packages/vue/README.md) |
| `@cmd-kit/astro` | Official Astro component adapter | [README](./packages/astro/README.md) |

Note: there is no `@cmd-kit/vanilla` package; the vanilla runtime lives in `@cmd-kit/core`.

### 📚 Web docs
- Spanish: `apps/web` -> `/es/docs`
- English: `apps/web` -> `/docs`

### 🚀 Quick install
```bash
npm install @cmd-kit/react react react-dom
npm install @cmd-kit/preact preact
npm install @cmd-kit/vue vue
npm install @cmd-kit/astro astro
npm install @cmd-kit/core
```

### 🧪 Repository development
```bash
npm install
npm run dev:web
npm run build
npm run test
npm run typecheck
```

### 🧭 Public surface
- `apps/web`: landing page, docs, and playground.
- The playground exports real starter bases for React, Vue, Preact, Astro, and Core/Vanilla.
- Framework-specific technical details live in each package README.

### 🤝 Contributing
PRs are encouraged. To contribute:
- open an issue or PR with a reproducible context,
- keep behavior and docs aligned,
- update the package README when API or integration patterns change.

### 🔗 Links
- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)

---

Portfolio: **Fr4n0m** → https://codebyfran.es
