import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const BASE = "bg-surface rounded-lg border border-outline-subtle shadow-sm";

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div className={[BASE, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
