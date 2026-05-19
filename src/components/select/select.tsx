import { SelectHTMLAttributes } from "react";
import { Text } from "../text/text";

type SelectOption = string | { value: string; label: string };
type Variant = "default" | "pill";

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "value"
> {
  value: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: Variant;
  label?: string;
}

const BASE =
  "bg-surface text-sm text-on-surface-muted border border-outline focus:outline-none focus:ring-2 focus:ring-primary/40";

const VARIANTS: Record<Variant, string> = {
  default: "rounded-lg px-3 py-2",
  pill: "rounded-full px-3 py-1",
};

export function Select({
  value,
  onChange,
  options,
  placeholder,
  variant = "default",
  label,
  className = "",
  ...props
}: SelectProps) {
  const select = (
    <select
      value={value}
      onChange={onChange}
      className={[BASE, VARIANTS[variant], className].filter(Boolean).join(" ")}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.value;
        const optLabel = typeof opt === "string" ? opt : opt.label;
        return (
          <option key={val} value={val}>
            {optLabel}
          </option>
        );
      })}
    </select>
  );

  if (label) {
    return (
      <div>
        <Text as="label" className="block mb-1">
          {label}
        </Text>
        {select}
      </div>
    );
  }

  return select;
}
