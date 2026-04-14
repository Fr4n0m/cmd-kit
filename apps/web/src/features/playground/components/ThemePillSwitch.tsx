import React from "react";

export interface ThemePillOption {
  iconSrc?: string;
  label: string;
  value: "dark" | "light";
}

interface ThemePillSwitchProps {
  ariaLabel: string;
  buttonClassName: string;
  iconClassName?: string;
  indicatorClassName: string;
  options: ThemePillOption[];
  rootClassName: string;
  value: "dark" | "light";
  onChange: (value: "dark" | "light") => void;
}

export function ThemePillSwitch({
  ariaLabel,
  buttonClassName,
  iconClassName,
  indicatorClassName,
  options,
  rootClassName,
  value,
  onChange
}: ThemePillSwitchProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={`${rootClassName} ${value === "dark" ? "is-dark" : "is-light"}`}
      role="tablist"
    >
      <span aria-hidden="true" className={indicatorClassName} />
      {options.map((option) => (
        <button
          aria-label={option.label}
          aria-selected={value === option.value}
          className={
            value === option.value
              ? `${buttonClassName} is-active`
              : buttonClassName
          }
          key={option.value}
          onClick={() => onChange(option.value)}
          role="tab"
          type="button"
        >
          {option.iconSrc ? (
            <img
              alt=""
              aria-hidden="true"
              className={iconClassName}
              decoding="async"
              loading="lazy"
              src={option.iconSrc}
            />
          ) : (
            option.label
          )}
        </button>
      ))}
    </div>
  );
}

