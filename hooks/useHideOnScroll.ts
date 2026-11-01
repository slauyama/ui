import { RefObject, useEffect, useState } from "react";

/** True while the window is scrolling down past the element's own height. */
export function useHideOnScroll(ref: RefObject<HTMLElement | null>) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (y <= (ref.current?.offsetHeight ?? 0) || y < lastY) setHidden(false);
      else if (y > lastY) setHidden(true);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return hidden;
}
