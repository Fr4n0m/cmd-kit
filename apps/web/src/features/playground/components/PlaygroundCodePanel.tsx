import React, { useId, useState } from "react";

import type { SnippetTab } from "../playground-state";
import type { PlaygroundLabels } from "../ui";

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
          : activeTab === "vanilla"
            ? labels.vanillaCode
          : activeTab === "css"
            ? labels.cssCode
            : activeTab === "tailwind"
              ? labels.tailwindCode
              : labels.jsonCode;

  async function handleCopy() {
    setCopyMessage((await onCopy()) ? `${labels.copy} ready` : "Copy failed");
  }

  return (
    <section className="panel code-panel">
      <div className="panel-heading row-between">
        <div>
          <p className="eyebrow">{labels.code}</p>
          <h2>{heading}</h2>
          <p className="panel-copy">
            Switch frameworks, copy the snippet, and keep the same command structure.
          </p>
        </div>
        <button className="ghost-button compact-button" onClick={() => void handleCopy()} type="button">
          {labels.copy}
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
          {labels.reactCode}
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
          {labels.vueCode}
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
          {labels.preactCode}
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
          {labels.vanillaCode}
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
          {labels.cssCode}
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
          {labels.tailwindCode}
        </button>
        <button
          aria-controls={panelId}
          aria-selected={activeTab === "json"}
          className={activeTab === "json" ? "tab active" : "tab"}
          onClick={() => onSelectTab("json")}
          role="tab"
          tabIndex={activeTab === "json" ? 0 : -1}
          type="button"
        >
          {labels.jsonCode}
        </button>
      </div>
      <div className="code-panel-meta">
        <span className="code-chip">Export</span>
        <strong>{heading}</strong>
        <span>Live output from the current configurator state</span>
      </div>
      <pre className="code-block" id={panelId} role="tabpanel">
        <code>{code}</code>
      </pre>
    </section>
  );
}
