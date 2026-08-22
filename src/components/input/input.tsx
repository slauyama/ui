import { InputHTMLAttributes, useId, useRef } from "react";
import { motion } from "framer-motion";
import { useSurface } from "../../surface-context";
import { textColorBySurface } from "../../surfaces";
import { useFloatingLabel } from "../../hooks/useFloatingLabel";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
}

function InputBase({
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
  const prefixRef = useRef<HTMLSpanElement>(null);
  const isDate = props.type === "date";

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
  } = useFloatingLabel<HTMLInputElement>({
    label,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    anchorRef: prefixRef,
    remeasureDeps: [prefix],
    forceFloated: isDate,
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
        className="pointer-events-none opacity-0 absolute -top-full left-0 text-xs whitespace-nowrap"
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
          id={id}
        />
      </div>

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

function InputText(props: Omit<InputProps, "type">) {
  return <InputBase {...props} type="text" />;
}

function InputDate(props: Omit<InputProps, "type">) {
  return <InputBase {...props} type="date" />;
}

export const Input = Object.assign(InputBase, {
  Text: InputText,
  Date: InputDate,
});
