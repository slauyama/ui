import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const BASE =
  "bg-white dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-700 shadow-sm";

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div className={[BASE, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
