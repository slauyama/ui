import {
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";
import { Menu } from "../menu/menu";
import { Text } from "../text/text";
import { fieldBoxClasses, FIELD_ICON_CLASSES } from "../textField/textField";

export interface SelectOption {
  value: string;
  label: string;
  icon?: MaterialSymbol;
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

/**
 * A text field that opens a menu instead of accepting typing.
 *
 * The menu is a native popover (`popover="auto"`), anchored to the field via
 * CSS Anchor Positioning (`anchor-name` / `position-anchor` / `anchor()`) —
 * no portal, no manual getBoundingClientRect()/scroll-listener tracking.
 * Popovers render in the browser's top layer, so they escape any ancestor's
 * `overflow: hidden`/`auto` clipping (a Card, a scrollable panel) the same
 * way a portal would, and get outside-click / Escape-to-close for free.
 * Baseline support (Chrome 125+, Firefox 132+, Safari 18.2+, ~91% global as
 * of 2026) comfortably covers this library's floor.
 */
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
  const [hasFocus, setHasFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openAtPointerDown = useRef(false);
  const id = useId();
  const listboxId = `${id}-listbox`;
  function optionId(i: number) {
    return `${id}-option-${i}`;
  }
  // anchor-name is a global CSS ident, so it has to be unique per instance —
  // useId()'s colons aren't valid in a custom ident, so strip them.
  const anchorName = "--select-anchor-" + id.replace(/[^a-zA-Z0-9]/g, "");
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];
  const float = !!selected;
  const classes = fieldBoxClasses({
    variant,
    focused: open || hasFocus,
    float,
    error: false,
    disabled,
    fullWidth,
    label,
  });
  // Outlined + floated: the notch's <legend> holds the label instead (see
  // fieldBoxClasses) — rendering it here too would show it twice.
  const showInlineLabel = variant === "filled" || !float;

  // The `toggle` event is how a popover reports light-dismiss (outside
  // click, Escape) back to us — React's typed event props don't cover it
  // on an arbitrary div, so it's wired directly rather than via JSX.
  useEffect(() => {
    const el = popoverRef.current;
    if (!el) return;
    function onToggle(e: Event) {
      setOpen((e as ToggleEvent).newState === "open");
    }
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, []);

  useEffect(() => {
    if (open && activeIndex >= 0) {
      document
        .getElementById(optionId(activeIndex))
        ?.scrollIntoView({ block: "nearest" });
    }
  });

  function show(index: number) {
    setActiveIndex(index);
    popoverRef.current?.showPopover();
  }

  function hide() {
    popoverRef.current?.hidePopover();
  }

  function choose(index: number) {
    hide();
    onChange?.(options[index].value);
  }

  // The toggle event that updates `open` arrives a task later, so read the
  // popover's live state: a second keypress can land before it.
  function isOpen() {
    return !!popoverRef.current?.matches(":popover-open");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (disabled || options.length === 0) return;
    const last = options.length - 1;
    if (!isOpen()) {
      if (["ArrowDown", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show(Math.max(selectedIndex, 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        show(selectedIndex >= 0 ? selectedIndex : last);
      }
      return;
    }
    const moves: Record<string, number> = {
      ArrowDown: Math.min(activeIndex + 1, last),
      ArrowUp: Math.max(activeIndex - 1, 0),
      Home: 0,
      End: last,
    };
    if (e.key in moves) {
      e.preventDefault();
      setActiveIndex(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeIndex >= 0) choose(activeIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "Tab") {
      hide();
    }
  }

  return (
    <div
      className={[classes.root, className].filter(Boolean).join(" ")}
      style={{
        ...style,
        // Cast: `anchorName` postdates the shipped CSSProperties types in
        // some toolchains even though every Baseline-2026 browser supports it.
        ["anchorName" as string]: anchorName,
      } as CSSProperties}
      // aria-disabled, not disabled: this is a div, not a native form control.
      // Also lets axe's color-contrast check exempt the dimmed 38%-opacity
      // disabled text the same way it exempts a real disabled input/button.
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <div
        className={[classes.box, "cursor-pointer outline-none"].join(" ")}
        role="combobox"
        tabIndex={disabled ? undefined : 0}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open && activeIndex >= 0 ? optionId(activeIndex) : undefined
        }
        aria-disabled={disabled || undefined}
        onKeyDown={handleKeyDown}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onPointerDown={() => {
          openAtPointerDown.current = isOpen();
        }}
        onClick={() => {
          if (disabled || openAtPointerDown.current) return;
          show(Math.max(selectedIndex, 0));
        }}
      >
        {classes.notch}
        <span className={classes.content}>
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
        </span>
      </div>
      {supportingText ? (
        <div className={classes.support}>
          <Text as="span" variant="body-small">
            {supportingText}
          </Text>
        </div>
      ) : null}
      <div
        ref={popoverRef}
        popover="auto"
        className="m-0 p-0 border-none bg-transparent overflow-visible"
        style={{
          position: "fixed",
          positionAnchor: anchorName,
          top: `calc(anchor(${anchorName} bottom) + 4px)`,
          left: `anchor(${anchorName} left)`,
          width: `anchor-size(${anchorName} width)`,
          // Flips above the field when there's no room below — collision
          // handling the old rect-tracked version never had.
          positionTryFallbacks: "flip-block",
        } as CSSProperties}
      >
        <Menu
          open
          role="listbox"
          id={listboxId}
          aria-label={label}
          style={{ width: "100%" }}
        >
          {options.map((o, i) => (
            <Menu.Item
              key={o.value}
              id={optionId(i)}
              role="option"
              aria-selected={o.value === value}
              tabIndex={-1}
              label={o.label}
              leading={o.icon}
              selected={o.value === value}
              className={
                i === activeIndex
                  ? "ring-2 ring-inset ring-(--color-primary)"
                  : ""
              }
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => choose(i)}
            />
          ))}
        </Menu>
      </div>
    </div>
  );
}
