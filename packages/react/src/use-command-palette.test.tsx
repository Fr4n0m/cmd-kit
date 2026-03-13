import { act, renderHook } from "@testing-library/react";
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
});
