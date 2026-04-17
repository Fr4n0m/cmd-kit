import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";

const productionSite = "https://cmd-kit.vercel.app";
const envSite = process.env.PUBLIC_SITE_URL?.trim();
const site = (envSite || productionSite).replace(/\/$/, "");
const isProductionBuild = process.env.NODE_ENV === "production";

if (isProductionBuild && !envSite) {
  console.warn(
    `[apps/web] PUBLIC_SITE_URL is not set. Falling back to ${productionSite} for production indexing.`
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
