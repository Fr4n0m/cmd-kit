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

type CodeTokenType =
  | "plain"
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "tag"
  | "attribute"
  | "operator";

interface CodeToken {
  type: CodeTokenType;
  value: string;
}

const languageKeywords: Record<SnippetTab, string[]> = {
  react: [
    "import",
    "from",
    "const",
    "return",
    "export",
    "function",
    "async",
    "await",
    "if",
    "else",
    "true",
    "false"
  ],
  vue: [
    "import",
    "from",
    "const",
    "return",
    "export",
    "function",
    "async",
    "await",
    "if",
    "else",
    "true",
    "false",
    "setup"
  ],
  preact: [
    "import",
    "from",
    "const",
    "return",
    "export",
    "function",
    "async",
    "await",
    "if",
    "else",
    "true",
    "false"
  ],
  astro: [
    "import",
    "from",
    "const",
    "return",
    "export",
    "function",
    "async",
    "await",
    "if",
    "else",
    "true",
    "false"
  ],
  vanilla: [
    "import",
    "from",
    "const",
    "let",
    "return",
    "export",
    "function",
    "async",
    "await",
    "if",
    "else",
    "true",
    "false",
    "new"
  ]
};

const operatorPattern = /^([{}()[\].,;:+\-*/=<>!?|&]+)/;

function tokenizeLine(line: string, tab: SnippetTab): CodeToken[] {
  const tokens: CodeToken[] = [];
  const keywords = languageKeywords[tab];
  let rest = line;

  while (rest.length > 0) {
    const comment = rest.match(/^(\/\/.*|\/\*.*\*\/)/);
    if (comment) {
      tokens.push({ type: "comment", value: comment[0] });
      break;
    }

    const stringLiteral = rest.match(/^("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`)/);
    if (stringLiteral) {
      tokens.push({ type: "string", value: stringLiteral[0] });
      rest = rest.slice(stringLiteral[0].length);
      continue;
    }

    const jsxTag = rest.match(/^(<\/?[A-Za-z][A-Za-z0-9:-]*)/);
    if (jsxTag) {
      tokens.push({ type: "tag", value: jsxTag[0] });
      rest = rest.slice(jsxTag[0].length);
      continue;
    }

    const attribute = rest.match(/^([A-Za-z_][A-Za-z0-9_-]*)(?==)/);
    if (attribute) {
      tokens.push({ type: "attribute", value: attribute[0] });
      rest = rest.slice(attribute[0].length);
      continue;
    }

    const number = rest.match(/^(\d+(?:\.\d+)?)/);
    if (number) {
      tokens.push({ type: "number", value: number[0] });
      rest = rest.slice(number[0].length);
      continue;
    }

    const keyword = rest.match(/^([A-Za-z_][A-Za-z0-9_]*)/);
    if (keyword) {
      const value = keyword[0];
      tokens.push({
        type: keywords.includes(value) ? "keyword" : "plain",
        value
      });
      rest = rest.slice(value.length);
      continue;
    }

    const operator = rest.match(operatorPattern);
    if (operator) {
      tokens.push({ type: "operator", value: operator[0] });
      rest = rest.slice(operator[0].length);
      continue;
    }

    tokens.push({ type: "plain", value: rest[0] });
    rest = rest.slice(1);
  }

  return tokens;
}

function tokenizeCode(code: string, tab: SnippetTab): CodeToken[][] {
  return code.split("\n").map((line) => tokenizeLine(line, tab));
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
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");
  const [isExpanded, setIsExpanded] = useState(false);
  const copyResetTimeoutRef = React.useRef<number | null>(null);
  const tokenizedLines = React.useMemo(() => tokenizeCode(code, activeTab), [code, activeTab]);
  const heading =
    activeTab === "react"
      ? labels.reactCode
      : activeTab === "vue"
        ? labels.vueCode
        : activeTab === "preact"
          ? labels.preactCode
          : activeTab === "astro"
            ? labels.astroCode
            : labels.vanillaCode;

  React.useEffect(
    () => () => {
      if (copyResetTimeoutRef.current !== null) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
    },
    []
  );

  async function handleCopy() {
    const copied = await onCopy();
    setCopyMessage(copied ? labels.copyReady : labels.copyFailed);
    setCopyState(copied ? "success" : "error");

    if (copyResetTimeoutRef.current !== null) {
      window.clearTimeout(copyResetTimeoutRef.current);
    }

    copyResetTimeoutRef.current = window.setTimeout(() => {
      setCopyState("idle");
      setCopyMessage("");
      copyResetTimeoutRef.current = null;
    }, 1600);
  }

  const editorClassName = `code-editor-shell tech-${activeTab} ${
    isExpanded ? "is-expanded" : "is-collapsed"
  }`;

  return (
    <section className="panel code-panel">
      <div className="panel-heading row-between">
        <div>
          <p className="eyebrow">{labels.code}</p>
          <h2>{heading}</h2>
          <p className="panel-copy">{labels.codeDescription}</p>
        </div>
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
      </div>
      <div className="code-panel-meta">
        <span className="code-chip">{labels.codeExportLabel}</span>
        <strong>{heading}</strong>
        <span>{labels.codeLiveOutput}</span>
      </div>
      <div className={editorClassName}>
        <div className="code-collapse is-open">
          <div className="code-collapse-inner">
            <button
              className={`ghost-button compact-button code-copy-button ${
                copyState === "success"
                  ? "is-success"
                  : copyState === "error"
                    ? "is-error"
                    : ""
              }`}
              onClick={() => void handleCopy()}
              type="button"
            >
              <Icon
                className={
                  copyState === "success"
                    ? "button-icon copy-icon copy-icon-success"
                    : "button-icon copy-icon"
                }
                name={copyState === "success" ? "check" : "copy"}
              />
              <span>
                {copyState === "success"
                  ? labels.copyReady
                  : copyState === "error"
                    ? labels.copyFailed
                    : labels.copy}
              </span>
            </button>
            <pre
              className={isExpanded ? "code-block is-expanded" : "code-block is-collapsed"}
              id={panelId}
              role="tabpanel"
            >
              <code>
                {tokenizedLines.map((line, lineIndex) => (
                  <span className="code-line" key={`line-${lineIndex}`}>
                    <span aria-hidden="true" className="code-line-number">
                      {lineIndex + 1}
                    </span>
                    <span className="code-line-content">
                      {line.length === 0 ? " " : null}
                      {line.map((token, tokenIndex) => (
                        <span
                          className={`code-token code-token-${token.type}`}
                          key={`token-${lineIndex}-${tokenIndex}`}
                        >
                          {token.value}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
            {!isExpanded ? <div aria-hidden="true" className="code-fade-mask" /> : null}
            <button
              aria-controls={panelId}
              aria-expanded={isExpanded}
              className="ghost-button compact-button code-toggle-button"
              onClick={() => setIsExpanded((current) => !current)}
              type="button"
            >
              <Icon
                className={
                  isExpanded
                    ? "button-icon code-toggle-icon is-open"
                    : "button-icon code-toggle-icon"
                }
                name="triangle-down"
              />
              <span>{isExpanded ? labels.hideCode : labels.showCode}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

