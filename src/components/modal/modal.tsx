import { ReactNode, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  headerAction?: ReactNode;
  onClose?: () => void;
  className?: string;
  closeOnBackdrop?: boolean;
  modalControls: ModalControls;
}

const TRANSITION = { duration: 0.3, ease: "easeOut" as const };

export function Modal({
  children,
  title,
  subtitle,
  surface = "surface",
  variant = "basic",
  headerAction,
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

  function FullScreenModal() {
    return (
      <motion.div
        key="fullscreen"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={TRANSITION}
        className={[
          "fixed inset-0 z-40 flex flex-col",
          bgColorBySurface(surface),
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
          {headerAction && (
            <div className="flex shrink-0 items-center gap-2">
              {headerAction}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </motion.div>
    );
  }

  function BasicModal() {
    return (
      <motion.div
        key="basic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={TRANSITION}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
        onClick={closeOnBackdrop ? handleClose : undefined}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={TRANSITION}
          className={[
            bgColorBySurface(surface),
            "w-full max-w-lg rounded-2xl shadow-xl",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between px-6 pt-5">
            <div>
              <Heading as="h2" variant="title">
                {title}
              </Heading>
              {subtitle && <Text className="mt-0.5">{subtitle}</Text>}
            </div>
            <IconButton
              onClick={handleClose}
              className="-mr-1 shrink-0 text-xl"
            >
              &times;
            </IconButton>
          </div>
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <SurfaceProvider surface={surface}>
      <AnimatePresence>
        {modalControls.isOpen &&
          (variant === "fullscreen" ? <FullScreenModal /> : <BasicModal />)}
      </AnimatePresence>
    </SurfaceProvider>
  );
}
