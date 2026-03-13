import "./style.css";

import {
  createCommandSnapshot,
  createResolvedConfig,
  dispatchCommandExecution,
  recordRecentCommand,
  resolveRecentCommands,
  type CommandItem,
  type CommandItemRecord,
  type CommandSection
} from "@cmd-kit/core";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Missing #app root");
}

const rootSections: CommandSection[] = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      {
        id: "dashboard",
        title: "Go to dashboard",
        subtitle: "Open the main workspace view",
        href: "/dashboard",
        icon: "D",
        keywords: ["home", "workspace"]
      }
    ]
  },
  {
    id: "actions",
    title: "Actions",
    items: [
      {
        id: "search",
        title: "Search docs",
        subtitle: "Navigate into the docs scope",
        icon: "S",
        children: [
          {
            id: "search-scope",
            title: "Search scope",
            items: [
              { id: "guides", title: "Guides", icon: "G" },
              { id: "api", title: "API", icon: "A" }
            ]
          }
        ]
      },
      {
        id: "toggle-theme",
        title: "Toggle theme preset",
        subtitle: "Run a local callback from the core",
        icon: "T",
        onSelect: () => {
          state.status = "Theme preset callback executed";
        }
      }
    ]
  }
];

const state = {
  activeIndex: 0,
  navigationStack: [] as Array<{ sections: CommandSection[]; title: string }>,
  open: false,
  query: "",
  recentRecords: [] as CommandItemRecord[],
  status: "Press Cmd/Ctrl + K to open the palette."
};

function getActiveTitle() {
  return state.navigationStack.at(-1)?.title ?? "Vanilla browser commands";
}

function getActiveSections() {
  return state.navigationStack.at(-1)?.sections ?? rootSections;
}

function getResolvedSections() {
  const recentItems = resolveRecentCommands(
    createResolvedConfig({ sections: rootSections }).items,
    state.recentRecords
  );
  const activeSections = getActiveSections();

  if (!recentItems.length || state.navigationStack.length > 0) {
    return activeSections;
  }

  return [
    {
      id: "recent",
      title: "Recent",
      items: recentItems.map((item) => ({
        ...item,
        section: undefined
      }))
    },
    ...activeSections
  ];
}

function getSnapshot() {
  return createCommandSnapshot(
    createResolvedConfig({
      messages: {
        closeLabel: "Close command palette",
        noResults: "No commands match your search.",
        placeholder: "Search commands..."
      },
      sections: getResolvedSections(),
      shortcut: "mod+k",
      theme: {
        accentColor: "#ff6b35",
        backgroundColor: "#0f172a",
        borderColor: "#334155",
        mutedColor: "rgba(226, 232, 240, 0.72)",
        overlayColor: "rgba(2, 6, 23, 0.72)",
        radius: "24px",
        shadow: "0 32px 120px rgba(0, 0, 0, 0.35)",
        textColor: "#f8fafc"
      },
      title: getActiveTitle()
    }),
    state.query
  );
}

function getInteractiveItems(snapshot = getSnapshot()) {
  return snapshot.items.filter((item) => !item.disabled);
}

function setOpen(nextOpen: boolean) {
  state.open = nextOpen;

  if (!nextOpen) {
    state.query = "";
    state.activeIndex = 0;
    state.navigationStack = [];
  }

  render();
}

async function runItem(item: CommandItem | undefined) {
  await dispatchCommandExecution({
    item,
    port: {
      navigate: ({ sections, title }) => {
        state.navigationStack.push({ sections, title });
        state.query = "";
        state.activeIndex = 0;
      },
      openHref: ({ href, item: currentItem }) => {
        recordRecent(currentItem);
        state.status = `Would navigate to ${href}`;
        setOpen(false);
      },
      runCallback: async ({ callback, item: currentItem }) => {
        recordRecent(currentItem);
        await callback();
        setOpen(false);
      }
    }
  });

  render();
}

function recordRecent(item: CommandItem) {
  state.recentRecords = recordRecentCommand({
    current: state.recentRecords,
    itemId: item.id,
    limit: 5
  });
}

function goBack() {
  state.navigationStack = state.navigationStack.slice(0, -1);
  state.query = "";
  state.activeIndex = 0;
  render();
}

function handleGlobalKeydown(event: KeyboardEvent) {
  const isMac = navigator.userAgent.includes("Mac");
  const modPressed = isMac ? event.metaKey : event.ctrlKey;

  if (!state.open && modPressed && event.key.toLowerCase() === "k") {
    event.preventDefault();
    setOpen(true);
    return;
  }

  if (!state.open) {
    return;
  }

  const snapshot = getSnapshot();
  const items = getInteractiveItems(snapshot);

  if (event.key === "Escape") {
    event.preventDefault();
    if (state.navigationStack.length) {
      goBack();
      return;
    }

    setOpen(false);
    return;
  }

  if (event.key === "Backspace" && !state.query && state.navigationStack.length) {
    event.preventDefault();
    goBack();
    return;
  }

  if (event.key === "ArrowDown" && items.length) {
    event.preventDefault();
    state.activeIndex = (state.activeIndex + 1) % items.length;
    render();
    return;
  }

  if (event.key === "ArrowUp" && items.length) {
    event.preventDefault();
    state.activeIndex = (state.activeIndex - 1 + items.length) % items.length;
    render();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    void runItem(items[state.activeIndex]);
  }
}

function render() {
  const snapshot = getSnapshot();
  const items = getInteractiveItems(snapshot);
  const activeItemId = items[state.activeIndex]?.id;

  root.innerHTML = `
    <main class="shell">
      <section class="hero">
        <span class="badge">Vanilla browser example</span>
        <h1>Use the cmd+kit core without a framework UI adapter.</h1>
        <p>
          This sample renders a lightweight command palette with plain DOM updates and the shared
          core primitives for snapshot building, fuzzy search, nested navigation, execution, and
          recent commands.
        </p>
        <button class="ghost-button" data-action="open" type="button">Open palette</button>
        <p class="status" aria-live="polite">${escapeHtml(state.status)}</p>
      </section>
      ${
        state.open
          ? `
        <div class="overlay" role="presentation">
          <section aria-label="Vanilla command palette" aria-modal="true" class="palette" role="dialog">
            <div class="palette-header">
              <input
                aria-label="Search commands"
                autofocus
                id="palette-query"
                placeholder="${escapeHtml(snapshot.messages.placeholder)}"
                value="${escapeHtml(state.query)}"
              />
              <div class="header-actions">
                ${
                  state.navigationStack.length
                    ? '<button class="ghost-button" data-action="back" type="button">Back</button>'
                    : ""
                }
                <button class="ghost-button" data-action="close" type="button">Close</button>
              </div>
            </div>
            <div class="palette-body">
              ${renderSections(snapshot.sections, activeItemId)}
            </div>
          </section>
        </div>
      `
          : ""
      }
    </main>
  `;

  root.querySelector<HTMLButtonElement>('[data-action="open"]')?.addEventListener("click", () => {
    setOpen(true);
  });
  root.querySelector<HTMLButtonElement>('[data-action="close"]')?.addEventListener("click", () => {
    setOpen(false);
  });
  root.querySelector<HTMLButtonElement>('[data-action="back"]')?.addEventListener("click", () => {
    goBack();
  });
  root.querySelector<HTMLInputElement>("#palette-query")?.addEventListener("input", (event) => {
    state.query = event.currentTarget.value;
    state.activeIndex = 0;
    render();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-item-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = items.find((item) => item.id === button.dataset.itemId);
      state.activeIndex = items.findIndex((item) => item.id === button.dataset.itemId);
      void runItem(selected);
    });
  });
}

function renderSections(sections: CommandSection[], activeItemId: string | undefined) {
  const content = sections
    .map((section) => {
      const items = section.items
        .map((item) => {
          const meta = [item.shortcut, item.href ? "link" : "", item.children?.length ? "nested" : ""]
            .filter(Boolean)
            .join(" · ");

          return `
            <button
              ${item.disabled ? "disabled" : ""}
              aria-selected="${item.id === activeItemId}"
              class="item-button"
              data-item-id="${escapeHtml(item.id)}"
              type="button"
            >
              <span class="item-main">
                <span class="shortcut-chip">${escapeHtml(item.icon ?? "•")}</span>
                <span class="item-copy">
                  <strong>${escapeHtml(item.title)}</strong>
                  <span>${escapeHtml(item.subtitle ?? "")}</span>
                </span>
              </span>
              <span class="item-meta">${escapeHtml(meta)}</span>
            </button>
          `;
        })
        .join("");

      return `
        <section class="section">
          <h2 class="section-title">${escapeHtml(section.title)}</h2>
          <div class="item-list">${items}</div>
        </section>
      `;
    })
    .join("");

  return (
    content ||
    `<p class="status" aria-live="polite">${escapeHtml(getSnapshot().messages.noResults)}</p>`
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

window.addEventListener("keydown", handleGlobalKeydown);

render();
