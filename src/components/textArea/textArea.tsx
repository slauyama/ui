import { TextareaHTMLAttributes, useId } from "react";
import { motion } from "framer-motion";
import { useSurface } from "../../surface-context";
import { textColorBySurface } from "../../surfaces";
import { useFloatingLabel } from "../../hooks/useFloatingLabel";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextArea({
  label,
  placeholder,
  className = "",
  value,
  defaultValue,
  disabled,
  rows = 3,
  onChange,
  onFocus,
  onBlur,
  ...props
}: TextareaProps) {
  const surface = useSurface();

  // Unlike Input, it's anchored to the top rather than vertically
  // centered, so it doesn't drift as the textarea's height changes.
  const {
    isFocused,
    floated,
    rootRef,
    measureRef,
    notchTextRef,
    notchWidth,
    floatedLeft,
    idleLeft,
    handleChange,
    handleFocus,
    handleBlur,
  } = useFloatingLabel<HTMLTextAreaElement>({
    label,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
  });

  const generatedId = useId();
  const id = props.id ?? generatedId;

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
          isFocused
            ? "border-2 border-(--color-primary)"
            : "border border-(--color-outline)",
        ].join(" ")}
      >
        <legend
          className={[
            "box-border overflow-hidden text-xs whitespace-nowrap transition-[width,padding] duration-150 ease-out",
            floated ? "px-1" : "px-0",
          ].join(" ")}
          style={{ width: floated ? notchWidth + 6 : 0 }}
        >
          <span ref={notchTextRef} className="invisible">
            {label}
          </span>
        </legend>
      </fieldset>

      <textarea
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        rows={rows}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={floated ? placeholder : undefined}
        className={[
          "w-full resize-y bg-transparent px-3 pt-6 pb-2 text-sm focus:outline-none disabled:cursor-not-allowed",
          textColorBySurface(surface),
        ].join(" ")}
        {...props}
        id={id}
      />

      <motion.label
        htmlFor={id}
        className={[
          "pointer-events-none absolute origin-left select-none",
          isFocused
            ? "text-(--color-primary)"
            : "text-(--color-on-surface-muted)",
        ].join(" ")}
        initial={false}
        animate={
          floated
            ? { top: -4, scale: 0.75, left: floatedLeft + 6 }
            : { top: 14, scale: 1, left: idleLeft }
        }
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <span className="text-sm">{label}</span>
      </motion.label>
    </div>
  );
}
