import { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const BASE =
  "inline-flex items-center justify-center transition rounded-lg p-1 h-8 w-8 text-zinc-400 hover:text-zinc-600 hover:bg-secondary-hover dark:hover:text-zinc-200";

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
