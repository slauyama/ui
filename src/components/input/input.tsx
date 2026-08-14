import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { useSurface } from "../../surface-context";
import { textColorBySurface } from "../../surfaces";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
}

export function Input({
  prefix,
  label,
  placeholder,
  className = "",
  value,
  defaultValue,
  disabled,
  onChange,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const surface = useSurface();
  const id = useId();
  const isControlled = value !== undefined;
  const [focused, setFocused] = useState(false);
  const [uncontrolledHasValue, setUncontrolledHasValue] =
    useState(!!defaultValue);

  const hasValue = isControlled ? !!value : uncontrolledHasValue;
  const floated = focused || hasValue;

  // The input has notch around the floated label, rendered natively by
  // the browser via <fieldset>/<legend>. The legend's width has to
  // match the label's rendered width at its floated (text-xs) size,
  // so we measure a hidden copy of the label.
  const rootRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const notchTextRef = useRef<HTMLSpanElement>(null);
  const prefixRef = useRef<HTMLSpanElement>(null);
  const [notchWidth, setNotchWidth] = useState(0);
  const [floatedLeft, setFloatedLeft] = useState(0);
  const [idleLeft, setIdleLeft] = useState(0);

  useEffect(() => {
    if (measureRef.current) {
      setNotchWidth(measureRef.current.offsetWidth);
    }
  }, [label]);

  useEffect(() => {
    if (!rootRef.current || !notchTextRef.current) return;
    const rootLeft = rootRef.current.getBoundingClientRect().left;
    const notchLeft =
      notchTextRef.current.getBoundingClientRect().left - rootLeft;
    setFloatedLeft(notchLeft);
    setIdleLeft(
      prefixRef.current
        ? prefixRef.current.getBoundingClientRect().right - rootLeft + 4
        : notchLeft,
    );
  }, [label, prefix, notchWidth]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setUncontrolledHasValue(e.target.value.length > 0);
    onChange?.(e);
  }
  function handleFocus(e: FocusEvent<HTMLInputElement>) {
    setFocused(true);
    onFocus?.(e);
  }
  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    setFocused(false);
    onBlur?.(e);
  }

  return (
    <div
      ref={rootRef}
      className={["relative", disabled ? "opacity-[0.38]" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute -top-full left-0 text-xs whitespace-nowrap"
      >
        {label}
      </span>

      <fieldset
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 m-0 min-w-0 rounded-lg px-3 transition-colors duration-150 ease-out",
          focused
            ? "border-2 border-(--color-primary)"
            : "border border-(--color-outline)",
        ].join(" ")}
      >
        <legend
          className={[
            "box-border overflow-hidden text-xs whitespace-nowrap transition-[width,padding] duration-150 ease-out",
            floated ? "px-1" : "px-0",
          ].join(" ")}
          style={{ width: floated ? notchWidth + 8 : 0 }}
        >
          <span ref={notchTextRef} className="invisible">
            {label}
          </span>
        </legend>
      </fieldset>

      <div className="flex items-center gap-1 px-3">
        {prefix && (
          <span
            ref={prefixRef}
            className={[
              "py-4 text-sm select-none",
              textColorBySurface(surface),
            ].join(" ")}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={floated ? placeholder : undefined}
          className={[
            "w-full bg-transparent py-4 text-sm focus:outline-none disabled:cursor-not-allowed",
            textColorBySurface(surface),
          ].join(" ")}
          {...props}
        />
      </div>

      <motion.label
        htmlFor={id}
        className={[
          "pointer-events-none absolute origin-left select-none",
          focused
            ? "text-(--color-primary)"
            : "text-(--color-on-surface-muted)",
        ].join(" ")}
        initial={false}
        animate={
          floated
            ? { top: 6, y: "-50%", scale: 0.75, left: floatedLeft + 6 }
            : { top: 25, y: "-50%", scale: 1, left: idleLeft }
        }
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <span className="text-sm">{label}</span>
      </motion.label>
    </div>
  );
}
