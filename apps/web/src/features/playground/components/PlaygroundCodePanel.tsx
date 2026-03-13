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

  async function handleCopy() {
    setCopyMessage((await onCopy()) ? `${labels.copy} ready` : "Copy failed");
  }

  return (
    <section className="panel code-panel">
      <div className="panel-heading row-between">
        <div>
          <p className="eyebrow">{labels.code}</p>
          <h2>{labels.reactCode}</h2>
        </div>
        <button className="ghost-button" onClick={() => void handleCopy()} type="button">
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
      <pre className="code-block" id={panelId} role="tabpanel">
        <code>{code}</code>
      </pre>
    </section>
  );
}
