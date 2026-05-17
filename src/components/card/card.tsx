import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const BASE =
  "bg-secondary rounded-lg border border-border-secondary shadow-sm";

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div className={[BASE, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
