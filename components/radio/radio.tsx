import { ChangeEvent, CSSProperties, InputHTMLAttributes } from "react";
import { Text } from "../text/text";

/** One choice in a named radio group. */
export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "checked" | "disabled" | "onChange" | "type" | "name" | "value"
> {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  /** Shared group name. Required for keyboard group behaviour. */
  name?: string;
  value?: string;
  className?: string;
  style?: CSSProperties;
}

/** Single choice within a named group. */
export function Radio({
  checked = false,
  onChange,
  disabled = false,
  label,
  name,
  value,
  className = "",
  style,
  ...rest
}: RadioProps) {
  return (
    <label
      className={[
        "group relative inline-flex items-center gap-3 cursor-pointer text-(--color-on-surface)",
        disabled ? "opacity-[0.38] pointer-events-none" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full flex-none -m-2 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:transition-opacity group-hover:before:opacity-(--state-hover-opacity)">
        <span
          className={[
            "relative inline-flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors",
            checked
              ? "border-(--color-primary)"
              : "border-(--color-on-surface-variant)",
            "after:content-[''] after:size-2.5 after:rounded-full after:bg-(--color-primary) after:transition-transform",
            checked ? "after:scale-100" : "after:scale-0",
          ].join(" ")}
        />
      </span>
      <input
        type="radio"
        className="fx-reset absolute opacity-0 w-0 h-0"
        name={name}
        value={value}
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
