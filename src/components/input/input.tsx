import { InputHTMLAttributes } from "react";
import { Text } from "../text/text";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
}

const BASE =
  "w-full bg-surface border border-outline text-on-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-subtle";

export function Input({ prefix, label, className = "", ...props }: InputProps) {
  const input = prefix ? (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-subtle text-sm select-none">
        {prefix}
      </span>
      <input
        className={[BASE, "pl-6", className].filter(Boolean).join(" ")}
        {...props}
      />
    </div>
  ) : (
    <input className={[BASE, className].filter(Boolean).join(" ")} {...props} />
  );

  return (
    <div>
      <Text as="label" variant="label" className="block mb-1">
        {label}
      </Text>
      {input}
    </div>
  );
}
