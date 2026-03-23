import "./style.css";
import { createCommandPalette } from "@cmd-kit/vanilla";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Missing #app root");
}

root.innerHTML = `
  <main class="shell">
    <button class="theme-toggle" id="theme-toggle" type="button">Theme: auto</button>
    <h1>cmd+kit Vanilla Example</h1>
    <p>Press Cmd/Ctrl + K to open the palette.</p>
  </main>
`;

const states = ["auto", "dark", "light"] as const;
let themeIndex = 0;

const applyTheme = () => {
  const mode = states[themeIndex];
  if (mode === "auto") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = mode;
  }

  const button = document.getElementById("theme-toggle");
  if (button instanceof HTMLButtonElement) {
    button.textContent = `Theme: ${mode}`;
  }

  window.dispatchEvent(new CustomEvent("cmd-kit-theme-change"));
};

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % states.length;
  applyTheme();
});

applyTheme();

createCommandPalette();
