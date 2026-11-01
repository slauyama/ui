import {
  CSSProperties,
  Fragment,
  HTMLAttributes,
  ReactNode,
  useRef,
} from "react";
import { useHideOnScroll } from "../../hooks/useHideOnScroll";
import { Heading } from "../heading/heading";

/**
 * App bar in four heights: small 64, centred 64, medium 112, large 152.
 * Sticks to the top of the page, lifts and fades out while the window scrolls
 * down, and comes back on scroll up or when focus moves into it.
 */
export interface TopAppBarProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  variant?: "small" | "small-centered" | "medium" | "large";
  title?: ReactNode;
  /** Leading slot, usually a menu or back IconButton. */
  leading?: ReactNode;
  /** Trailing IconButtons, three at most. */
  actions?: ReactNode;
  /** Switches to the surface-container tone used once content scrolls under. */
  scrolled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Small, centred, medium or large app bar. Medium and large add a headline row. */
export function TopAppBar({
  variant = "small",
  title,
  leading,
  actions,
  scrolled = false,
  className = "",
  style,
  ...rest
}: TopAppBarProps) {
  const tall = variant === "medium" || variant === "large";
  const ref = useRef<HTMLElement>(null);
  const hidden = useHideOnScroll(ref);
  return (
    <header
      ref={ref}
      className={[
        "sticky top-0 z-10 flex items-center gap-1 text-(--color-on-surface) motion-reduce:[transition:background-color_var(--motion-state)]",
        hidden
          ? "-translate-y-full opacity-0 focus-within:translate-y-0 focus-within:opacity-100 [transition:background-color_var(--motion-state),translate_var(--motion-exit),opacity_var(--motion-exit)]"
          : "[transition:background-color_var(--motion-state),translate_var(--motion-enter),opacity_var(--motion-enter)]",
        scrolled ? "bg-(--color-surface-container)" : "bg-(--color-surface)",
        tall ? "flex-col items-stretch h-auto p-0" : "h-16 px-1",
        variant === "medium" ? "min-h-28" : "",
        variant === "large" ? "min-h-38" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {tall ? (
        <Fragment>
          <div className="flex items-center gap-1 h-16 px-1">
            {leading}
            <span style={{ flex: 1 }} />
            {actions}
          </div>
          {title ? (
            <Heading
              as="h1"
              variant={variant === "large" ? "headline-large" : "headline-medium"}
              className={variant === "large" ? "px-4 pb-7" : "px-4 pb-5"}
            >
              {title}
            </Heading>
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          {leading}
          {title ? (
            <Heading
              as="h1"
              variant="title-large"
              className={[
                "flex-1 px-3",
                variant === "small-centered" ? "text-center" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {title}
            </Heading>
          ) : (
            <div className="flex-1" />
          )}
          {actions}
        </Fragment>
      )}
    </header>
  );
}
