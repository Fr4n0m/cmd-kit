import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import { CommandPalette } from "./palette";

describe("CommandPalette", () => {
  it("renders and executes callbacks", async () => {
    const onSelect = vi.fn();
    const wrapper = mount(CommandPalette, {
      props: {
        items: [{ id: "run", title: "Run", onSelect }],
        defaultOpen: true
      }
    });

    await wrapper.get('button[role="option"]').trigger("click");

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(wrapper.html()).toBe("");
  });
});
