import { describe, expect, it } from "vitest";

import { filterCommandItems, groupCommandItems } from "./filter";
import { executeCommand } from "./application/commands/execute-command";
import { loadCommandSource } from "./application/commands/load-command-source";
import { recordRecentCommand } from "./application/commands/record-recent-command";
import { resolveRecentCommands } from "./application/commands/resolve-recent-commands";
import {
  createCommandSnapshot,
  flattenSections,
  resolveCommandItems
} from "./state";

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

describe("section normalization", () => {
  it("flattens declarative sections into items with inherited section labels", () => {
    expect(
      flattenSections([
        {
          id: "workspace",
          title: "Workspace",
          items: [{ id: "invite", title: "Invite team members" }]
        }
      ])
    ).toEqual([
      {
        id: "invite",
        title: "Invite team members",
        section: "Workspace"
      }
    ]);
  });

  it("prefers sections when both sections and items exist in config", () => {
    expect(
      resolveCommandItems({
        items,
        sections: [
          {
            id: "workspace",
            title: "Workspace",
            items: [{ id: "invite", title: "Invite team members" }]
          }
        ]
      })
    ).toEqual([
      {
        id: "invite",
        title: "Invite team members",
        section: "Workspace"
      }
    ]);
  });

  it("includes nested child items in search snapshots only when query is present", () => {
    const config = {
      sections: [
        {
          id: "docs",
          title: "Documentation",
          items: [
            {
              id: "docs-root",
              title: "Docs",
              children: [
                {
                  id: "frameworks",
                  title: "Frameworks",
                  items: [{ id: "docs-react", title: "React docs" }]
                }
              ]
            }
          ]
        }
      ]
    };

    expect(createCommandSnapshot(config, "").items.map((item) => item.id)).toEqual([
      "docs-root"
    ]);
    expect(
      createCommandSnapshot(config, "react").items.map((item) => item.id)
    ).toContain("docs-react");
  });
});

describe("executeCommand", () => {
  it("returns a nested navigation result when an item has child sections", () => {
    expect(
      executeCommand({
        id: "settings",
        title: "Settings",
        children: [
          {
            id: "appearance",
            title: "Appearance",
            items: [{ id: "theme", title: "Theme" }]
          }
        ]
      })
    ).toEqual({
      type: "navigate",
      title: "Settings",
      sections: [
        {
          id: "appearance",
          title: "Appearance",
          items: [{ id: "theme", title: "Theme" }]
        }
      ]
    });
  });

  it("ignores href values that are only whitespace", () => {
    expect(
      executeCommand({
        id: "docs",
        title: "Docs",
        href: "   "
      })
    ).toEqual({ type: "noop" });
  });

  it("trims href values before dispatching", () => {
    expect(
      executeCommand({
        id: "docs",
        title: "Docs",
        href: "   /docs/getting-started   "
      })
    ).toEqual({
      type: "href",
      href: "/docs/getting-started"
    });
  });
});

describe("loadCommandSource", () => {
  it("returns config items and sections when no source is configured", async () => {
    await expect(
      loadCommandSource({
        items,
        sections: [
          {
            id: "general",
            title: "General",
            items: [items[0]]
          }
        ]
      })
    ).resolves.toEqual({
      items,
      sections: [
        {
          id: "general",
          title: "General",
          items: [items[0]]
        }
      ]
    });
  });

  it("loads items from an async source", async () => {
    await expect(
      loadCommandSource({
        source: async () => ({
          items: [{ id: "remote", title: "Remote command" }]
        })
      })
    ).resolves.toEqual({
      items: [{ id: "remote", title: "Remote command" }]
    });
  });
});

describe("recent commands", () => {
  it("stores the most recent command first without duplicates", () => {
    expect(
      recordRecentCommand({
        current: [
          { itemId: "settings", timestamp: 1 },
          { itemId: "billing", timestamp: 2 }
        ],
        itemId: "settings",
        now: 3
      })
    ).toEqual([
      { itemId: "settings", timestamp: 3 },
      { itemId: "billing", timestamp: 2 }
    ]);
  });

  it("resolves recent items in record order", () => {
    expect(
      resolveRecentCommands(items, [
        { itemId: "team", timestamp: 3 },
        { itemId: "settings", timestamp: 2 },
        { itemId: "missing", timestamp: 1 }
      ])
    ).toEqual([items[2], items[0]]);
  });
});
