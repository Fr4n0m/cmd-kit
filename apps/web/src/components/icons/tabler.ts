import arrowRight from "@tabler/icons/outline/arrow-right.svg?raw";
import atom2 from "@tabler/icons/outline/atom-2.svg?raw";
import brandAstro from "@tabler/icons/outline/brand-astro.svg?raw";
import brandCss3 from "@tabler/icons/outline/brand-css3.svg?raw";
import brandGithub from "@tabler/icons/outline/brand-github.svg?raw";
import brandJavascript from "@tabler/icons/outline/brand-javascript.svg?raw";
import brandReact from "@tabler/icons/outline/brand-react.svg?raw";
import brandTailwind from "@tabler/icons/outline/brand-tailwind.svg?raw";
import brandVue from "@tabler/icons/outline/brand-vue.svg?raw";
import caretDown from "@tabler/icons/outline/caret-down.svg?raw";
import caretUp from "@tabler/icons/outline/caret-up.svg?raw";
import checklist from "@tabler/icons/outline/checklist.svg?raw";
import coffee from "@tabler/icons/outline/coffee.svg?raw";
import code from "@tabler/icons/outline/code.svg?raw";
import copy from "@tabler/icons/outline/copy.svg?raw";
import fileCertificate from "@tabler/icons/outline/file-certificate.svg?raw";
import fileDescription from "@tabler/icons/outline/file-description.svg?raw";
import fileTextShield from "@tabler/icons/outline/file-text-shield.svg?raw";
import home from "@tabler/icons/outline/home.svg?raw";
import json from "@tabler/icons/outline/json.svg?raw";
import menu2 from "@tabler/icons/outline/menu-2.svg?raw";
import moon from "@tabler/icons/outline/moon.svg?raw";
import packageIcon from "@tabler/icons/outline/package.svg?raw";
import playerPlay from "@tabler/icons/outline/player-play.svg?raw";
import plus from "@tabler/icons/outline/plus.svg?raw";
import settingsAutomation from "@tabler/icons/outline/settings-automation.svg?raw";
import shield from "@tabler/icons/outline/shield.svg?raw";
import sparkles from "@tabler/icons/outline/sparkles.svg?raw";
import sun from "@tabler/icons/outline/sun.svg?raw";
import trash from "@tabler/icons/outline/trash.svg?raw";
import world from "@tabler/icons/outline/world.svg?raw";
import x from "@tabler/icons/outline/x.svg?raw";

const tablerIcons = {
  "arrow-right": arrowRight,
  "atom-2": atom2,
  "brand-astro": brandAstro,
  "brand-css3": brandCss3,
  "brand-github": brandGithub,
  "brand-javascript": brandJavascript,
  "brand-react": brandReact,
  "brand-tailwind": brandTailwind,
  "brand-vue": brandVue,
  "caret-down": caretDown,
  "caret-up": caretUp,
  checklist,
  coffee,
  code,
  copy,
  "file-certificate": fileCertificate,
  "file-description": fileDescription,
  "file-text-shield": fileTextShield,
  home,
  json,
  "menu-2": menu2,
  moon,
  package: packageIcon,
  "player-play": playerPlay,
  plus,
  "settings-automation": settingsAutomation,
  shield,
  sparkles,
  sun,
  trash,
  world,
  x
} as const;

export type TablerIconName = keyof typeof tablerIcons;

export interface TablerIconOptions {
  className?: string;
  decorative?: boolean;
  title?: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function extractSvg(svg: string) {
  const match = svg.match(/^<svg\b([\s\S]*?)>([\s\S]*?)<\/svg>\s*$/i);

  if (!match) {
    return {
      attrs: "",
      body: svg
    };
  }

  return {
    attrs: match[1],
    body: match[2]
  };
}

function normalizeAttrs(attrs: string) {
  return attrs
    .replace(/\swidth="[^"]*"/gi, "")
    .replace(/\sheight="[^"]*"/gi, "")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\srole="[^"]*"/gi, "")
    .replace(/\saria-hidden="[^"]*"/gi, "")
    .replace(/\saria-label="[^"]*"/gi, "")
    .replace(/\stitle="[^"]*"/gi, "");
}

export function renderTablerIcon(
  name: TablerIconName,
  options: TablerIconOptions = {}
) {
  const svg = tablerIcons[name];
  const { attrs, body } = extractSvg(svg);
  const normalizedAttrs = normalizeAttrs(attrs);
  const className = options.className ? ` class="${escapeHtml(options.className)}"` : "";
  const title = options.title ? `<title>${escapeHtml(options.title)}</title>` : "";
  const accessibility = options.title
    ? ` role="img" aria-label="${escapeHtml(options.title)}"`
    : options.decorative === false
      ? ' role="img" aria-hidden="false"'
      : ' aria-hidden="true"';

  return `<svg${normalizedAttrs}${className} width="100%" height="100%" style="display:block"${accessibility}>${title}${body}</svg>`;
}
