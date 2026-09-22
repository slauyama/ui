import {
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "../icon/icon";
import { Menu } from "../menu/menu";
import { Text } from "../text/text";
import { fieldBoxClasses, FIELD_ICON_CLASSES } from "../textField/textField";

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

/** A field that opens a Menu of options instead of accepting typed input. */
export interface SelectProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  variant?: "filled" | "outlined";
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  supportingText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** A text field that opens a menu instead of accepting typing. */
export function Select({
  variant = "outlined",
  label,
  value,
  onChange,
  options = [],
  supportingText,
  disabled = false,
  fullWidth = false,
  className = "",
  style,
  ...rest
}: SelectProps) {
  const [open, setOpen] = useState(false);
  // Viewport-relative box the menu is anchored to (for position: fixed).
  // Recomputed whenever it opens or the page scrolls/resizes, since the menu
  // itself renders through a portal and can no longer rely on CSS layout to
  // track its trigger.
  const [anchor, setAnchor] = useState<{ top: number; left: number; width: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);
  const float = !!selected;
  const classes = fieldBoxClasses({
    variant,
    focused: open,
    float,
    error: false,
    disabled,
    fullWidth,
  });

  useLayoutEffect(() => {
    if (!open) return;
    function updateAnchor() {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setAnchor({ top: r.bottom + 4, left: r.left, width: r.width });
    }
    updateAnchor();
    window.addEventListener("resize", updateAnchor);
    // capture: true so this also fires for scrolling inside any clipping
    // ancestor (a Card, a scrollable panel), not just window scroll — the
    // whole point of the portal is to escape that ancestor's overflow.
    window.addEventListener("scroll", updateAnchor, true);
    return () => {
      window.removeEventListener("resize", updateAnchor);
      window.removeEventListener("scroll", updateAnchor, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if ((target as Element)?.closest?.('[data-select-menu="true"]')) return;
      setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={[classes.root, className].filter(Boolean).join(" ")}
      style={{ position: "relative", ...style }}
      // aria-disabled, not disabled: this is a div, not a native form control.
      // Also lets axe's color-contrast check exempt the dimmed 38%-opacity
      // disabled text the same way it exempts a real disabled input/button.
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <div
        className={[classes.box, "cursor-pointer"].join(" ")}
        onClick={() => !disabled && setOpen(!open)}
      >
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
          {float ? (
            <Text
              as="span"
              variant="body-large"
              className="block w-full min-w-0 text-(--color-on-surface)"
            >
              {selected!.label}
            </Text>
          ) : null}
        </span>
        <span className={FIELD_ICON_CLASSES}>
          <Icon name={open ? "arrow_drop_up" : "arrow_drop_down"} />
        </span>
      </div>
      {supportingText ? (
        <div className={classes.support}>
          <Text as="span" variant="body-small">
            {supportingText}
          </Text>
        </div>
      ) : null}
      {open && anchor
        ? createPortal(
            // Portalled to <body> and positioned fixed (viewport-relative,
            // via getBoundingClientRect) so it isn't clipped by a Card's
            // overflow-hidden or a scrollable panel the field happens to
            // sit inside — the bug this works around.
            <div
              data-select-menu="true"
              className="fixed z-20"
              style={{ top: anchor.top, left: anchor.left, width: anchor.width }}
            >
              <Menu open style={{ width: "100%" }}>
                {options.map((o) => (
                  <Menu.Item
                    key={o.value}
                    label={o.label}
                    leading={o.icon}
                    selected={o.value === value}
                    onClick={() => {
                      setOpen(false);
                      onChange?.(o.value);
                    }}
                  />
                ))}
              </Menu>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
