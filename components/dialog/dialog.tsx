import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  SyntheticEvent,
  useLayoutEffect,
  useRef,
} from "react";
import type { MaterialSymbol } from "material-symbols";
import { Heading } from "../heading/heading";
import { Icon } from "../icon/icon";
import { IconButton } from "../iconButton/iconButton";
import { Text } from "../text/text";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type DialogLayout = "default" | "full-screen";
type DialogVariant = DialogLayout | "responsive";

export interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onClose?: () => void;
  variant?: DialogVariant;
  /** Hero ligature. Supplying one centres the headline, per Material. Ignored when full-screen. */
  icon?: MaterialSymbol;
  headline?: ReactNode;
  /** Button row, right-aligned. Confirming action last. Rendered in the header when full-screen. */
  actions?: ReactNode;
}

const SURFACE_CLASSES: Record<DialogLayout, string> = {
  default:
    "fx-reset m-auto flex flex-col gap-4 w-[min(560px,calc(100%-48px))] max-w-none min-w-70 min-h-35 max-h-[calc(100vh-96px)] p-6 rounded-(--shape-corner-extra-large) bg-(--color-surface-container-high) text-(--color-on-surface) shadow-(--elevation-dialog) animate-[dialog-in_300ms_var(--motion-easing-emphasized-decelerate)] backdrop:bg-(--scrim-modal) backdrop:animate-[fade_300ms_var(--motion-easing-emphasized-decelerate)]",
  "full-screen":
    "fx-reset flex flex-col w-full h-full max-w-none max-h-none bg-(--color-surface) text-(--color-on-surface) animate-[dialog-full-in_300ms_var(--motion-easing-emphasized-decelerate)] backdrop:bg-transparent",
};

function isOutside(e: MouseEvent<HTMLDialogElement>) {
  if (e.target !== e.currentTarget) return false;
  const r = e.currentTarget.getBoundingClientRect();
  return (
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom
  );
}

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
  onClick,
  ...rest
}: DialogProps) {
  const isSmall = useMediaQuery("(max-width: 640px)");
  const ref = useRef<HTMLDialogElement>(null);

  // React detaches the <dialog> before this cleanup runs, so the browser's own
  // focus restoration is skipped; return focus to the opener by hand.
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const opener = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [open]);

  if (!open) return null;
  const fullScreen =
    variant === "full-screen" || (variant === "responsive" && isSmall);
  const layout: DialogLayout = fullScreen ? "full-screen" : "default";
  const showIcon = icon && !fullScreen;

  function handleCancel(e: SyntheticEvent<HTMLDialogElement>) {
    e.preventDefault();
    onClose?.();
  }

  function handleClick(e: MouseEvent<HTMLDialogElement>) {
    onClick?.(e);
    if (isOutside(e)) onClose?.();
  }

  return (
    <dialog
      ref={ref}
      className={[SURFACE_CLASSES[layout], className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-layout={layout}
      data-centered={showIcon ? "true" : "false"}
      aria-label={typeof headline === "string" ? headline : undefined}
      onCancel={handleCancel}
      onClose={() => onClose?.()}
      onClick={handleClick}
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
    </dialog>
  );
}
