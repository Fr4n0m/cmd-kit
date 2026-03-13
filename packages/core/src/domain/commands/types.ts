export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  keywords?: string[];
  section?: string;
  icon?: string;
  shortcut?: string;
  href?: string;
  disabled?: boolean;
  children?: CommandSection[];
  onSelect?: () => void | Promise<void>;
}

export interface CommandItemRecord {
  itemId: string;
  timestamp: number;
}

export interface CommandGroup {
  id: string;
  title: string;
  items: CommandItem[];
}

export interface CommandSection {
  id: string;
  title: string;
  items: CommandItem[];
}

export interface CommandMessages {
  searchPlaceholder: string;
  noResults: string;
  closeLabel: string;
}

export interface CommandTheme {
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedColor?: string;
  borderColor?: string;
  overlayColor?: string;
  radius?: string;
  shadow?: string;
}

export interface CommandSourcePayload {
  items?: CommandItem[];
  sections?: CommandSection[];
}

export type CommandSource =
  | CommandSourcePayload
  | (() => CommandSourcePayload | Promise<CommandSourcePayload>);

export interface CommandKitConfig {
  items?: CommandItem[];
  sections?: CommandSection[];
  source?: CommandSource;
  messages?: Partial<CommandMessages>;
  theme?: CommandTheme;
  shortcut?: string;
}

export interface CommandSnapshot {
  items: CommandItem[];
  groups: CommandGroup[];
}

export type CommandExecutionResult =
  | { type: "noop" }
  | { type: "navigate"; sections: CommandSection[]; title: string }
  | { type: "href"; href: string }
  | { type: "callback"; callback: NonNullable<CommandItem["onSelect"]> };
