import { describe, expect, it } from "vitest";

import { filterCommandItems, groupCommandItems } from "./filter";

const items = [
  {
    id: "settings",
    title: "Settings",
    keywords: ["preferences"],
    section: "General"
  },
  {
    id: "billing",
    title: "Billing",
    keywords: ["payments"],
    section: "General"
  },
  {
    id: "team",
    title: "Team members",
    keywords: ["users"],
    section: "Workspace"
  }
];

describe("filterCommandItems", () => {
  it("returns all items when query is empty", () => {
    expect(filterCommandItems(items, "")).toHaveLength(3);
  });

  it("matches fuzzy queries against item titles", () => {
    expect(filterCommandItems(items, "stng")).toEqual([items[0]]);
  });

  it("matches keywords as secondary search input", () => {
    expect(filterCommandItems(items, "pay")).toEqual([items[1]]);
  });
});

describe("groupCommandItems", () => {
  it("groups items by section while preserving order", () => {
    expect(groupCommandItems(items)).toEqual([
      {
        id: "general",
        title: "General",
        items: [items[0], items[1]]
      },
      {
        id: "workspace",
        title: "Workspace",
        items: [items[2]]
      }
    ]);
  });
});
