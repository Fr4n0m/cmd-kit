import {
  createCommandSnapshot,
  createResolvedConfig,
  dispatchCommandExecution,
  loadCommandSource,
  recordRecentCommand,
  resolveRecentCommands,
  type CommandItem,
  type CommandItemRecord,
  type CommandMessages,
  type CommandSection,
  type CommandSource,
  type CommandTheme
} from "@cmd-kit/core";

const STYLE_ID = "cmdkit-vanilla-styles";
const ROOT_CLASS = "cmdkit-vanilla-root";

const defaultLightTheme: CommandTheme = {
  accentColor: "#0fa6d8",
  backgroundColor: "#ffffff",
  textColor: "#0e1720",
  mutedColor: "rgba(49, 68, 84, 0.78)",
  borderColor: "rgba(83, 112, 136, 0.16)",
  overlayColor: "rgba(232, 241, 248, 0.7)",
  radius: "22px",
  shadow: "0 20px 44px rgba(40, 64, 81, 0.14)"
};

const defaultDarkTheme: CommandTheme = {
  accentColor: "#35d7ff",
  backgroundColor: "#0b1116",
  textColor: "#eff7fb",
  mutedColor: "rgba(172, 192, 207, 0.74)",
  borderColor: "rgba(129, 155, 174, 0.16)",
  overlayColor: "rgba(6, 10, 14, 0.74)",
  radius: "22px",
  shadow: "0 24px 80px rgba(0, 0, 0, 0.42)"
};

const defaultDemoSections: CommandSection[] = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      {
        id: "demo-overview",
        title: "Overview",
        subtitle: "Open the workspace overview",
        shortcut: "mod+o"
      },
      {
        id: "demo-projects",
        title: "Projects",
        subtitle: "Jump to your active projects",
        shortcut: "mod+p"
      },
      {
        id: "demo-resources",
        title: "Resources",
        subtitle: "Guides and references for the team",
        children: [
          {
            id: "demo-resources-sections",
            title: "Resources",
            items: [
              {
                id: "demo-guides",
                title: "Guides",
                subtitle: "Implementation walkthroughs"
              },
              {
                id: "demo-api-reference",
                title: "API reference",
                subtitle: "Props, events, and renderers"
              },
              {
                id: "demo-release-notes",
                title: "Release notes",
                subtitle: "Recent updates and breaking changes"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "commands",
    title: "Commands",
    items: [
      {
        id: "demo-open-search",
        title: "Search across project",
        subtitle: "Open the global search flow",
        shortcut: "mod+shift+p"
      },
      {
        id: "demo-create-command",
        title: "Create command",
        subtitle: "Create a new command entry",
        shortcut: "mod+n"
      },
      {
        id: "demo-toggle-theme",
        title: "Toggle theme",
        subtitle: "Switch between light and dark mode",
        shortcut: "mod+j"
      },
      {
        id: "demo-settings",
        title: "Settings",
        subtitle: "Open workspace settings",
        children: [
          {
            id: "demo-settings-sections",
            title: "Settings",
            items: [
              {
                id: "demo-profile-settings",
                title: "Profile",
                subtitle: "Update account details and preferences"
              },
              {
                id: "demo-keyboard-settings",
                title: "Keyboard shortcuts",
                subtitle: "Customize command shortcuts"
              }
            ]
          }
        ]
      }
    ]
  }
];

export interface VanillaCommandPaletteOptions {
  target?: HTMLElement;
  items?: CommandItem[];
  sections?: CommandSection[];
  source?: CommandSource;
  messages?: Partial<CommandMessages>;
  theme?: CommandTheme;
  title?: string;
  shortcut?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  recents?: boolean | { limit?: number; sectionTitle?: string };
}

export interface VanillaCommandPalette {
  destroy: () => void;
  isOpen: () => boolean;
  reloadSource: () => Promise<void>;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

interface NavigationState {
  sections: CommandSection[];
  title: string;
}

const CSS_TEXT = `
.cmdkit-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  z-index: 9999;
  backdrop-filter: blur(14px);
}
.cmdkit-overlay[hidden] {
  display: none !important;
}
.cmdkit-dialog {
  width: min(700px, calc(100vw - 4rem));
  max-height: min(720px, calc(100vh - 2rem));
  overflow: hidden;
  box-sizing: border-box;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  font-family: Sora, Inter, "Segoe UI", system-ui, -apple-system, sans-serif;
}
.cmdkit-header {
  display: flex;
  justify-content: space-between;
  gap: 1.1rem;
  align-items: flex-start;
}
.cmdkit-breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0 0 0.45rem;
  color: #94a3b8;
  font-size: 0.78rem;
  font-family: "IBM Plex Mono", "Cascadia Code", "Fira Code", ui-monospace, monospace;
}
.cmdkit-title {
  margin: 0;
  font-size: 1.24rem;
  font-weight: 600;
  letter-spacing: -0.006em;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
}
.cmdkit-back {
  border: none;
  background: transparent;
  width: auto;
  height: auto;
  min-width: auto;
  min-height: auto;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 140ms ease, color 160ms ease, opacity 160ms ease;
  opacity: 0.9;
}
.cmdkit-back[hidden] {
  display: none !important;
}
.cmdkit-caption {
  margin: 0.35rem 0 0;
  color: #94a3b8;
  font-size: 0.92rem;
  font-family: Sora, Inter, "Segoe UI", system-ui, -apple-system, sans-serif;
}
.cmdkit-close {
  border-radius: 999px;
  min-width: 2.4rem;
  min-height: 2.4rem;
  padding: 0;
  display: inline-grid;
  place-items: center;
  line-height: 1;
  font-size: 0;
  font-weight: 700;
  background: transparent;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, transform 140ms ease;
}
.cmdkit-input {
  width: 100%;
  box-sizing: border-box;
  border-radius: 18px;
  padding: 1.06rem 1.22rem;
  font-size: 1rem;
  outline: none;
}
.cmdkit-list {
  overflow: auto;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cmdkit-list::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.cmdkit-section {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.cmdkit-section-title {
  margin: 0;
  color: #94a3b8;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: "IBM Plex Mono", "Cascadia Code", "Fira Code", ui-monospace, monospace;
}
.cmdkit-section-title:empty {
  display: none;
}
.cmdkit-section-items {
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
}
.cmdkit-item {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 18px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.64rem 0.86rem;
  background: transparent;
  cursor: pointer;
  color: inherit;
}
.cmdkit-item[aria-selected="true"] {
  background: rgba(53, 215, 255, 0.14);
  border-color: rgba(53, 215, 255, 0.26);
}
.cmdkit-item[disabled] {
  opacity: 0.55;
  cursor: not-allowed;
}
.cmdkit-leading {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}
.cmdkit-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.05rem;
  height: 2.05rem;
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
  transform: scale(1);
  transition: transform 160ms ease, color 160ms ease;
  color: rgba(188, 208, 223, 0.88);
}
.cmdkit-icon[data-active="true"] {
  color: #eaf8ff;
}
.cmdkit-item[aria-selected="true"] .cmdkit-icon {
  transform: scale(1.08);
}
.cmdkit-item-title {
  display: block;
  font-weight: 600;
  font-size: 0.98rem;
  line-height: 1.16;
  letter-spacing: -0.004em;
  transform: scale(1);
  transform-origin: left center;
  transition: transform 160ms ease;
  font-family: Sora, Inter, "Segoe UI", system-ui, -apple-system, sans-serif;
}
.cmdkit-item[aria-selected="true"] .cmdkit-item-title {
  transform: scale(1.03);
}
.cmdkit-subtitle {
  display: block;
  font-size: 0.86rem;
  color: #94a3b8;
  margin-top: 0.12rem;
  line-height: 1.2;
}
.cmdkit-shortcut {
  color: #94a3b8;
  font-size: 0.82rem;
  white-space: nowrap;
  font-family: "IBM Plex Mono", "Cascadia Code", "Fira Code", ui-monospace, monospace;
}
.cmdkit-empty {
  border-radius: 18px;
  border: 1px dashed currentColor;
  color: #94a3b8;
  text-align: center;
  padding: 2rem;
}
.cmdkit-dialog[data-mode="light"] .cmdkit-item[aria-selected="true"] {
  background: rgba(15, 166, 216, 0.13);
  border-color: rgba(15, 166, 216, 0.22);
}
.cmdkit-dialog[data-mode="light"] .cmdkit-title {
  color: rgba(14, 23, 32, 0.78);
}
.cmdkit-dialog[data-mode="light"] .cmdkit-section-title {
  color: rgba(49, 68, 84, 0.58);
}
.cmdkit-dialog[data-mode="light"] .cmdkit-icon {
  color: #2f546b;
}
.cmdkit-dialog[data-mode="light"] .cmdkit-icon[data-active="true"] {
  color: #0b607f;
}
.cmdkit-dialog[data-mode="light"] .cmdkit-item[aria-selected="true"] .cmdkit-item-title {
  color: #0b607f;
}
`;

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS_TEXT;
  document.head.appendChild(style);
}

function parseColorToRgb(color: string | undefined) {
  const value = String(color ?? "").trim();
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      return [
        Number.parseInt(hex[0] + hex[0], 16),
        Number.parseInt(hex[1] + hex[1], 16),
        Number.parseInt(hex[2] + hex[2], 16)
      ];
    }
    if (hex.length >= 6) {
      return [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16)
      ];
    }
  }
  const rgbMatch = value.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return [
      Number.parseInt(rgbMatch[1], 10),
      Number.parseInt(rgbMatch[2], 10),
      Number.parseInt(rgbMatch[3], 10)
    ];
  }
  return null;
}

function isLightTheme(backgroundColor: string | undefined) {
  const rgb = parseColorToRgb(backgroundColor);
  if (!rgb) return false;
  const [r, g, b] = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.72;
}

function resolveAdaptiveTheme(theme: CommandTheme | undefined) {
  if (theme) return theme;
  const rootTheme = document.documentElement.dataset.theme;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const light = rootTheme === "light" || (!rootTheme && prefersLight);
  return light ? defaultLightTheme : defaultDarkTheme;
}

function matchesShortcut(event: KeyboardEvent, shortcut: string) {
  const normalizedShortcut = String(shortcut ?? "").trim();
  if (!normalizedShortcut) return false;
  const tokens = normalizedShortcut.toLowerCase().split("+").map((token) => token.trim());
  const key = tokens.at(-1);
  if (!key || event.key.toLowerCase() !== key) return false;
  const expectsMod = tokens.includes("mod");
  const expectsCtrl = tokens.includes("ctrl");
  const expectsShift = tokens.includes("shift");
  const expectsAlt = tokens.includes("alt");
  const isMac = navigator.userAgent.includes("Mac");
  const modPressed = isMac ? event.metaKey : event.ctrlKey;
  return (
    (!expectsMod || modPressed) &&
    (!expectsCtrl || event.ctrlKey) &&
    (!expectsShift || event.shiftKey) &&
    (!expectsAlt || event.altKey)
  );
}

function prettyShortcut(shortcut: string | undefined) {
  const normalized = String(shortcut ?? "").trim();
  if (!normalized) return "";
  return normalized
    .split("+")
    .map((token) => {
      if (token === "mod") {
        return navigator.userAgent.includes("Mac") ? "Cmd" : "Ctrl";
      }
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(" + ");
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    target.isContentEditable ||
    target.getAttribute("role") === "textbox"
  );
}

function defaultBrandIconMarkup() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" width="100%" height="100%" style="display:block">
    <rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="none" stroke="currentColor" stroke-width="1.8"></rect>
    <text x="12" y="14" text-anchor="middle" fill="currentColor" font-size="7.2" font-weight="700" font-family='Inter, "Segoe UI", system-ui, -apple-system, sans-serif'>Cmd</text>
  </svg>`;
}

function toSections(items: CommandItem[] | undefined): CommandSection[] | undefined {
  if (!items?.length) return undefined;
  const groupedItems = new Map<string, CommandItem[]>();
  for (const item of items) {
    const sectionTitle = item.section ?? "Commands";
    const current = groupedItems.get(sectionTitle) ?? [];
    current.push(item);
    groupedItems.set(sectionTitle, current);
  }
  return Array.from(groupedItems.entries()).map(([sectionTitle, sectionItems]) => ({
    id: sectionTitle.toLowerCase().replace(/\s+/g, "-"),
    title: sectionTitle,
    items: sectionItems
  }));
}

function withRecentSection(
  sections: CommandSection[] | undefined,
  recentItems: CommandItem[],
  recents: VanillaCommandPaletteOptions["recents"],
  items?: CommandItem[]
): CommandSection[] | undefined {
  if (!recentItems.length || !recents) {
    return sections ?? toSections(items);
  }
  const baseSections = sections ?? toSections(items);
  if (!baseSections?.length) return undefined;
  const recentIds = new Set(recentItems.map((item) => item.id));
  const filteredSections = baseSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => !recentIds.has(item.id))
    }))
    .filter((section) => section.items.length > 0);
  return [
    {
      id: "recent",
      title:
        typeof recents === "object" && recents.sectionTitle
          ? recents.sectionTitle
          : "Recent commands",
      items: recentItems.map((item) => ({
        ...item,
        section: undefined
      }))
    },
    ...filteredSections
  ];
}

export function createCommandPalette(
  options: VanillaCommandPaletteOptions = {}
): VanillaCommandPalette {
  ensureStyles();

  const target = options.target ?? document.body;
  const host = document.createElement("div");
  host.className = ROOT_CLASS;
  target.appendChild(host);

  const overlay = document.createElement("div");
  overlay.className = "cmdkit-overlay";
  overlay.hidden = true;

  const dialog = document.createElement("div");
  dialog.className = "cmdkit-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");

  const header = document.createElement("div");
  header.className = "cmdkit-header";

  const headerCopy = document.createElement("div");
  const breadcrumbs = document.createElement("p");
  breadcrumbs.className = "cmdkit-breadcrumbs";
  const title = document.createElement("p");
  title.className = "cmdkit-title";
  const backButton = document.createElement("button");
  backButton.className = "cmdkit-back";
  backButton.type = "button";
  backButton.title = "Go back";
  backButton.setAttribute("aria-label", "Go back");
  backButton.textContent = "←";
  const titleText = document.createElement("span");
  const caption = document.createElement("p");
  caption.className = "cmdkit-caption";
  title.append(backButton, titleText);
  headerCopy.append(breadcrumbs, title, caption);

  const closeButton = document.createElement("button");
  closeButton.className = "cmdkit-close";
  closeButton.type = "button";
  closeButton.innerHTML =
    '<svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" style="display:block"><path d="M4 4L12 12M12 4L4 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>';
  const headerActions = document.createElement("div");
  headerActions.append(closeButton);

  header.append(headerCopy, headerActions);

  const input = document.createElement("input");
  input.type = "text";
  input.className = "cmdkit-input";

  const list = document.createElement("div");
  list.className = "cmdkit-list";

  dialog.append(header, input, list);
  overlay.append(dialog);
  host.append(overlay);

  let query = "";
  let activeIndex = 0;
  let open = options.open ?? options.defaultOpen ?? false;
  let navigationStack: NavigationState[] = [];
  let recentRecords: CommandItemRecord[] = [];
  let loadedItems: CommandItem[] | undefined;
  let loadedSections: CommandSection[] | undefined;
  let previousFocus: HTMLElement | null = null;
  let cleanupThemeListeners: (() => void) | undefined;

  const shouldUseDefaultDemoData =
    options.items === undefined &&
    options.sections === undefined &&
    options.source === undefined;

  const rootItems = () => loadedItems ?? options.items;
  const rootSections = () =>
    loadedSections ??
    options.sections ??
    (shouldUseDefaultDemoData ? defaultDemoSections : undefined);

  const rootResolved = () =>
    createResolvedConfig({
      items: rootItems(),
      sections: rootSections(),
      messages: options.messages,
      shortcut: options.shortcut ?? "mod+k",
      theme: resolveAdaptiveTheme(options.theme)
    });

  const buildRuntime = () => {
    const activeSections = navigationStack.at(-1)?.sections ?? rootSections();
    const activeTitle = navigationStack.at(-1)?.title ?? options.title ?? "Command menu";
    const recents = options.recents ?? false;
    const recentItems = recents
      ? resolveRecentCommands(rootResolved().items, recentRecords)
      : [];

    const resolved = createResolvedConfig({
      items: navigationStack.length ? undefined : rootItems(),
      sections: withRecentSection(activeSections, recentItems, recents, rootItems()),
      messages: options.messages,
      shortcut: options.shortcut ?? "mod+k",
      theme: resolveAdaptiveTheme(options.theme)
    });

    const snapshot = createCommandSnapshot(resolved, query);
    const flatItems = snapshot.items.filter((item) => !item.disabled);
    if (activeIndex >= flatItems.length) activeIndex = 0;
    return {
      activeTitle,
      breadcrumbs: [
        options.title ?? "Command menu",
        ...navigationStack.map((entry) => entry.title)
      ],
      canGoBack: navigationStack.length > 0,
      flatItems,
      messages: resolved.messages,
      snapshot,
      theme: resolved.theme
    };
  };

  const syncListMask = () => {
    const scrollable = list.scrollHeight > list.clientHeight + 1;
    const hasTop = list.scrollTop > 0;
    const hasBottom = list.scrollTop + list.clientHeight < list.scrollHeight - 1;
    if (!scrollable) {
      list.style.maskImage = "none";
      list.style.webkitMaskImage = "none";
      return;
    }
    if (hasTop && hasBottom) {
      const gradient =
        "linear-gradient(to bottom, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%)";
      list.style.maskImage = gradient;
      list.style.webkitMaskImage = gradient;
      return;
    }
    if (!hasTop && hasBottom) {
      const gradient =
        "linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%)";
      list.style.maskImage = gradient;
      list.style.webkitMaskImage = gradient;
      return;
    }
    if (hasTop && !hasBottom) {
      const gradient = "linear-gradient(to bottom, transparent 0, #000 14px, #000 100%)";
      list.style.maskImage = gradient;
      list.style.webkitMaskImage = gradient;
      return;
    }
    list.style.maskImage = "none";
    list.style.webkitMaskImage = "none";
  };

  const updateTheme = (theme: CommandTheme) => {
    const light = isLightTheme(theme.backgroundColor);
    dialog.style.borderRadius = theme.radius ?? "22px";
    dialog.dataset.mode = light ? "light" : "dark";
    dialog.style.border = `1px solid ${theme.borderColor}`;
    dialog.style.background = theme.backgroundColor ?? "";
    dialog.style.color = theme.textColor ?? "";
    dialog.style.boxShadow = theme.shadow ?? "";
    overlay.style.background = theme.overlayColor ?? "";
    input.style.border = `1px solid ${theme.borderColor}`;
    input.style.background = light ? "rgba(171, 189, 205, 0.16)" : "rgba(255, 255, 255, 0.03)";
    input.style.color = theme.textColor ?? "";
    closeButton.style.width = "2.4rem";
    closeButton.style.height = "2.4rem";
    closeButton.style.minWidth = "2.4rem";
    closeButton.style.minHeight = "2.4rem";
    closeButton.style.border = light
      ? `1px solid ${theme.borderColor}`
      : "1px solid rgba(146, 173, 194, 0.22)";
    closeButton.style.color = light ? theme.mutedColor ?? "" : "rgba(216, 232, 244, 0.92)";
    closeButton.style.background = light
      ? "rgba(15, 166, 216, 0.05)"
      : "rgba(166, 191, 212, 0.08)";
    backButton.style.color = theme.mutedColor ?? "";
  };

  const renderList = (runtime: ReturnType<typeof buildRuntime>) => {
    if (!runtime.flatItems.length) {
      list.innerHTML = `<div class="cmdkit-empty">${runtime.messages.noResults}</div>`;
      return;
    }

    let itemIndex = -1;
    const hideRepeatedSectionTitle =
      runtime.snapshot.groups.length === 1 &&
      runtime.snapshot.groups[0]?.title === runtime.activeTitle;

    const sectionsHtml = runtime.snapshot.groups
      .map((group) => {
        const itemsHtml = group.items
          .map((item) => {
            const isDisabled = Boolean(item.disabled);
            if (!isDisabled) itemIndex += 1;
            const isActive = !isDisabled && itemIndex === activeIndex;
            const shortcut = item.shortcut
              ? `<span class="cmdkit-shortcut">${prettyShortcut(item.shortcut)}</span>`
              : item.children?.length
                ? '<span class="cmdkit-shortcut">Enter</span>'
                : "";
            const subtitle = item.subtitle
              ? `<span class="cmdkit-subtitle">${item.subtitle}</span>`
              : "";
            const icon = item.icon ?? defaultBrandIconMarkup();
            const itemColor = isDisabled ? runtime.theme.mutedColor : runtime.theme.textColor;
            return `<button
              aria-selected="${isActive ? "true" : "false"}"
              class="cmdkit-item"
              data-item-id="${item.id}"
              role="option"
              style="color: ${itemColor};"
              type="button"
              ${isDisabled ? "disabled" : ""}
            >
              <span class="cmdkit-leading">
                <span class="cmdkit-icon" data-active="${isActive ? "true" : "false"}">${icon}</span>
                <span>
                  <span class="cmdkit-item-title">${item.title}</span>
                  ${subtitle}
                </span>
              </span>
              ${shortcut}
            </button>`;
          })
          .join("");

        return `<section class="cmdkit-section">
          <p class="cmdkit-section-title">${hideRepeatedSectionTitle ? "" : group.title}</p>
          <div class="cmdkit-section-items">${itemsHtml}</div>
        </section>`;
      })
      .join("");

    list.innerHTML = sectionsHtml;
  };

  const render = () => {
    const runtime = buildRuntime();
    overlay.hidden = !open;
    if (!open) return;

    updateTheme(runtime.theme);
    input.placeholder = runtime.messages.searchPlaceholder;
    input.value = query;
    titleText.textContent = runtime.activeTitle;
    caption.textContent = `Press ${prettyShortcut(options.shortcut ?? "mod+k")} to open or close.`;
    breadcrumbs.textContent = runtime.canGoBack ? runtime.breadcrumbs.join(" / ") : "";
    breadcrumbs.hidden = !runtime.canGoBack;
    backButton.hidden = !runtime.canGoBack;
    closeButton.setAttribute("aria-label", runtime.messages.closeLabel);
    renderList(runtime);
    syncListMask();
  };

  const setOpenState = (nextOpen: boolean) => {
    if (nextOpen && !open) {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    open = nextOpen;
    options.onOpenChange?.(nextOpen);
    if (!open) {
      query = "";
      activeIndex = 0;
      navigationStack = [];
      window.setTimeout(() => previousFocus?.focus(), 0);
    }
    render();
  };

  const runItem = async (item: CommandItem | undefined) => {
    await dispatchCommandExecution({
      item,
      port: {
        navigate: ({ title, sections }) => {
          navigationStack = [...navigationStack, { title, sections }];
          query = "";
          activeIndex = 0;
        },
        openHref: ({ href, item: currentItem }) => {
          if (options.recents && currentItem) {
            recentRecords = recordRecentCommand({
              current: recentRecords,
              itemId: currentItem.id,
              limit: typeof options.recents === "object" ? options.recents.limit : undefined
            });
          }
          window.location.assign(href);
          setOpenState(false);
        },
        runCallback: async ({ callback, item: currentItem }) => {
          if (options.recents && currentItem) {
            recentRecords = recordRecentCommand({
              current: recentRecords,
              itemId: currentItem.id,
              limit: typeof options.recents === "object" ? options.recents.limit : undefined
            });
          }
          await callback();
          setOpenState(false);
        }
      }
    });
    render();
  };

  const goBack = () => {
    navigationStack = navigationStack.slice(0, -1);
    query = "";
    activeIndex = 0;
    render();
  };

  const onGlobalKeyDown = (event: KeyboardEvent) => {
    if (isTypingTarget(event.target)) return;

    const runtime = buildRuntime();
    const shortcutItem = (open ? runtime.snapshot.items : rootResolved().items).find(
      (item) => !item.disabled && item.shortcut && matchesShortcut(event, item.shortcut)
    );

    if (shortcutItem) {
      event.preventDefault();
      if (!open) setOpenState(true);
      void runItem(shortcutItem);
      return;
    }

    if (!matchesShortcut(event, options.shortcut ?? "mod+k")) {
      return;
    }

    event.preventDefault();
    setOpenState(!open);
  };

  const onThemeRefresh = () => render();

  const onInputKeydown = (event: KeyboardEvent) => {
    const runtime = buildRuntime();

    if (event.key === "Escape") {
      event.preventDefault();
      if (runtime.canGoBack) {
        goBack();
      } else {
        setOpenState(false);
      }
      return;
    }

    if (event.key === "Backspace" && !query && runtime.canGoBack) {
      event.preventDefault();
      goBack();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (runtime.flatItems.length) {
        activeIndex = (activeIndex + 1) % runtime.flatItems.length;
        render();
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (runtime.flatItems.length) {
        activeIndex = (activeIndex - 1 + runtime.flatItems.length) % runtime.flatItems.length;
        render();
      }
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      void runItem(runtime.flatItems[activeIndex]);
    }
  };

  const onInput = () => {
    query = input.value;
    activeIndex = 0;
    render();
  };

  const onListClick = (event: Event) => {
    const target = event.target instanceof Element ? event.target.closest("[data-item-id]") : null;
    const itemId = target?.getAttribute("data-item-id");
    if (!itemId) return;
    const runtime = buildRuntime();
    const item = runtime.snapshot.items.find((entry) => entry.id === itemId);
    void runItem(item);
  };

  const onListMouseMove = (event: Event) => {
    const target = event.target instanceof Element ? event.target.closest("[data-item-id]") : null;
    const itemId = target?.getAttribute("data-item-id");
    if (!itemId) return;
    const runtime = buildRuntime();
    const index = runtime.flatItems.findIndex((item) => item.id === itemId);
    if (index !== -1 && index !== activeIndex) {
      activeIndex = index;
      render();
    }
  };

  const onOverlayMouseDown = (event: MouseEvent) => {
    if (event.target === overlay) {
      setOpenState(false);
    }
  };

  const installThemeListeners = () => {
    if (options.theme) return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", onThemeRefresh);
    const observer = new MutationObserver(onThemeRefresh);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    window.addEventListener("cmd-kit-theme-change", onThemeRefresh);
    cleanupThemeListeners = () => {
      media.removeEventListener("change", onThemeRefresh);
      observer.disconnect();
      window.removeEventListener("cmd-kit-theme-change", onThemeRefresh);
    };
  };

  const reloadSource = async () => {
    if (!options.source) return;
    const payload = await loadCommandSource({
      items: options.items,
      sections: options.sections,
      source: options.source
    });
    loadedItems = payload.items;
    loadedSections = payload.sections;
    render();
  };

  window.addEventListener("keydown", onGlobalKeyDown);
  input.addEventListener("keydown", onInputKeydown);
  input.addEventListener("input", onInput);
  list.addEventListener("click", onListClick);
  list.addEventListener("mousemove", onListMouseMove);
  list.addEventListener("scroll", syncListMask, { passive: true });
  window.addEventListener("resize", syncListMask);
  overlay.addEventListener("mousedown", onOverlayMouseDown);
  closeButton.addEventListener("click", () => setOpenState(false));
  backButton.addEventListener("click", goBack);

  closeButton.addEventListener("mouseenter", () => {
    const runtime = buildRuntime();
    const light = isLightTheme(runtime.theme.backgroundColor);
    closeButton.style.background = light ? "rgba(15, 166, 216, 0.12)" : "rgba(166, 191, 212, 0.18)";
    closeButton.style.borderColor = light
      ? "rgba(15, 166, 216, 0.26)"
      : "rgba(146, 173, 194, 0.34)";
    closeButton.style.transform = "translateY(-1px)";
  });

  closeButton.addEventListener("mouseleave", () => {
    const runtime = buildRuntime();
    const light = isLightTheme(runtime.theme.backgroundColor);
    closeButton.style.background = light ? "rgba(15, 166, 216, 0.05)" : "rgba(166, 191, 212, 0.08)";
    closeButton.style.borderColor = light ? runtime.theme.borderColor ?? "" : "rgba(146, 173, 194, 0.22)";
    closeButton.style.transform = "translateY(0)";
  });

  backButton.addEventListener("mouseenter", () => {
    const runtime = buildRuntime();
    backButton.style.transform = "translateY(-1px)";
    backButton.style.color = runtime.theme.textColor ?? "";
    backButton.style.opacity = "1";
  });

  backButton.addEventListener("mouseleave", () => {
    const runtime = buildRuntime();
    backButton.style.transform = "translateY(0)";
    backButton.style.color = runtime.theme.mutedColor ?? "";
    backButton.style.opacity = "0.9";
  });

  installThemeListeners();
  void reloadSource();
  render();

  return {
    destroy() {
      window.removeEventListener("keydown", onGlobalKeyDown);
      input.removeEventListener("keydown", onInputKeydown);
      input.removeEventListener("input", onInput);
      list.removeEventListener("click", onListClick);
      list.removeEventListener("mousemove", onListMouseMove);
      list.removeEventListener("scroll", syncListMask);
      window.removeEventListener("resize", syncListMask);
      overlay.removeEventListener("mousedown", onOverlayMouseDown);
      cleanupThemeListeners?.();
      host.remove();
    },
    isOpen() {
      return open;
    },
    async reloadSource() {
      await reloadSource();
    },
    setOpen(nextOpen: boolean) {
      setOpenState(nextOpen);
    },
    toggle() {
      setOpenState(!open);
    }
  };
}

export type {
  CommandGroup,
  CommandItem,
  CommandItemRecord,
  CommandMessages,
  CommandSection,
  CommandSource,
  CommandSourcePayload,
  CommandTheme
} from "@cmd-kit/core";
