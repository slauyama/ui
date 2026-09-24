import {
  ChangeEvent,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  MouseEvent,
} from "react";
import type { MaterialSymbol } from "material-symbols";
import { useFloatingLabel } from "../../hooks/useFloatingLabel";
import { Icon } from "../icon/icon";
import { Text, TEXT_VARIANT_CLASSES } from "../text/text";

export interface FieldBoxState {
  variant: "filled" | "outlined";
  focused: boolean;
  float: boolean;
  error: boolean;
  disabled: boolean;
  fullWidth: boolean;
  /** Outlined only: label text to notch out of the border. No label, no notch. */
  label?: string;
}

/**
 * Shared visual contract for the `.fx-field` box used by both TextField and
 * Select: root wrapper, the box that holds label/input, the inner column,
 * the (possibly floating) label, the value row, and the supporting-text row.
 *
 * Outlined's border is drawn by a `<fieldset>` overlay rather than directly
 * on `box`, so the floating label can sit over a real notch (a `<legend>`
 * sized to the label text) instead of a background-color rectangle masking
 * the border underneath it — the rectangle only looks right if it happens
 * to match whatever's actually behind the field; the notch is a literal gap
 * in the border, so it's correct on any background.
 */
export function fieldBoxClasses({
  variant,
  focused,
  float,
  error,
  disabled,
  fullWidth,
  label,
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
          "relative rounded-t-(--shape-field) transition-colors",
          "bg-(--color-surface-container-highest)",
          "hover:bg-[color-mix(in_srgb,var(--color-on-surface)_8%,var(--color-surface-container-highest))]",
          error
            ? "shadow-[inset_0_-3px_0_0_var(--color-error)]"
            : focused
              ? "shadow-[inset_0_-3px_0_0_var(--color-primary)]"
              : "shadow-[inset_0_-1px_0_0_var(--color-on-surface-variant)]",
        ].join(" ")
      : "group relative rounded-(--shape-field-outlined) transition-colors bg-transparent";

  const content =
    "relative flex items-center gap-4 min-h-14 px-4 cursor-text";

  // Outlined-only: the browser only carves a border notch around a <legend>
  // it actually paints — visibility:hidden, opacity:0, color:transparent and
  // clip-path all defeat it (tested directly; none produce a gap), so unlike
  // the old input.tsx this can't hide a measuring copy of the label inside
  // it. Instead the legend *is* the floating label — real, visible, and (only
  // while it holds that text) not aria-hidden, so it keeps contributing to
  // the field's accessible name. The separate inline label below is only
  // rendered when this isn't: idle outlined (no notch needed, border's
  // unbroken) and filled (no border to notch in the first place).
  const notch =
    variant === "outlined" && label ? (
      <fieldset
        aria-hidden={float ? undefined : true}
        className={[
          "absolute inset-0 m-0 min-w-0 px-4 pointer-events-none",
          "rounded-(--shape-field-outlined)",
          focused ? "border-[3px]" : "border",
          error
            ? "border-(--color-error)"
            : focused
              ? "border-(--color-primary)"
              : "border-(--color-outline) group-hover:border-(--color-on-surface)",
        ].join(" ")}
      >
        <legend
          className={[
            "overflow-hidden whitespace-nowrap transition-[width,padding]",
            error
              ? "text-(--color-error)"
              : focused
                ? "text-(--color-primary)"
                : "text-(--color-on-surface-variant)",
            float ? `px-1 ${TEXT_VARIANT_CLASSES["body-small"]}` : "w-0 px-0",
          ].join(" ")}
        >
          {float ? label : null}
        </legend>
      </fieldset>
    ) : null;

  const inner = [
    "relative flex flex-col justify-center flex-1 min-w-0",
    variant === "outlined" && float ? "py-0" : "py-2",
  ].join(" ");

  const label_ = [
    "pointer-events-none transition-[font-size,line-height,color]",
    error
      ? "text-(--color-error)"
      : focused
        ? "text-(--color-primary)"
        : "text-(--color-on-surface-variant)",
  ].join(" ");

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

  return { root, box, content, notch, inner, label: label_, row, support };
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
  const {
    focused,
    floated: float,
    value: val,
    handleChange,
    handleFocus,
    handleBlur,
  } = useFloatingLabel<HTMLInputElement | HTMLTextAreaElement>({
    value,
    defaultValue,
    onChange,
    forceFloated: !label,
  });
  const Input = (textarea ? "textarea" : "input") as ElementType;
  const classes = fieldBoxClasses({
    variant,
    focused,
    float,
    error,
    disabled,
    fullWidth,
    label,
  });
  // Outlined + floated: the notch's <legend> holds the label instead (see
  // fieldBoxClasses) — rendering it here too would show it twice.
  const showInlineLabel = variant === "filled" || !float;
  return (
    <div
      className={[classes.root, className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      <label className={classes.box}>
        {classes.notch}
        <span className={classes.content}>
          {leadingIcon ? (
            <span className={FIELD_ICON_CLASSES}>
              <Icon name={leadingIcon} />
            </span>
          ) : null}
          <span className={classes.inner}>
            {label && showInlineLabel ? (
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
                <Text
                  as="span"
                  variant="body-large"
                  className={AFFIX_CLASSES}
                >
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
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {suffix ? (
                <Text
                  as="span"
                  variant="body-large"
                  className={AFFIX_CLASSES}
                >
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
              onMouseDown={(e: MouseEvent<HTMLSpanElement>) =>
                e.preventDefault()
              }
              onClick={onTrailingClick}
            >
              <Icon name={trailingIcon} />
            </span>
          ) : null}
        </span>
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
