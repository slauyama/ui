import { HTMLAttributes, ReactNode, useId, useState } from "react";
import { Heading } from "../heading/heading";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  headline: ReactNode;
  headingAs?: "h2" | "h3" | "h4" | "h5" | "h6";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** One collapsible section; the panel content is its children. */
export function Accordion({
  headline,
  headingAs = "h3",
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className = "",
  ...rest
}: AccordionProps) {
  const id = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;

  function toggle() {
    const next = !isOpen;
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  return (
    <div className={className} {...rest}>
      <Heading as={headingAs} variant="title-medium">
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={toggle}
          className="fx-reset fx-state relative flex w-full min-h-14 items-center justify-between gap-4 px-4 py-2 border-none bg-transparent text-(--color-on-surface) text-start cursor-pointer [font:inherit] tracking-[inherit]"
        >
          {headline}
          <Icon
            name="expand_more"
            color="var(--color-on-surface-variant)"
            className={`transition-transform duration-(--motion-duration-medium2) ease-(--motion-easing-emphasized) motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </Heading>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={`grid transition-[grid-template-rows] duration-(--motion-duration-medium2) ease-(--motion-easing-emphasized) motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <Text
            as="div"
            variant="body-medium"
            className={`px-4 pb-4 text-(--color-on-surface-variant) transition-opacity duration-(--motion-duration-medium2) motion-reduce:transition-none ${isOpen ? "opacity-100 delay-100" : "opacity-0"}`}
          >
            {children}
          </Text>
        </div>
      </div>
    </div>
  );
}
