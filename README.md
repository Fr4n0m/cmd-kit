<p>
  <img src="./apps/web/public/brand/cmd-kit-logo.png" alt="Cmd+kit" width="260" />
</p>

# cmd-kit

[![npm](https://img.shields.io/badge/npm-monorepo-CB3837)](https://www.npmjs.com/)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)
![Astro](https://img.shields.io/badge/Astro-Web-BC52EE)
![License](https://img.shields.io/badge/license-MIT-1f2937)

Cmd+kit is an open source command palette system with:

- framework-agnostic core engine,
- official adapters for React, Preact, Vue, and Astro,
- live playground for shaping/exporting command configs.

## 🌐 Language

- [Español](#-español)
- [English](#-english)

---

## 🇪🇸 Español

### 📦 Paquetes oficiales

- [`@cmd-kit/core`](./packages/core/README.md)
- [`@cmd-kit/react`](./packages/react/README.md)
- [`@cmd-kit/preact`](./packages/preact/README.md)
- [`@cmd-kit/vue`](./packages/vue/README.md)
- [`@cmd-kit/astro`](./packages/astro/README.md)

### 🚀 Inicio rápido

Instala dependencias del monorepo:

```bash
npm install
```

Levanta la web (landing + docs + playground):

```bash
npm run dev:web
```

### 🧭 Qué contiene este repo

- `packages/core`: motor, filtros, ejecución y runtime vanilla (`createCommandPalette`).
- `packages/react`: adapter React + UI por defecto.
- `packages/preact`: adapter Preact 1:1 respecto a React.
- `packages/vue`: adapter Vue con slots/composable.
- `packages/astro`: componente Astro (`@cmd-kit/astro/component`).
- `apps/web`: landing, docs y playground del producto.
- `apps/example-*`: apps de verificación local por tecnología.

### 🛝 Flujo recomendado con Playground

1. Diseña comandos en el playground.
2. Exporta al target (React/Vue/Preact/Astro/Core).
3. Pega `sections`/`items` + opcionales (`messages`, `theme`, `recents`) en tu proyecto.
4. Ajusta render/estilos desde el adapter correspondiente.

### 🧪 Scripts clave

- `npm run build`
- `npm run test`
- `npm run typecheck`
- `npm run pack:verify`
- `npm run release:check`

### 📚 Documentación de proyecto (repo)

- [CONTRIBUTING](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md)
- [SECURITY](./SECURITY.md)
- [docs/](./docs) (contribución, arquitectura, release, procesos del proyecto)

La documentación técnica de uso de producto vive principalmente en los `README` de cada paquete.

### 🤝 Contribuciones

Se aceptan PRs con mejoras de DX, correcciones de bugs, tests y documentación. Si cambias comportamiento público, incluye ejemplo reproducible y actualización de docs.

---

## 🇬🇧 English

### 📦 Official packages

- [`@cmd-kit/core`](./packages/core/README.md)
- [`@cmd-kit/react`](./packages/react/README.md)
- [`@cmd-kit/preact`](./packages/preact/README.md)
- [`@cmd-kit/vue`](./packages/vue/README.md)
- [`@cmd-kit/astro`](./packages/astro/README.md)

### 🚀 Quick start

Install monorepo dependencies:

```bash
npm install
```

Run web app (landing + docs + playground):

```bash
npm run dev:web
```

### 🧭 Repository layout

- `packages/core`: engine, filtering, execution, and vanilla runtime (`createCommandPalette`).
- `packages/react`: React adapter + default UI.
- `packages/preact`: Preact adapter aligned with React baseline.
- `packages/vue`: Vue adapter with slots/composable.
- `packages/astro`: Astro component adapter (`@cmd-kit/astro/component`).
- `apps/web`: product landing, docs, and playground.
- `apps/example-*`: local verification apps per technology.

### 🛝 Recommended Playground flow

1. Shape commands in playground.
2. Export for your target (React/Vue/Preact/Astro/Core).
3. Paste `sections`/`items` + optional props (`messages`, `theme`, `recents`) into your app.
4. Fine-tune rendering/styles with your adapter APIs.

### 🧪 Key scripts

- `npm run build`
- `npm run test`
- `npm run typecheck`
- `npm run pack:verify`
- `npm run release:check`

### 📚 Project docs

- [CONTRIBUTING](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md)
- [SECURITY](./SECURITY.md)
- [docs/](./docs) (architecture, release process, contribution workflow)

Technical product usage docs are maintained primarily in each package README.

### 🤝 Contributing

PRs are welcome for DX improvements, bug fixes, tests, and docs updates. If you change public behavior, include reproducible context and docs updates.

---

Portfolio: **Fr4n0m** → https://codebyfran.es
