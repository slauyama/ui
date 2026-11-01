import {
  Children,
  Fragment,
  HTMLAttributes,
  PointerEvent,
  useRef,
  useState,
} from "react";
import { Divider } from "../divider/divider";
import { ListItem } from "./listItem";

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  dividers?: boolean;
}

interface Highlight {
  y: number;
  height: number;
  glide: boolean;
}

function ListRoot({
  children,
  dividers = false,
  className = "",
  style,
  onPointerOver,
  onPointerLeave,
  ...rest
}: ListProps) {
  const items = dividers ? Children.toArray(children) : null;
  const rootRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<Highlight | null>(null);

  function followPointer(e: PointerEvent<HTMLDivElement>) {
    onPointerOver?.(e);
    const root = rootRef.current;
    if (!root || e.pointerType === "touch") return;
    const row = (e.target as Element).closest<HTMLElement>(
      '[data-interactive="true"]:not([data-disabled="true"])',
    );
    if (!row || row.parentElement !== root) {
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
      className={`relative flex flex-col py-2 m-0 list-none bg-transparent rounded-[inherit] [&>[data-interactive=true]:hover:not(:active,:focus-visible)]:before:opacity-0 ${className}`}
      role="group"
      style={style}
      onPointerOver={followPointer}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setHighlight(null);
      }}
      {...rest}
    >
      {items
        ? items.map((child, i) => (
            <Fragment key={i}>
              {child}
              {i < items.length - 1 ? <Divider /> : null}
            </Fragment>
          ))
        : children}
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
