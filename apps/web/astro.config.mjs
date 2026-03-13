import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const site = process.env.PUBLIC_SITE_URL || undefined;

export default defineConfig({
  integrations: [react()],
  site
});
