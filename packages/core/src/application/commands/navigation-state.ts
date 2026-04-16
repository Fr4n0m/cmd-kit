import type { CommandSection } from "../../domain/commands/types";

export interface CommandNavigationEntry {
  sections: CommandSection[];
  title: string;
}

export interface CommandNavigationState {
  stack: CommandNavigationEntry[];
}

export interface CommandNavigationContext {
  activeSections: CommandSection[] | undefined;
  activeTitle: string;
  breadcrumbs: string[];
  canGoBack: boolean;
}

export function createNavigationState(
  initialStack: CommandNavigationEntry[] = []
): CommandNavigationState {
  return {
    stack: initialStack
  };
}

export function pushNavigationEntry(
  state: CommandNavigationState,
  entry: CommandNavigationEntry
): CommandNavigationState {
  return {
    stack: [...state.stack, entry]
  };
}

export function popNavigationEntry(
  state: CommandNavigationState
): CommandNavigationState {
  if (!state.stack.length) {
    return state;
  }

  return {
    stack: state.stack.slice(0, -1)
  };
}

export function resetNavigationState(): CommandNavigationState {
  return {
    stack: []
  };
}

export function resolveNavigationContext(
  state: CommandNavigationState,
  rootTitle: string,
  rootSections?: CommandSection[]
): CommandNavigationContext {
  const activeEntry = state.stack.at(-1);

  return {
    activeSections: activeEntry?.sections ?? rootSections,
    activeTitle: activeEntry?.title ?? rootTitle,
    breadcrumbs: [rootTitle, ...state.stack.map((entry) => entry.title)],
    canGoBack: state.stack.length > 0
  };
}

