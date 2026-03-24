import React, { useId, useState } from "react";

import { Icon } from "@/components/icons/PlaygroundIcon";
import type { SnippetTab } from "@/features/playground/playground-state";
import type { PlaygroundLabels } from "@/features/playground/ui";

interface PlaygroundCodePanelProps {
  activeTab: SnippetTab;
  code: string;
  labels: PlaygroundLabels;
  onCopy: () => Promise<boolean>;
  onSelectTab: (tab: SnippetTab) => void;
}

export function PlaygroundCodePanel({
  activeTab,
  code,
  labels,
  onCopy,
  onSelectTab
}: PlaygroundCodePanelProps) {
  const panelId = useId();
  const [copyMessage, setCopyMessage] = useState("");
  const heading =
    activeTab === "react"
      ? labels.reactCode
      : activeTab === "vue"
        ? labels.vueCode
        : activeTab === "preact"
          ? labels.preactCode
          : activeTab === "astro"
            ? labels.astroCode
          : activeTab === "vanilla"
            ? labels.vanillaCode
          : activeTab === "css"
            ? labels.cssCode
            : labels.tailwindCode;

  async function handleCopy() {
    setCopyMessage((await onCopy()) ? labels.copyReady : labels.copyFailed);
  }

  return (
    <section className="panel code-panel">
      <div className="panel-heading row-between">
        <div>
          <p className="eyebrow">{labels.code}</p>
          <h2>{heading}</h2>
          <p className="panel-copy">{labels.codeDescription}</p>
        </div>
        <button className="ghost-button compact-button" onClick={() => void handleCopy()} type="button">
          <Icon className="button-icon" name="copy" />
          <span>{labels.copy}</span>
        </button>
      </div>
      <p aria-live="polite" className="visually-hidden">
        {copyMessage}
      </p>
      <div aria-label={labels.code} className="tab-row" role="tablist">
        <button
          aria-controls={panelId}
          aria-selected={activeTab === "react"}
          className={activeTab === "react" ? "tab active" : "tab"}
          onClick={() => onSelectTab("react")}
          role="tab"
          tabIndex={activeTab === "react" ? 0 : -1}
          type="button"
        >
          <Icon className="tech-icon" name="react" />
          <span>{labels.reactCode}</span>
        </button>
        <button
          aria-controls={panelId}
          aria-selected={activeTab === "vue"}
          className={activeTab === "vue" ? "tab active" : "tab"}
          onClick={() => onSelectTab("vue")}
          role="tab"
          tabIndex={activeTab === "vue" ? 0 : -1}
          type="button"
        >
          <Icon className="tech-icon" name="vue" />
          <span>{labels.vueCode}</span>
        </button>
        <button
          aria-controls={panelId}
          aria-selected={activeTab === "preact"}
          className={activeTab === "preact" ? "tab active" : "tab"}
          onClick={() => onSelectTab("preact")}
          role="tab"
          tabIndex={activeTab === "preact" ? 0 : -1}
          type="button"
        >
          <Icon className="tech-icon" name="preact" />
          <span>{labels.preactCode}</span>
        </button>
        <button
          aria-controls={panelId}
          aria-selected={activeTab === "astro"}
          className={activeTab === "astro" ? "tab active" : "tab"}
          onClick={() => onSelectTab("astro")}
          role="tab"
          tabIndex={activeTab === "astro" ? 0 : -1}
          type="button"
        >
          <Icon className="tech-icon" name="astro" />
          <span>{labels.astroCode}</span>
        </button>
        <button
          aria-controls={panelId}
          aria-selected={activeTab === "vanilla"}
          className={activeTab === "vanilla" ? "tab active" : "tab"}
          onClick={() => onSelectTab("vanilla")}
          role="tab"
          tabIndex={activeTab === "vanilla" ? 0 : -1}
          type="button"
        >
          <Icon className="tech-icon" name="vanilla" />
          <span>{labels.vanillaCode}</span>
        </button>
        <button
          aria-controls={panelId}
          aria-selected={activeTab === "css"}
          className={activeTab === "css" ? "tab active" : "tab"}
          onClick={() => onSelectTab("css")}
          role="tab"
          tabIndex={activeTab === "css" ? 0 : -1}
          type="button"
        >
          <Icon className="tech-icon" name="code" />
          <span>{labels.cssCode}</span>
        </button>
        <button
          aria-controls={panelId}
          aria-selected={activeTab === "tailwind"}
          className={activeTab === "tailwind" ? "tab active" : "tab"}
          onClick={() => onSelectTab("tailwind")}
          role="tab"
          tabIndex={activeTab === "tailwind" ? 0 : -1}
          type="button"
        >
          <Icon className="tech-icon tech-icon-tailwind" name="tailwind" />
          <span>{labels.tailwindCode}</span>
        </button>
      </div>
      <div className="code-panel-meta">
        <span className="code-chip">{labels.codeExportLabel}</span>
        <strong>{heading}</strong>
        <span>{labels.codeLiveOutput}</span>
      </div>
      <pre className="code-block" id={panelId} role="tabpanel">
        <code>{code}</code>
      </pre>
    </section>
  );
}

