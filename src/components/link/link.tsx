import { ReactNode } from "react";
import { Text } from "../text/text";

interface LinkProps {
  href: string;
  variant?: "text" | "icon";
  title?: string;
  children: ReactNode;
}

export function Link({ href, variant = "text", title, children }: LinkProps) {
  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        className="opacity-80 hover:opacity-100 transition-opacity"
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="underline"
    >
      <Text size="sm">{children}</Text>
    </a>
  );
}
