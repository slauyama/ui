import { HTMLAttributes, ReactNode, useState } from "react";
import { Text } from "../text/text";

/** Plain tooltip on hover and focus of its single child. */
export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  label: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

type Placement = "top" | "bottom" | "left" | "right";

const PLACEMENT_CLASSES: Record<Placement, string> = {
  top: "bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2",
  bottom: "top-[calc(100%+4px)] left-1/2 -translate-x-1/2",
  right: "left-[calc(100%+4px)] top-1/2 -translate-y-1/2",
  left: "right-[calc(100%+4px)] top-1/2 -translate-y-1/2",
};

/** Plain tooltip shown on hover and focus of its single child. */
export function Tooltip({
  label,
  placement = "top",
  children,
  className = "",
  style,
  ...rest
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        className={[
          "absolute z-60 px-2 py-1 rounded-(--shape-corner-extra-small) bg-(--color-inverse-surface) text-(--color-inverse-on-surface) whitespace-nowrap pointer-events-none transition-opacity duration-(--motion-duration-short4) ease-(--motion-easing-standard)",
          open ? "opacity-100" : "opacity-0",
          PLACEMENT_CLASSES[placement],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        data-open={open ? "true" : "false"}
        data-placement={placement}
        role="tooltip"
        style={style}
        {...rest}
      >
        <Text as="span" variant="body-small">
          {label}
        </Text>
      </span>
    </span>
  );
}
