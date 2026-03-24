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
  IconCode,
  IconCopy,
  IconJson,
  IconMenu2,
  IconMoon,
  IconPackage,
  IconPlayerPlay,
  IconPlus,
  IconSettingsAutomation,
  IconSparkles,
  IconSun,
  IconTrash,
  IconWorld,
  IconX
} from "@tabler/icons-react";

export type PlaygroundIconName =
  | "arrow-right"
  | "astro"
  | "code"
  | "copy"
  | "core"
  | "css"
  | "globe"
  | "json"
  | "menu"
  | "moon"
  | "play"
  | "plus"
  | "preact"
  | "react"
  | "settings-automation"
  | "spark"
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

const iconMap: Record<PlaygroundIconName, ComponentType<SVGProps<SVGSVGElement>>> =
  {
    "arrow-right": IconArrowRight,
    astro: IconBrandAstro,
    code: IconCode,
    copy: IconCopy,
    core: IconPackage,
    css: IconBrandCss3,
    globe: IconWorld,
    json: IconJson,
    menu: IconMenu2,
    moon: IconMoon,
    play: IconPlayerPlay,
    plus: IconPlus,
    preact: IconAtom2,
    react: IconBrandReact,
    "settings-automation": IconSettingsAutomation,
    spark: IconSparkles,
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
