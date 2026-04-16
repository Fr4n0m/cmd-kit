import { describe, expect, it } from "vitest";

import {
  createNavigationState,
  popNavigationEntry,
  pushNavigationEntry,
  resetNavigationState,
  resolveNavigationContext
} from "./navigation-state";

describe("navigation-state helpers", () => {
  it("resolves root context when stack is empty", () => {
    const state = createNavigationState();
    const context = resolveNavigationContext(state, "Command menu", [
      { id: "root", title: "Root", items: [] }
    ]);

    expect(context).toEqual({
      activeSections: [{ id: "root", title: "Root", items: [] }],
      activeTitle: "Command menu",
      breadcrumbs: ["Command menu"],
      canGoBack: false
    });
  });

  it("pushes and pops entries while preserving immutable behavior", () => {
    const root = createNavigationState();
    const pushed = pushNavigationEntry(root, {
      title: "Settings",
      sections: [{ id: "settings", title: "Settings", items: [] }]
    });
    const popped = popNavigationEntry(pushed);

    expect(root.stack).toHaveLength(0);
    expect(pushed.stack).toHaveLength(1);
    expect(popped.stack).toHaveLength(0);
  });

  it("returns stable state when popping an empty stack", () => {
    const state = createNavigationState();
    expect(popNavigationEntry(state)).toBe(state);
  });

  it("resolves nested context and breadcrumbs from stack", () => {
    const state = createNavigationState([
      {
        title: "Settings",
        sections: [{ id: "settings", title: "Settings", items: [] }]
      },
      {
        title: "Profile",
        sections: [{ id: "profile", title: "Profile", items: [] }]
      }
    ]);
    const context = resolveNavigationContext(state, "Command menu", [
      { id: "root", title: "Root", items: [] }
    ]);

    expect(context.activeTitle).toBe("Profile");
    expect(context.activeSections).toEqual([
      { id: "profile", title: "Profile", items: [] }
    ]);
    expect(context.breadcrumbs).toEqual([
      "Command menu",
      "Settings",
      "Profile"
    ]);
    expect(context.canGoBack).toBe(true);
  });

  it("resets navigation state", () => {
    const state = createNavigationState([
      {
        title: "Settings",
        sections: [{ id: "settings", title: "Settings", items: [] }]
      }
    ]);

    expect(resetNavigationState()).toEqual({ stack: [] });
    expect(state.stack).toHaveLength(1);
  });
});

