import {
  AnchorHTMLAttributes,
  CSSProperties,
  ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import { Text } from "../text/text";

type Placement = "top" | "bottom";

/** Inline link that previews its destination in a card on hover and focus. */
export interface LinkPreviewProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  href: string;
  title: ReactNode;
  description?: ReactNode;
  /** Thumbnail URL shown above the title. */
  image?: string;
  placement?: Placement;
}

/** Long enough that skimming the pointer across a paragraph of links doesn't flash cards. */
const OPEN_DELAY_MS = 300;

/** Grows out of the link: starts 6px toward it, slightly smaller, scaling from its edge. */
const ENTER_FROM_LINK: Record<Placement, string> = {
  top: "origin-bottom motion-safe:starting:open:translate-y-1.5 motion-safe:starting:open:scale-95",
  bottom:
    "origin-top motion-safe:starting:open:-translate-y-1.5 motion-safe:starting:open:scale-95",
};

/**
 * Centred on the link across the whole width (`center` alone would confine the
 * card to the link's width and always overflow), then slid sideways, then flipped.
 */
const POSITION_TRY_FALLBACKS: Record<Placement, string> = {
  top: "top span-right, top span-left, flip-block, bottom span-right, bottom span-left",
  bottom:
    "bottom span-right, bottom span-left, flip-block, top span-right, top span-left",
};

/**
 * Inline link that previews its destination (thumbnail, title, description)
 * in a display-only card after a short hover or focus.
 *
 * The card is a manual popover in the top layer, anchored to the link like
 * Tooltip, and ignores the pointer so it can never trap it or focus. It
 * describes the link to assistive tech. Escape hides it.
 */
export function LinkPreview({
  href,
  title,
  description,
  image,
  placement = "top",
  children,
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: LinkPreviewProps) {
  const popoverRef = useRef<HTMLSpanElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();
  const anchorName = "--link-preview-anchor-" + id.replace(/[^a-zA-Z0-9]/g, "");

  function show() {
    clearTimeout(openTimer.current);
    openTimer.current = setTimeout(
      () => popoverRef.current?.showPopover(),
      OPEN_DELAY_MS,
    );
  }
  function hide() {
    clearTimeout(openTimer.current);
    popoverRef.current?.hidePopover();
  }

  useEffect(() => {
    function hideOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") hide();
    }
    document.addEventListener("keydown", hideOnEscape);
    return () => {
      document.removeEventListener("keydown", hideOnEscape);
      clearTimeout(openTimer.current);
    };
  }, []);

  return (
    <>
      <a
        href={href}
        aria-describedby={id}
        className={[
          "text-(--color-primary) underline decoration-1 underline-offset-2 hover:decoration-2 rounded-(--shape-corner-extra-small) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ ["anchorName" as string]: anchorName, ...style } as CSSProperties}
        onMouseEnter={(e) => {
          show();
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          hide();
          onMouseLeave?.(e);
        }}
        onFocus={(e) => {
          show();
          onFocus?.(e);
        }}
        onBlur={(e) => {
          hide();
          onBlur?.(e);
        }}
        {...rest}
      >
        {children}
      </a>
      <span
        ref={popoverRef}
        id={id}
        popover="manual"
        role="tooltip"
        data-placement={placement}
        className={[
          "fx-reset m-2 inset-auto open:flex flex-col w-72 overflow-hidden rounded-(--shape-corner-medium) bg-(--color-surface-container) text-(--color-on-surface) shadow-(--elevation-level2) pointer-events-none",
          "opacity-0 open:opacity-100 starting:open:opacity-0 transition-[opacity,translate,scale,display,overlay] transition-discrete duration-(--motion-duration-short2) ease-(--motion-easing-standard-accelerate) open:duration-(--motion-duration-medium3) open:ease-(--motion-easing-glide)",
          ENTER_FROM_LINK[placement],
        ].join(" ")}
        style={
          {
            positionAnchor: anchorName,
            positionArea: placement + " span-all",
            positionTryFallbacks: POSITION_TRY_FALLBACKS[placement],
          } as CSSProperties
        }
      >
        {image && (
          <img
            src={image}
            alt=""
            className="block w-full aspect-video object-cover bg-(--color-surface-container-highest)"
          />
        )}
        <span className="flex flex-col gap-1 px-4 py-3">
          <Text as="span" variant="title-small">
            {title}
          </Text>
          {description && (
            <Text
              as="span"
              variant="body-small"
              className="text-(--color-on-surface-variant) line-clamp-2"
            >
              {description}
            </Text>
          )}
        </span>
      </span>
    </>
  );
}
