import {
  cloneElement,
  CSSProperties,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import { Text } from "../text/text";

/** Plain tooltip on hover and focus of its single child. */
export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  label: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

type Placement = "top" | "bottom" | "left" | "right";

const POSITION_AREA: Record<Placement, string> = {
  top: "top center",
  bottom: "bottom center",
  left: "center left",
  right: "center right",
};

/**
 * Plain tooltip shown on hover and focus of its single child.
 *
 * A manual popover in the top layer, so no ancestor's overflow or stacking
 * context can clip or cover it, anchored to the child with CSS anchor
 * positioning (as Select does). Escape hides it.
 */
export function Tooltip({
  label,
  placement = "top",
  children,
  className = "",
  style,
  ...rest
}: TooltipProps) {
  const popoverRef = useRef<HTMLSpanElement>(null);
  const id = useId();
  const anchorName = "--tooltip-anchor-" + id.replace(/[^a-zA-Z0-9]/g, "");

  function show() {
    popoverRef.current?.showPopover();
  }
  function hide() {
    popoverRef.current?.hidePopover();
  }

  useEffect(() => {
    function hideOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") popoverRef.current?.hidePopover();
    }
    document.addEventListener("keydown", hideOnEscape);
    return () => document.removeEventListener("keydown", hideOnEscape);
  }, []);

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": id,
      })
    : children;

  return (
    <span
      className="inline-flex"
      style={{ ["anchorName" as string]: anchorName } as CSSProperties}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {trigger}
      <span
        ref={popoverRef}
        id={id}
        popover="manual"
        className={[
          "fx-reset m-1 inset-auto overflow-visible px-2 py-1 rounded-(--shape-corner-extra-small) bg-(--color-inverse-surface) text-(--color-inverse-on-surface) whitespace-nowrap pointer-events-none",
          "opacity-0 open:opacity-100 starting:open:opacity-0 transition-[opacity,display,overlay] transition-discrete duration-(--motion-duration-short4) ease-(--motion-easing-standard)",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        data-placement={placement}
        role="tooltip"
        style={
          {
            positionAnchor: anchorName,
            positionArea: POSITION_AREA[placement],
            positionTryFallbacks:
              placement === "top" || placement === "bottom"
                ? "flip-block"
                : "flip-inline",
            ...style,
          } as CSSProperties
        }
        {...rest}
      >
        <Text as="span" variant="body-small">
          {label}
        </Text>
      </span>
    </span>
  );
}
