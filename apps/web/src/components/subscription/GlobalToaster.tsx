import { useMemo } from "react";
import { Toaster } from "sileo";

export function GlobalToaster() {
  const isDark =
    typeof document !== "undefined" && document.documentElement.dataset.theme === "dark";

  const options = useMemo(
    () => ({
      fill: isDark ? "#f3f7fb" : "#171717",
      roundness: 16,
      styles: {
        description: isDark ? "sileo-desc-on-light" : "sileo-desc-on-dark",
        badge: isDark ? "sileo-badge-on-light" : "sileo-badge-on-dark",
        button: isDark ? "sileo-button-on-light" : "sileo-button-on-dark"
      }
    }),
    [isDark]
  );

  return <Toaster position="top-right" offset={{ top: 96, right: 16 }} options={options} />;
}
