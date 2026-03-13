import { describe, expect, it, vi } from "vitest";

import { dispatchCommandExecution } from "./dispatch-command-execution";

describe("dispatchCommandExecution", () => {
  it("routes nested items through the navigation port", async () => {
    const navigate = vi.fn();
    const item = {
      id: "settings",
      title: "Settings",
      children: [
        {
          id: "appearance",
          title: "Appearance",
          items: [{ id: "theme", title: "Theme" }]
        }
      ]
    };

    const result = await dispatchCommandExecution({
      item,
      port: { navigate }
    });

    expect(result.type).toBe("navigate");
    expect(navigate).toHaveBeenCalledWith({
      item,
      sections: item.children,
      title: "Settings"
    });
  });

  it("routes links through the href port", async () => {
    const openHref = vi.fn();
    const item = {
      id: "docs",
      title: "Docs",
      href: "/docs"
    };

    const result = await dispatchCommandExecution({
      item,
      port: { openHref }
    });

    expect(result.type).toBe("href");
    expect(openHref).toHaveBeenCalledWith({
      item,
      href: "/docs"
    });
  });

  it("routes callbacks through the callback port", async () => {
    const callback = vi.fn();
    const runCallback = vi.fn();
    const item = {
      id: "refresh",
      title: "Refresh",
      onSelect: callback
    };

    const result = await dispatchCommandExecution({
      item,
      port: { runCallback }
    });

    expect(result.type).toBe("callback");
    expect(runCallback).toHaveBeenCalledWith({
      item,
      callback
    });
  });
});
