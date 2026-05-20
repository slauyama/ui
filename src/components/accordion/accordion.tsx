import { useId, type ReactNode } from "react";
import { useIsOpen } from "../../hooks/useIsOpen";

interface AccordionProps {
  triggerNode: ReactNode;
  panelNode: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  triggerNode,
  panelNode,
  defaultOpen = false,
}: AccordionProps) {
  const id = useId();
  const { isOpen, open, close } = useIsOpen(defaultOpen);

  return (
    <div>
      <button
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={isOpen ? close : open}
        className="flex w-full p-4 items-center justify-between gap-4 text-left"
      >
        {triggerNode}
        <span
          aria-hidden
          className={`transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div
            className={`transition-opacity duration-300 ${isOpen ? "opacity-100 delay-100" : "opacity-0"}`}
          >
            {panelNode}
          </div>
        </div>
      </div>
    </div>
  );
}
