import { useEffect, useRef, useState } from "react";
import type { StoryObj } from "@storybook/react-vite";

interface GuidelineFrameProps {
  /** File name in guidelines/, without ".html". */
  page: string;
  title: string;
}

/**
 * Shows one guidelines/*.html page in an isolated iframe. The pages are Facet's own markup, so
 * they run in their own document; this copies Storybook's color scheme into it and grows the
 * frame to fit the page.
 */
export function GuidelineFrame({ page, title }: GuidelineFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const detachRef = useRef<() => void>(undefined);
  const [height, setHeight] = useState(160);

  useEffect(() => () => detachRef.current?.(), []);

  function attach() {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    detachRef.current?.();

    // TS can't carry the `if (!doc) return` narrowing into these nested function declarations
    // (their bodies might run after doc could theoretically change), so `docEl` is captured
    // once, already non-null, instead of re-reading `doc.documentElement` inside each closure.
    const docEl = doc.documentElement;
    const host = document.documentElement;
    function syncTheme() {
      const theme = host.dataset.theme ?? "light";
      docEl.dataset.theme = theme;
      docEl.style.colorScheme = theme;
    }
    // getBoundingClientRect rather than scrollHeight, which never reports less than the frame.
    function syncHeight() {
      setHeight(Math.ceil(docEl.getBoundingClientRect().height));
    }
    syncTheme();
    syncHeight();

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(host, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const sizeObserver = new ResizeObserver(syncHeight);
    sizeObserver.observe(docEl);
    detachRef.current = () => {
      themeObserver.disconnect();
      sizeObserver.disconnect();
    };
  }

  return (
    <iframe
      ref={frameRef}
      // Relative, so it resolves next to iframe.html wherever the build is hosted.
      src={`guidelines/${page}.html`}
      title={title}
      onLoad={attach}
      className="block w-full border-0"
      style={{ height }}
    />
  );
}

/** One story per guideline page. The pages are reference art, so axe is not run on them. */
export function guidelineStory(page: string, title: string): StoryObj {
  return {
    name: title,
    parameters: { a11y: { disable: true } },
    render: () => <GuidelineFrame page={page} title={title} />,
  };
}
