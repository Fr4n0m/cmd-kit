import { useEffect, useState } from "react";
import type { CatalogResource } from "./types";

export function useResourceCatalog(
  isOpen: boolean,
  resourceLocale: "en" | "es",
  resourceQuery: string
) {
  const [resourceResults, setResourceResults] = useState<CatalogResource[]>([]);
  const [resourceSearchBusy, setResourceSearchBusy] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const controller = new AbortController();
    setResourceSearchBusy(true);

    fetch(`/api/admin/resources?locale=${resourceLocale}&query=${encodeURIComponent(resourceQuery)}`, {
      signal: controller.signal
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("search_failed");
        }
        return response.json();
      })
      .then((payload: { ok: boolean; items: CatalogResource[] }) => {
        setResourceResults(payload.items ?? []);
      })
      .catch(() => {
        setResourceResults([]);
      })
      .finally(() => {
        setResourceSearchBusy(false);
      });

    return () => controller.abort();
  }, [isOpen, resourceLocale, resourceQuery]);

  return { resourceResults, resourceSearchBusy, setResourceResults };
}
