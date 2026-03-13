import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { useCommandPalette } from "./use-command-palette";

describe("useCommandPalette", () => {
  it("opens nested sections through runItem", async () => {
    let palette: ReturnType<typeof useCommandPalette> | undefined;

    mount(
      defineComponent({
        setup() {
          palette = useCommandPalette({
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
          });

          return () => h("div");
        }
      })
    );

    await palette?.runItem(palette.flatItems.value[0]);

    expect(palette?.activeTitle.value).toBe("Settings");
    expect(palette?.snapshot.value.groups[0]?.title).toBe("Appearance");
  });
});
