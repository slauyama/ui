import { HTMLAttributes, ReactNode } from "react";
import { Text } from "../text/text";

/** Count or dot marker. With children, anchors to their top-right corner. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  value?: ReactNode;
  /** 6px dot with no label. */
  dot?: boolean;
}

/** Count or dot marker. Wrap a child to anchor it to that child's top-right. */
export function Badge({
  value,
  dot = false,
  children,
  className = "",
  style,
  ...rest
}: BadgeProps) {
  const anchored = !!children;
  const badge = (
    <span
      className={[
        "inline-flex items-center justify-center rounded-(--shape-corner-full) bg-(--color-error) text-(--color-on-error)",
        dot ? "min-w-1.5 w-1.5 h-1.5 p-0" : "min-w-4 h-4 px-1",
        anchored
          ? "absolute top-0 right-0 translate-x-[35%] translate-y-[-20%]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-dot={dot ? "true" : "false"}
      style={style}
      {...rest}
    >
      {dot ? null : (
        <Text as="span" variant="label-small">
          {value}
        </Text>
      )}
    </span>
  );
  if (!children) return badge;
  return (
    <span className="relative inline-flex">
      {children}
      {badge}
    </span>
  );
}
