import { CSSProperties, useLayoutEffect, useRef, useState } from "react";

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

const SLIDE_CLASSES =
  "transition-[transform,width,height] duration-(--motion-duration-medium4) ease-(--motion-easing-emphasized) motion-reduce:transition-none";

function sameBox(a: Box | null, b: Box | null) {
  if (!a || !b) return a === b;
  return (
    a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
  );
}

/**
 * Tracks the element marked `data-indicator-target` inside the returned ref's
 * container, so a single absolutely-positioned indicator can glide between
 * selections. The container must be `position: relative`.
 */
export function useSelectionIndicator<T extends HTMLElement>(
  selected: string | undefined,
) {
  const containerRef = useRef<T>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [animate, setAnimate] = useState(false);
  const prevSelected = useRef(selected);
  const prevBox = useRef<Box | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function measure(): Box | null {
      const target = container!.querySelector<HTMLElement>(
        "[data-indicator-target]",
      );
      if (!target) return null;
      const c = container!.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      return {
        x: t.left - c.left - container!.clientLeft + container!.scrollLeft,
        y: t.top - c.top - container!.clientTop + container!.scrollTop,
        width: t.width,
        height: t.height,
      };
    }

    function update(slide: boolean) {
      const next = measure();
      if (sameBox(next, prevBox.current)) return;
      setAnimate(slide && prevBox.current !== null && next !== null);
      prevBox.current = next;
      setBox(next);
    }

    // Only a selection change slides; first paint and resizes snap.
    update(prevSelected.current !== selected);
    prevSelected.current = selected;

    const observer = new ResizeObserver(() => update(false));
    observer.observe(container);
    for (const child of container.children) observer.observe(child);
    const target = container.querySelector("[data-indicator-target]");
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [selected]);

  const style: CSSProperties | undefined = box
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: box.width,
        height: box.height,
        transform: `translate(${box.x}px, ${box.y}px)`,
        pointerEvents: "none",
      }
    : undefined;

  return {
    containerRef,
    indicatorStyle: style,
    indicatorClassName: animate ? SLIDE_CLASSES : "",
  };
}
