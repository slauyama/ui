import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../button/button";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const BASE =
  "inline-flex cursor-pointer items-center justify-center rounded-lg p-1 h-8 w-8";

export function IconButton({
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button
      surface="surface"
      className={[BASE, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Button>
  );
}
