import { useState } from "react";

export type ModalControls = ReturnType<typeof useIsOpen>;

export function useIsOpen(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
