import { ChangeEvent, ElementType, HTMLAttributes, ReactNode } from "react";
import type { MaterialSymbol } from "material-symbols";
import { Checkbox } from "../checkbox/checkbox";
import { Icon } from "../icon/icon";
import { Radio } from "../radio/radio";
import { Text } from "../text/text";

/**
 * One list row: leading slot, headline plus supporting text, trailing slot.
 */
export interface ListItemProps extends HTMLAttributes<HTMLElement> {
  headline: ReactNode;
  supportingText?: ReactNode;
  trailingText?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  avatar?: string;
  leadingIcon?: MaterialSymbol;
  trailingIcon?: MaterialSymbol;
  /** 1 = 56px, 2 = 72px, 3 = 88px. */
  lines?: 1 | 2 | 3;
  selected?: boolean;
  disabled?: boolean;
  href?: string;
  /** Leading radio or checkbox. The whole row becomes its label. */
  control?: "radio" | "checkbox";
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Groups radio rows so arrow keys move between them. */
  name?: string;
  value?: string;
}

const LINES_CLASSES: Record<1 | 2 | 3, string> = {
  1: "min-h-14 items-center",
  2: "min-h-18 items-center",
  3: "min-h-22 items-start",
};

/** One row: leading slot, headline plus supporting text, trailing slot. */
export function ListItem({
  headline,
  supportingText,
  trailingText,
  leading,
  trailing,
  avatar,
  leadingIcon,
  trailingIcon,
  lines = 1,
  selected = false,
  disabled = false,
  onClick,
  href,
  control,
  checked = false,
  onCheckedChange,
  name,
  value,
  className = "",
  style,
  ...rest
}: ListItemProps) {
  const interactive = !!(control || onClick || href);
  const Tag: ElementType = control
    ? "label"
    : href
      ? "a"
      : interactive
        ? "button"
        : "div";
  const Control = control === "radio" ? Radio : Checkbox;
  return (
    <Tag
      className={[
        "fx-reset relative flex gap-4 px-4 py-3 no-underline text-start border-none w-full",
        LINES_CLASSES[lines],
        interactive ? "fx-state cursor-pointer" : "",
        control
          ? "has-focus-visible:before:opacity-(--state-focus-opacity)"
          : "",
        selected
          ? "bg-(--color-secondary-container) text-(--color-on-secondary-container)"
          : "bg-transparent text-(--color-on-surface)",
        disabled ? "opacity-[0.38] pointer-events-none" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-lines={String(lines)}
      data-selected={selected ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      data-interactive={interactive ? "true" : "false"}
      // No role: "listitem" is only valid inside a "list"-role parent, but List uses "group" (see
      // list.tsx) since rows mix with non-listitem content (Divider, LinearProgress) and an
      // interactive row is a button/link, not a valid listitem anyway. A plain div/button/link
      // inside a group needs no role of its own.
      href={href}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {control ? (
        <span className="inline-flex items-center justify-center flex-none">
          <Control
            as="span"
            checked={checked}
            disabled={disabled}
            name={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onCheckedChange?.(e.target.checked)
            }
          />
        </span>
      ) : null}
      {avatar || leading || leadingIcon ? (
        <span className="inline-flex items-center justify-center flex-none text-(--color-on-surface-variant)">
          {avatar ? (
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={avatar}
              alt=""
            />
          ) : leadingIcon ? (
            <Icon name={leadingIcon} />
          ) : (
            leading
          )}
        </span>
      ) : null}
      <span className="flex flex-col gap-0.5 flex-1 min-w-0">
        <Text as="span" variant="body-large">
          {headline}
        </Text>
        {supportingText ? (
          <Text
            as="span"
            variant="body-medium"
            className={[
              "overflow-hidden text-ellipsis",
              selected
                ? "text-inherit opacity-85"
                : "text-(--color-on-surface-variant)",
            ].join(" ")}
          >
            {supportingText}
          </Text>
        ) : null}
      </span>
      {trailingText ? (
        <Text
          as="span"
          variant="label-small"
          className="text-(--color-on-surface-variant) flex-none"
        >
          {trailingText}
        </Text>
      ) : null}
      {trailing || trailingIcon ? (
        <span className="inline-flex items-center justify-center flex-none text-(--color-on-surface-variant)">
          {trailingIcon ? <Icon name={trailingIcon} /> : trailing}
        </span>
      ) : null}
    </Tag>
  );
}
