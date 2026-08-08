import { InputHTMLAttributes, useId } from "react";
import { Label } from "../label/label";
import { useSurface } from "../../surface-context";
import { bgColorBySurface, textColorBySurface } from "../../surfaces";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
}

const BASE =
  "w-full border border-(--color-outline-subtle) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--color-outline) placeholder:text-on-surface";

export function Input({ prefix, label, className = "", ...props }: InputProps) {
  const surface = useSurface();
  const id = useId();

  const classes = [
    BASE,
    bgColorBySurface(surface),
    textColorBySurface(surface),
    "pl-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const input = prefix ? (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-subtle text-sm select-none">
        {prefix}
      </span>
      <input id={id} className={classes} {...props} />
    </div>
  ) : (
    <input id={id} className={classes} {...props} />
  );

  return (
    <>
      <Label htmlFor={id} className="block mb-1">
        {label}
      </Label>
      {input}
    </>
  );
}
