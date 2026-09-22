import { HTMLAttributes, MouseEvent, ReactNode, useEffect } from "react";
import { Heading } from "../heading/heading";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

/** Modal dialog: scrim, 28px corner, surface-container-high, elevation 3. */
export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  /** Hero ligature. Supplying one centres the headline, per Material. */
  icon?: string;
  headline?: ReactNode;
  /** Button row, right-aligned. Confirming action last. */
  actions?: ReactNode;
}

/** Modal dialog on a 28px-corner surface-container-high panel. */
export function Dialog({
  open = false,
  onClose,
  icon,
  headline,
  children,
  actions,
  className = "",
  style,
  ...rest
}: DialogProps) {
  useEffect(() => {
    if (!open || !onClose) return;
    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-(--scrim-modal) flex items-center justify-center p-6 z-100 animate-[fade_300ms_var(--motion-easing-emphasized-decelerate)]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={[
          "flex flex-col gap-4 w-[min(560px,100%)] min-w-70 min-h-35 max-h-[calc(100vh-96px)] p-6 rounded-(--shape-corner-extra-large) bg-(--color-surface-container-high) text-(--color-on-surface) shadow-(--elevation-dialog) animate-[dialog-in_300ms_var(--motion-easing-emphasized-decelerate)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        data-centered={icon ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-label={typeof headline === "string" ? headline : undefined}
        onClick={(e: MouseEvent) => e.stopPropagation()}
        style={style}
        {...rest}
      >
        {icon ? (
          <span className="self-center text-(--color-secondary)">
            <Icon name={icon} size={24} />
          </span>
        ) : null}
        {headline ? (
          <Heading
            as="h2"
            variant="headline-small"
            className={icon ? "text-center" : ""}
          >
            {headline}
          </Heading>
        ) : null}
        <Text
          as="div"
          variant="body-medium"
          className="text-(--color-on-surface-variant) overflow-auto flex-1"
        >
          {children}
        </Text>
        {actions ? (
          <div className="flex justify-end gap-2 pt-2">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
