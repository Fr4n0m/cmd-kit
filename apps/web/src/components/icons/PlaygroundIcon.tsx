import React from "react";
import type { ComponentType, SVGProps } from "react";

import {
  IconArrowRight,
  IconAtom2,
  IconBrandAstro,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandVue,
  IconCaretDown,
  IconCaretUp,
  IconCheck,
  IconCode,
  IconCopy,
  IconInfoCircle,
  IconJson,
  IconMenu2,
  IconMoon,
  IconPackage,
  IconPlayerPlay,
  IconPlus,
  IconSettingsAutomation,
  IconSun,
  IconTrash,
  IconWorld,
  IconX
} from "@tabler/icons-react";

export type PlaygroundIconName =
  | "arrow-right"
  | "astro"
  | "check"
  | "code"
  | "copy"
  | "core"
  | "css"
  | "globe"
  | "info"
  | "json"
  | "menu"
  | "moon"
  | "play"
  | "plus"
  | "preact"
  | "react"
  | "settings-automation"
  | "sun"
  | "tailwind"
  | "trash"
  | "triangle-down"
  | "triangle-up"
  | "vanilla"
  | "vue"
  | "x";

interface IconProps {
  className?: string;
  name: PlaygroundIconName;
  size?: number;
  title?: string;
}

type TablerIconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; title?: string }
>;

const iconMap: Record<PlaygroundIconName, TablerIconComponent> =
  {
    "arrow-right": IconArrowRight,
    astro: IconBrandAstro,
    check: IconCheck,
    code: IconCode,
    copy: IconCopy,
    core: IconPackage,
    css: IconBrandCss3,
    globe: IconWorld,
    info: IconInfoCircle,
    json: IconJson,
    menu: IconMenu2,
    moon: IconMoon,
    play: IconPlayerPlay,
    plus: IconPlus,
    preact: IconAtom2,
    react: IconBrandReact,
    "settings-automation": IconSettingsAutomation,
    sun: IconSun,
    tailwind: IconBrandTailwind,
    trash: IconTrash,
    "triangle-down": IconCaretDown,
    "triangle-up": IconCaretUp,
    vanilla: IconBrandJavascript,
    vue: IconBrandVue,
    x: IconX
  };

export function Icon({ className, name, size = 24, title }: IconProps) {
  const Component = iconMap[name];

  return (
    <Component
      aria-hidden={title ? undefined : true}
      className={className}
      size={size}
      title={title}
    />
  );
}
