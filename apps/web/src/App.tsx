import { type ReactNode, useMemo, useState } from "react";

import { CommandPalette } from "@cmd-kit/react";

import {
  baseItems,
  buildCssSnippet,
  buildReactSnippet,
  buildTailwindSnippet,
  defaultConfig,
  toTheme,
  type Language,
  type PlaygroundConfig
} from "./playground";

const ui = {
  en: {
    badge: "Open source command palette toolkit",
    launch: "Open preview",
    config: "Configurator",
    preview: "Live Preview",
    code: "Generated Code",
    reactCode: "React",
    cssCode: "CSS Variables",
    tailwindCode: "Tailwind",
    language: "Language",
    title: "Hero title",
    description: "Hero description",
    placeholder: "Search placeholder",
    noResults: "Empty state",
    accent: "Accent color",
    surface: "Surface color",
    text: "Text color",
    border: "Border color",
    radius: "Radius",
    shortcut: "Shortcut",
    layout: "Layout",
    centered: "Centered",
    wide: "Wide",
    copy: "Copy"
  },
  es: {
    badge: "Toolkit open source para command palette",
    launch: "Abrir preview",
    config: "Configurador",
    preview: "Vista previa",
    code: "Codigo generado",
    reactCode: "React",
    cssCode: "Variables CSS",
    tailwindCode: "Tailwind",
    language: "Idioma",
    title: "Titulo principal",
    description: "Descripcion principal",
    placeholder: "Placeholder de busqueda",
    noResults: "Estado vacio",
    accent: "Color de acento",
    surface: "Color de fondo",
    text: "Color del texto",
    border: "Color del borde",
    radius: "Radio",
    shortcut: "Atajo",
    layout: "Layout",
    centered: "Centrado",
    wide: "Ancho",
    copy: "Copiar"
  }
} satisfies Record<Language, Record<string, string>>;

export function App() {
  const [config, setConfig] = useState<PlaygroundConfig>(defaultConfig);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"react" | "css" | "tailwind">("react");
  const labels = ui[config.language];

  const code = useMemo(() => {
    if (activeTab === "css") {
      return buildCssSnippet(config);
    }

    if (activeTab === "tailwind") {
      return buildTailwindSnippet(config);
    }

    return buildReactSnippet(config);
  }, [activeTab, config]);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
  }

  return (
    <div className="page-shell">
      <CommandPalette
        items={baseItems}
        messages={{
          noResults: config.noResults,
          searchPlaceholder: config.placeholder
        }}
        onOpenChange={setIsOpen}
        open={isOpen}
        shortcut={config.shortcut}
        theme={toTheme(config)}
        title="cmd+kit preview"
      />

      <header className={`hero hero-${config.layout}`}>
        <div className="hero-copy">
          <span className="badge">{labels.badge}</span>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setIsOpen(true)} type="button">
              {labels.launch}
            </button>
            <button
              className="ghost-button"
              onClick={() =>
                setConfig((current) => ({
                  ...current,
                  language: current.language === "en" ? "es" : "en"
                }))
              }
              type="button"
            >
              {config.language === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
        <div className="hero-card">
          <p className="eyebrow">{labels.preview}</p>
          <div
            className="hero-card-surface"
            style={{
              borderColor: config.borderColor,
              borderRadius: config.radius,
              color: config.textColor
            }}
          >
            <span className="preview-shortcut">{config.shortcut}</span>
            <span className="preview-title">cmd+kit</span>
            <span className="preview-subtitle">{config.placeholder}</span>
          </div>
        </div>
      </header>

      <main className="workspace-grid">
        <section className="panel">
          <div className="panel-heading">
            <p className="eyebrow">{labels.config}</p>
            <h2>cmd+kit</h2>
          </div>
          <div className="form-grid">
            <Field label={labels.language}>
              <select
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    language: event.target.value as Language
                  }))
                }
                value={config.language}
              >
                <option value="en">English</option>
                <option value="es">Espanol</option>
              </select>
            </Field>
            <Field label={labels.layout}>
              <select
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    layout: event.target.value as PlaygroundConfig["layout"]
                  }))
                }
                value={config.layout}
              >
                <option value="centered">{labels.centered}</option>
                <option value="wide">{labels.wide}</option>
              </select>
            </Field>
            <Field label={labels.title}>
              <input
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    title: event.target.value
                  }))
                }
                value={config.title}
              />
            </Field>
            <Field label={labels.description}>
              <textarea
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    description: event.target.value
                  }))
                }
                rows={4}
                value={config.description}
              />
            </Field>
            <Field label={labels.placeholder}>
              <input
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    placeholder: event.target.value
                  }))
                }
                value={config.placeholder}
              />
            </Field>
            <Field label={labels.noResults}>
              <input
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    noResults: event.target.value
                  }))
                }
                value={config.noResults}
              />
            </Field>
            <ColorField
              label={labels.accent}
              onChange={(value) =>
                setConfig((current) => ({
                  ...current,
                  accentColor: value
                }))
              }
              value={config.accentColor}
            />
            <ColorField
              label={labels.surface}
              onChange={(value) =>
                setConfig((current) => ({
                  ...current,
                  backgroundColor: value
                }))
              }
              value={config.backgroundColor}
            />
            <ColorField
              label={labels.text}
              onChange={(value) =>
                setConfig((current) => ({
                  ...current,
                  textColor: value
                }))
              }
              value={config.textColor}
            />
            <ColorField
              label={labels.border}
              onChange={(value) =>
                setConfig((current) => ({
                  ...current,
                  borderColor: value
                }))
              }
              value={config.borderColor}
            />
            <Field label={labels.radius}>
              <input
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    radius: event.target.value
                  }))
                }
                value={config.radius}
              />
            </Field>
            <Field label={labels.shortcut}>
              <input
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    shortcut: event.target.value
                  }))
                }
                value={config.shortcut}
              />
            </Field>
          </div>
        </section>

        <section className="panel code-panel">
          <div className="panel-heading row-between">
            <div>
              <p className="eyebrow">{labels.code}</p>
              <h2>{labels.reactCode}</h2>
            </div>
            <button className="ghost-button" onClick={() => void copyCode()} type="button">
              {labels.copy}
            </button>
          </div>
          <div className="tab-row">
            <button
              className={activeTab === "react" ? "tab active" : "tab"}
              onClick={() => setActiveTab("react")}
              type="button"
            >
              {labels.reactCode}
            </button>
            <button
              className={activeTab === "css" ? "tab active" : "tab"}
              onClick={() => setActiveTab("css")}
              type="button"
            >
              {labels.cssCode}
            </button>
            <button
              className={activeTab === "tailwind" ? "tab active" : "tab"}
              onClick={() => setActiveTab("tailwind")}
              type="button"
            >
              {labels.tailwindCode}
            </button>
          </div>
          <pre className="code-block">
            <code>{code}</code>
          </pre>
        </section>
      </main>
    </div>
  );
}

function Field({
  children,
  label
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ColorField({
  label,
  onChange,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="color-field">
        <input onChange={(event) => onChange(event.target.value)} type="color" value={value} />
        <input onChange={(event) => onChange(event.target.value)} value={value} />
      </div>
    </label>
  );
}

