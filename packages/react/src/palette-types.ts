import type {
  CommandItem,
  CommandMessages,
  CommandSection,
  CommandSource,
  CommandTheme
} from "@cmd-kit/core";
import type { ReactNode } from "react";

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

export interface CommandPaletteRenderContext {
  activeTitle: string;
  breadcrumbs: string[];
  canGoBack: boolean;
  close: () => void;
  goBack: () => void;
  shortcut: string;
}

export interface CommandPaletteItemRenderContext {
  active: boolean;
}

export interface CommandPaletteSectionRenderContext {
  title: string;
}

export interface CommandPaletteEmptyStateRenderContext {
  query: string;
}

export interface CommandPaletteRenderers {
  emptyState?: (context: CommandPaletteEmptyStateRenderContext) => ReactNode;
  item?: (
    item: CommandItem,
    context: CommandPaletteItemRenderContext
  ) => ReactNode;
  sectionTitle?: (context: CommandPaletteSectionRenderContext) => ReactNode;
  title?: (context: CommandPaletteRenderContext) => ReactNode;
}

export interface CommandPaletteProps {
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
  className?: string;
  renderItem?: (item: CommandItem, active: boolean) => ReactNode;
  classNames?: CommandPaletteClassNames;
  renderers?: CommandPaletteRenderers;
  recents?: boolean | { limit?: number; sectionTitle?: string };
}
