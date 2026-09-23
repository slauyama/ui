import {
  ChangeEvent,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  MouseEvent,
  useState,
} from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";
import { Text, TEXT_VARIANT_CLASSES } from "../text/text";

export interface FieldBoxState {
  variant: "filled" | "outlined";
  focused: boolean;
  float: boolean;
  error: boolean;
  disabled: boolean;
  fullWidth: boolean;
}

/**
 * Shared visual contract for the `.fx-field` box used by both TextField and
 * Select: root wrapper, the box that holds label/input, the inner column,
 * the (possibly floating) label, the value row, and the supporting-text row.
 */
export function fieldBoxClasses({
  variant,
  focused,
  float,
  error,
  disabled,
  fullWidth,
}: FieldBoxState) {
  const root = [
    fullWidth ? "flex w-full" : "inline-flex min-w-[210px]",
    "flex-col [font-family:var(--ref-typeface-plain)]",
    disabled ? "opacity-[0.38] pointer-events-none" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const box =
    variant === "filled"
      ? [
          "relative flex items-center gap-4 min-h-14 px-4 cursor-text transition-colors",
          "bg-(--color-surface-container-highest) rounded-t-(--shape-field)",
          "hover:bg-[color-mix(in_srgb,var(--color-on-surface)_8%,var(--color-surface-container-highest))]",
          error
            ? "shadow-[inset_0_-3px_0_0_var(--color-error)]"
            : focused
              ? "shadow-[inset_0_-3px_0_0_var(--color-primary)]"
              : "shadow-[inset_0_-1px_0_0_var(--color-on-surface-variant)]",
        ].join(" ")
      : [
          "relative flex items-center gap-4 min-h-14 cursor-text transition-colors bg-transparent",
          "rounded-(--shape-field-outlined)",
          focused ? "border-[3px] px-[14px]" : "border px-4",
          error
            ? "border-(--color-error)"
            : focused
              ? "border-(--color-primary)"
              : "border-(--color-outline) hover:border-(--color-on-surface)",
        ].join(" ");

  const inner = [
    "relative flex flex-col justify-center flex-1 min-w-0",
    variant === "outlined" && float ? "py-0" : "py-2",
  ].join(" ");

  const label = [
    "pointer-events-none transition-[font-size,line-height,color]",
    error
      ? "text-(--color-error)"
      : focused
        ? "text-(--color-primary)"
        : "text-(--color-on-surface-variant)",
    variant === "outlined" && float
      ? "absolute -top-4 -left-1 px-1 bg-(--color-surface-container-low)"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const row = [
    "flex items-baseline gap-1 min-w-0 transition-[height]",
    float ? "" : "h-0 overflow-hidden opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  const support = [
    "flex justify-between gap-4 pt-1 px-4",
    error ? "text-(--color-error)" : "text-(--color-on-surface-variant)",
  ].join(" ");

  return { root, box, inner, label, row, support };
}

export const AFFIX_CLASSES = "text-(--color-on-surface-variant)";
export const FIELD_ICON_CLASSES =
  "text-(--color-on-surface-variant) inline-flex flex-none";
const INPUT_CLASSES = `fx-reset border-none outline-none bg-transparent text-(--color-on-surface) ${TEXT_VARIANT_CLASSES["body-large"]} p-0 w-full min-w-0 placeholder:text-(--color-on-surface-variant) disabled:text-(--color-on-surface)/38`;

export interface TextFieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "prefix"
> {
  variant?: "filled" | "outlined";
  /** Floating label. Always supply one; placeholders are not labels. */
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Shown only once the field has focus. */
  placeholder?: string;
  /** Persistent hint under the field. */
  supportingText?: string;
  error?: boolean;
  /** Replaces supportingText while error is true. */
  errorText?: string;
  leadingIcon?: MaterialSymbol;
  trailingIcon?: MaterialSymbol;
  onTrailingClick?: () => void;
  disabled?: boolean;
  type?: string;
  prefix?: string;
  suffix?: string;
  textarea?: boolean;
  rows?: number;
  /** Renders an n/max character counter on the trailing side. */
  counterMax?: number;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Filled or outlined text field with a floating label. */
export function TextField({
  variant = "outlined",
  label,
  value,
  defaultValue,
  onChange,
  placeholder,
  supportingText,
  error = false,
  errorText,
  leadingIcon,
  trailingIcon,
  onTrailingClick,
  disabled = false,
  type = "text",
  prefix,
  suffix,
  textarea = false,
  rows = 3,
  counterMax,
  fullWidth = false,
  className = "",
  style,
  ...rest
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState(
    defaultValue === undefined ? "" : defaultValue,
  );
  const val = value !== undefined ? value : internal;
  const float = focused || String(val).length > 0 || !label;
  const Input = (textarea ? "textarea" : "input") as ElementType;
  const classes = fieldBoxClasses({
    variant,
    focused,
    float,
    error,
    disabled,
    fullWidth,
  });
  return (
    <div
      className={[classes.root, className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      <label className={classes.box}>
        {leadingIcon ? (
          <span className={FIELD_ICON_CLASSES}>
            <Icon name={leadingIcon} />
          </span>
        ) : null}
        <span className={classes.inner}>
          {label ? (
            <Text
              as="span"
              variant={float ? "body-small" : "body-large"}
              className={classes.label}
            >
              {label}
            </Text>
          ) : null}
          <span className={classes.row}>
            {prefix ? (
              <Text as="span" variant="body-large" className={AFFIX_CLASSES}>
                {prefix}
              </Text>
            ) : null}
            <Input
              className={[INPUT_CLASSES, textarea ? "resize-y py-1" : ""]
                .filter(Boolean)
                .join(" ")}
              type={textarea ? undefined : type}
              rows={textarea ? rows : undefined}
              value={val}
              placeholder={focused || !label ? placeholder : undefined}
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => {
                setInternal(e.target.value);
                if (onChange) onChange(e);
              }}
            />
            {suffix ? (
              <Text as="span" variant="body-large" className={AFFIX_CLASSES}>
                {suffix}
              </Text>
            ) : null}
          </span>
        </span>
        {trailingIcon ? (
          <span
            className={[
              FIELD_ICON_CLASSES,
              onTrailingClick ? "cursor-pointer" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onMouseDown={(e: MouseEvent<HTMLSpanElement>) => e.preventDefault()}
            onClick={onTrailingClick}
          >
            <Icon name={trailingIcon} />
          </span>
        ) : null}
      </label>
      {supportingText || (error && errorText) || counterMax ? (
        <div className={classes.support}>
          <Text as="span" variant="body-small">
            {error && errorText ? errorText : supportingText}
          </Text>
          {counterMax ? (
            <Text as="span" variant="body-small">
              {String(val).length + "/" + counterMax}
            </Text>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
