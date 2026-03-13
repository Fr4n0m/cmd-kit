import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const coreSource = fileURLToPath(new URL("../../packages/core/src/index.ts", import.meta.url));
const reactSource = fileURLToPath(new URL("../../packages/react/src/index.ts", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@cmd-kit/core": coreSource,
      "@cmd-kit/react": reactSource
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"]
  }
});
