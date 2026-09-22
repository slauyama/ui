import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Heading } from "../heading/heading";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

export interface DrawerEntry {
  value?: string;
  label?: string;
  icon?: string;
  badge?: ReactNode;
  /** Renders a group heading instead of a destination. */
  heading?: string;
}

/** 360px drawer of pill-shaped destinations for expanded widths. */
export interface NavigationDrawerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  items: DrawerEntry[];
  value?: string;
  onChange?: (value: string) => void;
  header?: ReactNode;
  /** Rounds the trailing corners, for a drawer that slides over content. */
  modal?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** 360px drawer of pill-shaped destinations, optionally grouped by heading. */
export function NavigationDrawer({
  items = [],
  value,
  onChange,
  header,
  modal = false,
  className = "",
  style,
  ...rest
}: NavigationDrawerProps) {
  return (
    <nav
      className={[
        "flex flex-col gap-1 w-90 p-3 h-full overflow-y-auto bg-(--color-surface-container-low)",
        modal
          ? "rounded-se-(--shape-corner-large) rounded-ee-(--shape-corner-large)"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {header}
      {items.map((it, i) =>
        it.heading ? (
          <Heading
            key={"h" + i}
            as="h2"
            variant="title-small"
            className="px-4 py-4.5 text-(--color-on-surface-variant)"
          >
            {it.heading}
          </Heading>
        ) : (
          <button
            key={it.value}
            type="button"
            className={[
              "fx-reset fx-state relative flex items-center gap-3 h-14 pl-4 pr-6 border-none rounded-full cursor-pointer text-start w-full no-underline",
              it.value === value
                ? "bg-(--color-secondary-container) text-(--color-on-secondary-container)"
                : "bg-transparent text-(--color-on-surface-variant)",
            ].join(" ")}
            aria-current={it.value === value ? "page" : undefined}
            onClick={() => onChange && onChange(it.value as string)}
          >
            {it.icon ? (
              <Icon name={it.icon} size={24} filled={it.value === value} />
            ) : null}
            <Text as="span" variant="label-large">
              {it.label}
            </Text>
            {it.badge ? (
              <Text as="span" variant="label-large" className="ms-auto">
                {it.badge}
              </Text>
            ) : null}
          </button>
        ),
      )}
    </nav>
  );
}
