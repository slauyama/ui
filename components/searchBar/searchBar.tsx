import {
  ChangeEvent,
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";
import { TEXT_VARIANT_CLASSES } from "../text/text";

/** Full-corner 56px search field that replaces an app bar title. */
export interface SearchBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "onSubmit"
> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  leadingIcon?: MaterialSymbol;
  /** Trailing slot, usually one or two IconButtons. */
  trailing?: ReactNode;
  /** Avatar image URL, 30px. */
  avatar?: string;
  onSubmit?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

/** Full-corner 56px search field that sits in place of an app bar title. */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  leadingIcon = "search",
  trailing,
  avatar,
  onSubmit,
  className = "",
  style,
  ...rest
}: SearchBarProps) {
  return (
    <div
      className={[
        "flex items-center gap-4 h-14 px-4 w-full max-w-180 rounded-full transition-shadow",
        "bg-(--color-surface-container-high) text-(--color-on-surface)",
        "focus-within:shadow-(--elevation-level1)",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      <Icon name={leadingIcon} color="var(--color-on-surface-variant)" />
      <input
        className={`fx-reset flex-1 min-w-0 border-none outline-none bg-transparent text-inherit ${TEXT_VARIANT_CLASSES["body-large"]} placeholder:text-(--color-on-surface-variant)`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && onSubmit) onSubmit(e.currentTarget.value);
        }}
        aria-label={placeholder}
      />
      {trailing}
      {avatar ? (
        <img
          className="w-7.5 h-7.5 rounded-full object-cover"
          src={avatar}
          alt=""
        />
      ) : null}
    </div>
  );
}
