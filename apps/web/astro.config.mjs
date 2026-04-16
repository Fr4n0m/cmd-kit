import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";

const site = process.env.PUBLIC_SITE_URL || undefined;
const isProductionBuild = process.env.NODE_ENV === "production";

if (isProductionBuild && !site) {
  console.warn(
    "[apps/web] PUBLIC_SITE_URL is not set. Build will remain non-indexable (noindex + robots disallow + empty sitemap). Set PUBLIC_SITE_URL for production indexing."
  );
}

const webSource = fileURLToPath(new URL("./src", import.meta.url));
const coreSource = fileURLToPath(new URL("../../packages/core/src/index.ts", import.meta.url));
const reactSource = fileURLToPath(new URL("../../packages/react/src/index.ts", import.meta.url));
const astroComponentSource = fileURLToPath(
  new URL("../../packages/astro/src/CommandPalette.astro", import.meta.url)
);

export default defineConfig({
  integrations: [react()],
  site,
  vite: {
    resolve: {
      alias: {
        "@": webSource,
        "@cmd-kit/core": coreSource,
        "@cmd-kit/react": reactSource,
        "@cmd-kit/astro/component": astroComponentSource
      }
    }
  }
});
