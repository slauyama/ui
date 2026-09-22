import { ButtonHTMLAttributes, CSSProperties } from "react";
import { Icon } from "../icon/icon";

/** 52x32 switch whose handle grows from 16px to 24px when selected. */
export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "disabled" | "type"
> {
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  disabled?: boolean;
  /** Show a check/close glyph inside the handle. */
  icons?: boolean;
  /** Accessible name, e.g. "Wi-Fi". Required: a switch with none is unlabeled for screen readers. */
  label: string;
  className?: string;
  style?: CSSProperties;
}

/** On/off switch, 52x32 track with a handle that grows on selection. */
export function Switch({
  selected = false,
  onChange,
  disabled = false,
  icons = false,
  label,
  className = "",
  style,
  ...rest
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={selected}
      aria-label={label}
      disabled={disabled}
      className={[
        "fx-reset group relative inline-flex items-center w-13 h-8 rounded-full border-2 p-0 cursor-pointer transition-colors",
        selected
          ? "bg-(--color-primary) border-(--color-primary)"
          : "bg-(--color-surface-container-highest) border-(--color-outline)",
        disabled ? "opacity-[0.38] cursor-default" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onChange && onChange(!selected)}
      style={style}
      {...rest}
    >
      <span
        className={[
          "absolute flex items-center justify-center rounded-full transition-[left,width,height,background-color]",
          selected
            ? "left-6 w-6 h-6 bg-(--color-on-primary) group-active:w-7 group-active:h-7"
            : "left-1.5 w-4 h-4 bg-(--color-outline) group-active:w-7 group-active:h-7",
        ].join(" ")}
      >
        {icons ? (
          <Icon
            name={selected ? "check" : "close"}
            size={16}
            color="var(--color-on-primary-container)"
          />
        ) : null}
      </span>
    </button>
  );
}
