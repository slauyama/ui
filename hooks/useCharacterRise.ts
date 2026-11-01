import {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Tracks which characters of a field's value should rise in. Only characters
 * typed at the end of the value animate; any other edit renders instantly.
 * Characters before `settled` render as one run of text, so once every
 * animation ends the mirror is shaped exactly like the input underneath it.
 */
export function useCharacterRise(value: string, enabled: boolean) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = enabled && !reduceMotion;
  const [settled, setSettled] = useState(value.length);
  const appended = useRef(false);
  const previous = useRef(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);

  const syncScroll = useCallback(() => {
    if (inputRef.current && mirrorRef.current) {
      mirrorRef.current.style.transform = `translateX(${-inputRef.current.scrollLeft}px)`;
    }
  }, []);

  useLayoutEffect(() => {
    if (appended.current) {
      setSettled((s) => Math.min(s, previous.current.length));
    } else {
      setSettled(value.length);
    }
    appended.current = false;
    previous.current = value;
    syncScroll();
  }, [value, syncScroll]);

  function noteChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const next = e.target.value;
    appended.current =
      next.length > previous.current.length &&
      next.startsWith(previous.current) &&
      e.target.selectionEnd === next.length;
  }

  function settle(index: number) {
    setSettled((s) => Math.max(s, index + 1));
  }

  return {
    active,
    settledText: value.slice(0, settled),
    rising: Array.from(value.slice(settled), (char, i) => ({
      char,
      index: settled + i,
    })),
    noteChange,
    settle,
    inputRef,
    mirrorRef,
    syncScroll,
  };
}
