import { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const BASE =
  "inline-flex cursor-pointer items-center justify-center transition rounded-lg p-1 h-8 w-8 text-on-surface hover:text-on-surface-hover hover:bg-surface-hover";

export function IconButton({
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button className={[BASE, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </button>
  );
}
