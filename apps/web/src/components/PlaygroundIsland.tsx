import { type ReactNode, useMemo, useState } from "react";

import { CommandPalette } from "@cmd-kit/react";

import {
  createItem,
  createSection,
  defaultConfig,
  toTheme,
  type PlaygroundConfig
} from "../features/playground/config";
import {
  buildCssSnippet,
  buildReactSnippet,
  buildTailwindSnippet
} from "../features/playground/snippets";
import { playgroundLabels } from "../features/playground/ui";

export default function PlaygroundIsland() {
  const [config, setConfig] = useState<PlaygroundConfig>(defaultConfig);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"react" | "css" | "tailwind">(
    "react"
  );
  const labels = playgroundLabels[config.language];

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

  function updateSection(
    sectionId: string,
    updater: (
      section: PlaygroundConfig["sections"][number]
    ) => PlaygroundConfig["sections"][number]
  ) {
    setConfig((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId ? updater(section) : section
      )
    }));
  }

  function removeSection(sectionId: string) {
    setConfig((current) => ({
      ...current,
      sections: current.sections.filter((section) => section.id !== sectionId)
    }));
  }

  function addSectionToConfig() {
    setConfig((current) => ({
      ...current,
      sections: [...current.sections, createSection()]
    }));
  }

  function addItemToSection(sectionId: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: [...section.items, createItem()]
    }));
  }

  function updateItem(
    sectionId: string,
    itemId: string,
    updater: (
      item: PlaygroundConfig["sections"][number]["items"][number]
    ) => PlaygroundConfig["sections"][number]["items"][number]
  ) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.map((item) =>
        item.id === itemId ? updater(item) : item
      )
    }));
  }

  function removeItem(sectionId: string, itemId: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.filter((item) => item.id !== itemId)
    }));
  }

  return (
    <section className="playground-shell" id="playground">
      <CommandPalette
        messages={{
          closeLabel: config.closeLabel,
          noResults: config.noResults,
          searchPlaceholder: config.placeholder
        }}
        onOpenChange={setIsOpen}
        open={isOpen}
        recents={
          config.recentsEnabled
            ? {
                limit: config.recentsLimit,
                sectionTitle: config.recentsTitle
              }
            : false
        }
        sections={config.sections}
        shortcut={config.shortcut}
        theme={toTheme(config)}
        title="cmd+kit preview"
      />

      <div className="playground-header">
        <div>
          <p className="eyebrow">{labels.preview}</p>
          <h2>Live configurator</h2>
        </div>
        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={() => setIsOpen(true)}
            type="button"
          >
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

      <div className="workspace-grid">
        <section className="panel">
          <div className="panel-heading">
            <p className="eyebrow">{labels.config}</p>
            <h2>cmd+kit</h2>
          </div>
          <div className="playground-preview-card">
            <span className="preview-shortcut">{config.shortcut}</span>
            <span className="preview-title">cmd+kit</span>
            <span className="preview-subtitle">{config.placeholder}</span>
          </div>
          <div className="form-grid">
            <Field label={labels.language}>
              <select
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    language: event.target.value as PlaygroundConfig["language"]
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
            <Field label={labels.recents}>
              <select
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    recentsEnabled: event.target.value === "true"
                  }))
                }
                value={String(config.recentsEnabled)}
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            </Field>
            <Field label={labels.recentsTitle}>
              <input
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    recentsTitle: event.target.value
                  }))
                }
                value={config.recentsTitle}
              />
            </Field>
            <Field label={labels.recentsLimit}>
              <input
                min={1}
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    recentsLimit: Number(event.target.value) || 1
                  }))
                }
                type="number"
                value={config.recentsLimit}
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
            <Field label={labels.closeLabel}>
              <input
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    closeLabel: event.target.value
                  }))
                }
                value={config.closeLabel}
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
              label={labels.muted}
              onChange={(value) =>
                setConfig((current) => ({
                  ...current,
                  mutedColor: value
                }))
              }
              value={config.mutedColor}
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
            <ColorField
              label={labels.overlay}
              onChange={(value) =>
                setConfig((current) => ({
                  ...current,
                  overlayColor: value
                }))
              }
              value={config.overlayColor}
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
            <Field label={labels.shadow}>
              <input
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    shadow: event.target.value
                  }))
                }
                value={config.shadow}
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
          <div className="section-builder">
            <div className="row-between builder-header">
              <div>
                <p className="eyebrow">{labels.sections}</p>
              </div>
              <button
                className="ghost-button"
                onClick={addSectionToConfig}
                type="button"
              >
                {labels.addSection}
              </button>
            </div>
            <div className="section-list">
              {config.sections.map((section) => (
                <div className="section-card" key={section.id}>
                  <div className="row-between">
                    <Field label={labels.sectionTitle}>
                      <input
                        onChange={(event) =>
                          updateSection(section.id, (current) => ({
                            ...current,
                            title: event.target.value
                          }))
                        }
                        value={section.title}
                      />
                    </Field>
                    <button
                      className="inline-button"
                      onClick={() => removeSection(section.id)}
                      type="button"
                    >
                      {labels.remove}
                    </button>
                  </div>
                  <div className="section-items">
                    {section.items.map((item) => (
                      <div className="item-card" key={item.id}>
                        <div className="item-grid">
                          <Field label={labels.itemTitle}>
                            <input
                              onChange={(event) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...current,
                                  title: event.target.value
                                }))
                              }
                              value={item.title}
                            />
                          </Field>
                          <Field label={labels.itemIcon}>
                            <input
                              onChange={(event) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...current,
                                  icon: event.target.value
                                }))
                              }
                              value={item.icon ?? ""}
                            />
                          </Field>
                          <Field label={labels.itemSubtitle}>
                            <input
                              onChange={(event) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...current,
                                  subtitle: event.target.value
                                }))
                              }
                              value={item.subtitle ?? ""}
                            />
                          </Field>
                          <Field label={labels.itemShortcut}>
                            <input
                              onChange={(event) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...current,
                                  shortcut: event.target.value
                                }))
                              }
                              value={item.shortcut ?? ""}
                            />
                          </Field>
                          <Field label={labels.itemHref}>
                            <input
                              onChange={(event) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...current,
                                  href: event.target.value
                                }))
                              }
                              value={item.href ?? ""}
                            />
                          </Field>
                          <Field label={labels.itemKeywords}>
                            <input
                              onChange={(event) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...current,
                                  keywords: event.target.value
                                    .split(",")
                                    .map((entry) => entry.trim())
                                    .filter(Boolean)
                                }))
                              }
                              value={(item.keywords ?? []).join(", ")}
                            />
                          </Field>
                        </div>
                        <div className="row-between">
                          <label className="toggle-field">
                            <input
                              checked={item.disabled ?? false}
                              onChange={(event) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...current,
                                  disabled: event.target.checked
                                }))
                              }
                              type="checkbox"
                            />
                            <span>{labels.itemDisabled}</span>
                          </label>
                          <button
                            className="inline-button"
                            onClick={() => removeItem(section.id, item.id)}
                            type="button"
                          >
                            {labels.remove}
                          </button>
                        </div>
                        <div className="item-meta">{item.id}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="ghost-button full-width"
                    onClick={() => addItemToSection(section.id)}
                    type="button"
                  >
                    {labels.addItem}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel code-panel">
          <div className="panel-heading row-between">
            <div>
              <p className="eyebrow">{labels.code}</p>
              <h2>{labels.reactCode}</h2>
            </div>
            <button
              className="ghost-button"
              onClick={() => void copyCode()}
              type="button"
            >
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
      </div>
    </section>
  );
}

function Field({ children, label }: { children: ReactNode; label: string }) {
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
        <input
          onChange={(event) => onChange(event.target.value)}
          type="color"
          value={value}
        />
        <input
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
    </label>
  );
}
