import React from "react";
import { useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/icons/PlaygroundIcon";
import { FieldHelpTrigger } from "./Fields";

interface SelectOption {
  label: string;
  value: string;
}

interface PlaygroundSelectFieldProps {
  helpText?: string;
  label: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string;
}

export function PlaygroundSelectField({
  helpText,
  label,
  onChange,
  options,
  value
}: PlaygroundSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];
  const isMenuVisible = open || isClosing;

  const closeMenu = () => {
    if (!open) {
      return;
    }

    setIsClosing(true);
    setOpen(false);
  };

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
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setIsClosing(false);
    }
  }, [open]);

  return (
    <div className="field">
      <span className="field-label-row">
        <span className="field-label-text">{label}</span>
        <FieldHelpTrigger helpText={helpText} label={label} />
      </span>
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
          data-state={open ? "open" : "closed"}
          id={listboxId}
          onAnimationEnd={() => {
            if (!open) {
              setIsClosing(false);
            }
          }}
          role="listbox"
          aria-hidden={!open}
          style={{ display: isMenuVisible ? "grid" : "none" }}
        >
          {options.map((option) => (
            <button
              aria-selected={option.value === value}
              className="dropdown-item install-selector-item playground-select-item"
              key={option.value}
              onClick={() => {
                onChange(option.value);
                closeMenu();
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
