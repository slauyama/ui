import { HTMLAttributes, ReactNode } from "react";
import { Button } from "../button/button";
import { IconButton } from "../iconButton/iconButton";
import { Text } from "../text/text";

/** Brief inverse-surface message with at most one action. */
export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  message: ReactNode;
  /** Action label. One only, and never "OK". */
  action?: string;
  onAction?: () => void;
  /** Supplying this adds a dismiss icon button. */
  onClose?: () => void;
}

/** Brief inverse-surface message with at most one action. */
export function Snackbar({
  open = true,
  message,
  action,
  onAction,
  onClose,
  className = "",
  style,
  ...rest
}: SnackbarProps) {
  if (!open) return null;
  return (
    <div
      className={`flex items-center gap-2 min-h-12 min-w-72 max-w-140 py-2 pr-2 pl-4 rounded-(--shape-corner-extra-small) bg-(--color-inverse-surface) text-(--color-inverse-on-surface) shadow-(--elevation-level3) animate-[snack-in_300ms_var(--motion-easing-emphasized-decelerate)] ${className}`}
      role="status"
      style={style}
      {...rest}
    >
      <Text as="span" variant="body-medium" className="flex-1">
        {message}
      </Text>
      {action ? (
        <Button
          variant="text"
          className="text-(--color-inverse-primary)!"
          onClick={onAction}
        >
          {action}
        </Button>
      ) : null}
      {onClose ? (
        <IconButton
          icon="close"
          label="Dismiss"
          className="text-(--color-inverse-on-surface)!"
          onClick={onClose}
        />
      ) : null}
    </div>
  );
}
