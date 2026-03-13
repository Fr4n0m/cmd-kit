import { act, fireEvent, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useCommandPalette } from "./use-command-palette";

describe("useCommandPalette", () => {
  it("opens nested sections through runItem", async () => {
    const { result } = renderHook(() =>
      useCommandPalette({
        items: [
          {
            id: "settings",
            title: "Settings",
            children: [
              {
                id: "appearance",
                title: "Appearance",
                items: [{ id: "theme", title: "Theme" }]
              }
            ]
          }
        ],
        defaultOpen: true
      })
    );

    await act(async () => {
      await result.current.runItem(result.current.flatItems[0]);
    });

    expect(result.current.activeTitle).toBe("Settings");
    expect(result.current.snapshot.groups[0]?.title).toBe("Appearance");
  });

  it("closes after callback execution", async () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useCommandPalette({
        items: [{ id: "run", title: "Run", onSelect }],
        defaultOpen: true
      })
    );

    await act(async () => {
      await result.current.runItem(result.current.flatItems[0]);
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(result.current.resolvedOpen).toBe(false);
  });

  it("supports programmatic navigation and reset", async () => {
    const { result } = renderHook(() =>
      useCommandPalette({
        items: [{ id: "root", title: "Root" }],
        defaultOpen: true
      })
    );

    act(() => {
      result.current.navigateToSections(
        [
          {
            id: "advanced",
            title: "Advanced",
            items: [{ id: "logs", title: "Logs" }]
          }
        ],
        "Settings"
      );
    });

    expect(result.current.activeTitle).toBe("Settings");
    expect(result.current.snapshot.groups[0]?.title).toBe("Advanced");

    act(() => {
      result.current.resetNavigation();
    });

    expect(result.current.activeTitle).toBe("Command menu");
  });

  it("can reopen the root palette programmatically", () => {
    const { result } = renderHook(() =>
      useCommandPalette({
        items: [{ id: "root", title: "Root" }]
      })
    );

    act(() => {
      result.current.openRoot(true);
    });

    expect(result.current.resolvedOpen).toBe(true);
    expect(result.current.activeTitle).toBe("Command menu");
  });

  it("loads commands from an async source", async () => {
    const source = async () => ({
      items: [{ id: "remote", title: "Remote command" }]
    });

    const { result } = renderHook(() =>
      useCommandPalette({
        source
      })
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.flatItems[0]?.title).toBe("Remote command");
  });

  it("tracks recent items after executing commands", async () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useCommandPalette({
        items: [{ id: "run", title: "Run", onSelect }],
        recents: { sectionTitle: "Recent commands" },
        defaultOpen: true
      })
    );

    await act(async () => {
      await result.current.runItem(result.current.flatItems[0]);
    });

    expect(result.current.recentItems.map((item) => item.id)).toEqual(["run"]);
  });

  it("surfaces recent items even when the root config uses flat items", async () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useCommandPalette({
        items: [
          { id: "run", title: "Run", onSelect, section: "Actions" },
          { id: "open", title: "Open", section: "Navigation" }
        ],
        recents: true,
        defaultOpen: true
      })
    );

    await act(async () => {
      await result.current.runItem(result.current.flatItems[0]);
    });

    await waitFor(() => {
      expect(result.current.recentItems.map((item) => item.id)).toEqual([
        "run"
      ]);
    });

    act(() => {
      result.current.openRoot(true);
    });

    await waitFor(() => {
      expect(result.current.snapshot.groups[0]?.title).toBe("Recent");
    });

    expect(result.current.snapshot.groups[0]?.items[0]?.id).toBe("run");
  });

  it("ignores the global shortcut while typing in a text input", async () => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();

    const { result } = renderHook(() =>
      useCommandPalette({
        items: [{ id: "root", title: "Root" }]
      })
    );

    await act(async () => {
      fireEvent.keyDown(input, { ctrlKey: true, key: "k" });
    });

    expect(result.current.resolvedOpen).toBe(false);

    input.remove();
  });
});
