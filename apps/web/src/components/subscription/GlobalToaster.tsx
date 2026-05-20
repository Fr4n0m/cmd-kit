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
        title: isDark ? "text-black!" : "text-white!",
        description: isDark ? "text-black/80!" : "text-white/80!",
        badge: "bg-white/10! rounded-full!",
        button: "bg-white/10! hover:bg-white/20!"
      }
    }),
    [isDark]
  );

  return <Toaster position="top-right" options={options} />;
}
