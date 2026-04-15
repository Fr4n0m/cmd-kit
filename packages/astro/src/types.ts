import type {
  CommandItem,
  CommandMessages,
  CommandSection,
  CommandSourcePayload,
  CommandTheme
} from "@cmd-kit/core";

export type SlotName =
  | "overlay"
  | "dialog"
  | "header"
  | "breadcrumbs"
  | "title"
  | "caption"
  | "headerActions"
  | "closeButton"
  | "backButton"
  | "input"
  | "list"
  | "section"
  | "sectionTitle"
  | "sectionItems"
  | "item"
  | "emptyState";

export type CommandPaletteClassNames = Partial<Record<SlotName, string>>;

export interface CommandPaletteProps {
  items?: CommandItem[];
  sections?: CommandSection[];
  source?: CommandSourcePayload;
  messages?: Partial<CommandMessages>;
  theme?: CommandTheme;
  title?: string;
  shortcut?: string;
  reducedMotion?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  className?: string;
  classNames?: CommandPaletteClassNames;
  recents?: boolean | { limit?: number; sectionTitle?: string };
}
