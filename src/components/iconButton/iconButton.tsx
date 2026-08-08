import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../button/button";
import { useSurface } from "../../surface-context";

interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  children: ReactNode;
}

const BASE =
  "inline-flex cursor-pointer items-center justify-center rounded-lg p-1 h-8 w-8";

export function IconButton({
  className = "",
  children,
  ...props
}: IconButtonProps) {
  const surface = useSurface();

  return (
    <Button
      surface={surface}
      className={[BASE, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Button>
  );
}
