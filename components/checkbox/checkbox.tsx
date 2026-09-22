import { ChangeEvent, InputHTMLAttributes } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "checked" | "disabled" | "onChange" | "type"
> {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

/** Glyphs stay mounted and scale in/out, so ticking animates instead of popping. */
function glyphClasses(visible: boolean): string {
  return [
    "absolute inset-0 flex items-center justify-center",
    "transition-[scale,opacity] duration-(--motion-duration-short4) ease-(--motion-easing-emphasized-decelerate) motion-reduce:transition-none",
    visible ? "scale-100 opacity-100" : "scale-50 opacity-0",
  ].join(" ");
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  className = "",
  ...rest
}: CheckboxProps) {
  const isChecked = checked || indeterminate;

  return (
    <label
      className={[
        "group relative inline-flex items-center gap-3 cursor-pointer text-(--color-on-surface)",
        disabled ? "opacity-[0.38] pointer-events-none" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full flex-none -m-2 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:transition-opacity group-hover:before:opacity-(--state-hover-opacity)">
        <span
          className={[
            "relative inline-flex items-center justify-center w-4.5 h-4.5 rounded-xs border-2",
            "transition-[background-color,border-color] duration-(--motion-duration-short4) ease-(--motion-easing-standard) motion-reduce:transition-none",
            isChecked
              ? "bg-(--color-primary) border-(--color-primary)"
              : "border-(--color-on-surface-variant)",
          ].join(" ")}
        >
          <span className={glyphClasses(checked)}>
            <Icon name="check" size={18} color="var(--color-on-primary)" />
          </span>
          <span className={glyphClasses(!checked && indeterminate)}>
            <Icon name="remove" size={18} color="var(--color-on-primary)" />
          </span>
        </span>
      </span>
      <input
        type="checkbox"
        className="fx-reset absolute opacity-0 w-0 h-0"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      {label ? (
        <Text as="span" variant="body-medium">
          {label}
        </Text>
      ) : null}
    </label>
  );
}
