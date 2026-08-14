import { ReactNode, useCallback, useEffect } from "react";
import { type ModalControls } from "../../hooks/useIsOpen";
import { Heading } from "../heading/heading";
import { IconButton } from "../iconButton/iconButton";
import { Text } from "../text/text";
import { SurfaceProvider } from "../../surface-context";
import { bgColorBySurface, Surface } from "../../surfaces";

type Variant = "basic" | "fullscreen";

interface ModalProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  surface?: Surface;
  variant?: Variant;
  headerActions?: ReactNode;
  onClose?: () => void;
  className?: string;
  closeOnBackdrop?: boolean;
  modalControls: ModalControls;
}

export function Modal({
  children,
  title,
  subtitle,
  surface = "surface",
  variant = "basic",
  headerActions,
  onClose,
  className = "",
  closeOnBackdrop = true,
  modalControls,
}: ModalProps) {
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    modalControls.close();
  }, [onClose, modalControls]);

  useEffect(() => {
    if (!modalControls.isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalControls.isOpen, handleClose]);

  // M3 full-screen dialogs: https://m3.material.io/components/dialogs/specs
  // Cover the entire viewport (no scrim, no rounded corners), with a top
  // bar whose close action sits at the leading edge rather than trailing.
  if (variant === "fullscreen") {
    return (
      <SurfaceProvider surface={surface}>
        <div
          className={[
            "fixed inset-0 z-40 flex flex-col transition-all duration-300",
            bgColorBySurface(surface),
            modalControls.isOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 pointer-events-none",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="flex shrink-0 items-center gap-4 border-b border-(--color-outline-subtle) px-4 py-3">
            <IconButton onClick={handleClose} className="shrink-0 text-xl">
              &times;
            </IconButton>
            <div className="min-w-0 flex-1">
              <Heading as="h2" variant="subtitle">
                {title}
              </Heading>
              {subtitle && <Text className="mt-0.5">{subtitle}</Text>}
            </div>
            {headerActions && (
              <div className="flex shrink-0 items-center gap-2">
                {headerActions}
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </SurfaceProvider>
    );
  }

  return (
    <SurfaceProvider surface={surface}>
      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4 transition-all duration-300 ${modalControls.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeOnBackdrop ? handleClose : undefined}
      >
        <div
          className={`${bgColorBySurface(surface)} rounded-2xl shadow-xl w-full max-w-lg transition-all duration-300 transform ${modalControls.isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start px-6 pt-5">
            <div>
              <Heading as="h2" variant="title">
                {title}
              </Heading>
              {subtitle && <Text className="mt-0.5">{subtitle}</Text>}
            </div>
            <IconButton
              onClick={handleClose}
              className="text-xl shrink-0 -mr-1"
            >
              &times;
            </IconButton>
          </div>
          {children}
        </div>
      </div>
    </SurfaceProvider>
  );
}
