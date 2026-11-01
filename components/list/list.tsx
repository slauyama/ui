import {
  Children,
  HTMLAttributes,
  isValidElement,
  PointerEvent,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Divider } from "../divider/divider";
import { ListItem } from "./listItem";

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  dividers?: boolean;
}

const STANDARD_DECELERATE = [0, 0, 0, 1] as const;

interface Highlight {
  y: number;
  height: number;
  glide: boolean;
}

/** Rows added after the first render slide in from the left; removed rows slide out to the right as their space closes. */
function ListRoot({
  children,
  dividers = false,
  className = "",
  style,
  onPointerOver,
  onPointerLeave,
  ...rest
}: ListProps) {
  const reduceMotion = useReducedMotion();
  const rows = Children.toArray(children).filter(isValidElement);
  const rootRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<Highlight | null>(null);

  function followPointer(e: PointerEvent<HTMLDivElement>) {
    onPointerOver?.(e);
    const root = rootRef.current;
    if (!root || e.pointerType === "touch") return;
    const row = (e.target as Element).closest<HTMLElement>(
      '[data-interactive="true"]:not([data-disabled="true"])',
    );
    if (!row || row.parentElement?.parentElement !== root) {
      setHighlight(null);
      return;
    }
    const r = row.getBoundingClientRect();
    const c = root.getBoundingClientRect();
    const y = r.top - c.top - root.clientTop + root.scrollTop;
    setHighlight((prev) => ({ y, height: r.height, glide: prev !== null }));
  }

  return (
    <div
      ref={rootRef}
      className={`relative flex flex-col py-2 m-0 list-none bg-transparent rounded-[inherit] [&>*>[data-interactive=true]:hover:not(:active,:focus-visible)]:before:opacity-0 ${className}`}
      role="group"
      style={style}
      onPointerOver={followPointer}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setHighlight(null);
      }}
      {...rest}
    >
      <AnimatePresence initial={false}>
        {rows.map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, height: 0, x: -20, overflow: "hidden" }}
            animate={{
              opacity: 1,
              height: "auto",
              x: 0,
              transition: {
                duration: reduceMotion ? 0 : 0.25,
                ease: STANDARD_DECELERATE,
              },
              transitionEnd: { overflow: "visible" },
            }}
            exit={{
              opacity: 0,
              height: 0,
              x: 24,
              overflow: "hidden",
              transition: {
                duration: reduceMotion ? 0 : 0.2,
                ease: STANDARD_DECELERATE,
              },
            }}
          >
            {row}
            {dividers && i < rows.length - 1 ? <Divider /> : null}
          </motion.div>
        ))}
      </AnimatePresence>
      {highlight ? (
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 top-0 bg-(--color-on-surface) opacity-(--state-hover-opacity)",
            highlight.glide
              ? "[transition:transform_var(--motion-glide),height_var(--motion-glide)] motion-reduce:transition-none"
              : "",
          ].join(" ")}
          style={{
            height: highlight.height,
            transform: `translateY(${highlight.y}px)`,
          }}
        />
      ) : null}
    </div>
  );
}

export const List = Object.assign(ListRoot, { Item: ListItem });
