import { HTMLAttributes, MouseEvent, ReactNode, useEffect } from "react";
import type { MaterialSymbol } from "material-symbols";
import { Heading } from "../heading/heading";
import { Icon } from "../icon/icon";
import { IconButton } from "../iconButton/iconButton";
import { Text } from "../text/text";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type DialogLayout = "default" | "full-screen";
type DialogVariant = DialogLayout | "responsive";

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  variant?: DialogVariant;
  /** Hero ligature. Supplying one centres the headline, per Material. Ignored when full-screen. */
  icon?: MaterialSymbol;
  headline?: ReactNode;
  /** Button row, right-aligned. Confirming action last. Rendered in the header when full-screen. */
  actions?: ReactNode;
}

const SCRIM_CLASSES: Record<DialogLayout, string> = {
  default:
    "fixed inset-0 bg-(--scrim-modal) flex items-center justify-center p-6 z-100 animate-[fade_300ms_var(--motion-easing-emphasized-decelerate)]",
  "full-screen": "fixed inset-0 flex z-100",
};

const SURFACE_CLASSES: Record<DialogLayout, string> = {
  default:
    "flex flex-col gap-4 w-[min(560px,100%)] min-w-70 min-h-35 max-h-[calc(100vh-96px)] p-6 rounded-(--shape-corner-extra-large) bg-(--color-surface-container-high) text-(--color-on-surface) shadow-(--elevation-dialog) animate-[dialog-in_300ms_var(--motion-easing-emphasized-decelerate)]",
  "full-screen":
    "flex flex-col w-full h-full bg-(--color-surface) text-(--color-on-surface) animate-[dialog-full-in_300ms_var(--motion-easing-emphasized-decelerate)]",
};

export function Dialog({
  open = false,
  onClose,
  variant = "responsive",
  icon,
  headline,
  children,
  actions,
  className = "",
  style,
  ...rest
}: DialogProps) {
  const isSmall = useMediaQuery("(max-width: 640px)");
  useEffect(() => {
    if (!open || !onClose) return;
    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;
  const fullScreen =
    variant === "full-screen" || (variant === "responsive" && isSmall);
  const layout: DialogLayout = fullScreen ? "full-screen" : "default";
  const showIcon = icon && !fullScreen;
  return (
    <div
      className={SCRIM_CLASSES[layout]}
      onClick={fullScreen ? undefined : onClose}
      role="presentation"
    >
      <div
        className={[SURFACE_CLASSES[layout], className]
          .filter(Boolean)
          .join(" ")}
        data-variant={variant}
        data-layout={layout}
        data-centered={showIcon ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-label={typeof headline === "string" ? headline : undefined}
        onClick={(e: MouseEvent) => e.stopPropagation()}
        style={style}
        {...rest}
      >
        {fullScreen ? (
          <div className="flex items-center gap-1 h-14 pl-1 pr-3 shrink-0">
            {onClose ? (
              <IconButton icon="close" label="Close" onClick={onClose} />
            ) : null}
            {headline ? (
              <Heading
                as="h2"
                variant="title-large"
                className="flex-1 min-w-0 truncate pl-3"
              >
                {headline}
              </Heading>
            ) : (
              <span className="flex-1" />
            )}
            {actions ? <div className="flex gap-2">{actions}</div> : null}
          </div>
        ) : (
          <>
            {showIcon ? (
              <span className="self-center text-(--color-secondary)">
                <Icon name={icon} size={24} />
              </span>
            ) : null}
            {headline ? (
              <Heading
                as="h2"
                variant="headline-small"
                className={showIcon ? "text-center" : ""}
              >
                {headline}
              </Heading>
            ) : null}
          </>
        )}
        <Text
          as="div"
          variant="body-medium"
          className={[
            "text-(--color-on-surface-variant) overflow-auto flex-1",
            fullScreen ? "px-6 pb-6" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </Text>
        {actions && !fullScreen ? (
          <div className="flex justify-end gap-2 pt-2">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
