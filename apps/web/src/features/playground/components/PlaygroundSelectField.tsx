import React from "react";
import { useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/icons/PlaygroundIcon";

interface SelectOption {
  label: string;
  value: string;
}

interface PlaygroundSelectFieldProps {
  label: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string;
}

export function PlaygroundSelectField({
  label,
  onChange,
  options,
  value
}: PlaygroundSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const rootElement = rootRef.current;
    if (!open || !rootElement) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (!rootElement.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="field">
      <span>{label}</span>
      <div className="playground-select-field install-selector-dropdown" ref={rootRef}>
        <button
          aria-controls={listboxId}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={
            open
              ? "nav-button nav-button-utility dropdown-trigger install-selector-trigger playground-select-trigger is-open"
              : "nav-button nav-button-utility dropdown-trigger install-selector-trigger playground-select-trigger"
          }
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span className="playground-select-value">{selectedOption.label}</span>
          <Icon className="locale-caret playground-select-caret" name="triangle-down" />
        </button>

        <div
          className="dropdown-menu install-selector-menu playground-select-menu"
          hidden={!open}
          id={listboxId}
          role="listbox"
        >
          {options.map((option) => (
            <button
              aria-current={String(option.value === value)}
              className="dropdown-item install-selector-item playground-select-item"
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              role="option"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
