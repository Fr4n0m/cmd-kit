import React from "react";

import type { SnippetTab } from "../playground-state";
import type { PlaygroundLabels } from "../ui";

interface PlaygroundCodePanelProps {
  activeTab: SnippetTab;
  code: string;
  labels: PlaygroundLabels;
  onCopy: () => void;
  onSelectTab: (tab: SnippetTab) => void;
}

export function PlaygroundCodePanel({
  activeTab,
  code,
  labels,
  onCopy,
  onSelectTab
}: PlaygroundCodePanelProps) {
  return (
    <section className="panel code-panel">
      <div className="panel-heading row-between">
        <div>
          <p className="eyebrow">{labels.code}</p>
          <h2>{labels.reactCode}</h2>
        </div>
        <button className="ghost-button" onClick={onCopy} type="button">
          {labels.copy}
        </button>
      </div>
      <div className="tab-row">
        <button
          className={activeTab === "react" ? "tab active" : "tab"}
          onClick={() => onSelectTab("react")}
          type="button"
        >
          {labels.reactCode}
        </button>
        <button
          className={activeTab === "css" ? "tab active" : "tab"}
          onClick={() => onSelectTab("css")}
          type="button"
        >
          {labels.cssCode}
        </button>
        <button
          className={activeTab === "tailwind" ? "tab active" : "tab"}
          onClick={() => onSelectTab("tailwind")}
          type="button"
        >
          {labels.tailwindCode}
        </button>
      </div>
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </section>
  );
}
