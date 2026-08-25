import {
  ChangeEvent,
  FocusEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseFloatingLabelOptions<T extends HTMLElement> {
  label: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<T>) => void;
  onFocus?: (e: FocusEvent<T>) => void;
  onBlur?: (e: FocusEvent<T>) => void;
  anchorRef?: RefObject<HTMLElement | null>;
  // Extra values that should trigger remeasuring the anchor (e.g. the
  // prefix's own text, since its rendered width can change independently
  // of the label).
  remeasureDeps?: unknown[];
  forceFloated?: boolean;
}

// The math behind border notch and floating label, shared by Input and Textarea.
// The notch is drawn natively via <fieldset>/<legend> — this hook only owns the
// state/measurements driving it: whether the label is floated, and the pixel
// positions the notch and label need to be.
export function useFloatingLabel<
  T extends HTMLInputElement | HTMLTextAreaElement,
>({
  label,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  anchorRef,
  remeasureDeps = [],
  forceFloated = false,
}: UseFloatingLabelOptions<T>) {
  const isControlled = value !== undefined;
  const [isFocused, setIsFocused] = useState(false);
  const [uncontrolledHasValue, setUncontrolledHasValue] =
    useState(!!defaultValue);
  const hasValue = isControlled ? !!value : uncontrolledHasValue;
  const floated = forceFloated || isFocused || hasValue;

  const rootRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const notchTextRef = useRef<HTMLSpanElement>(null);
  const [notchWidth, setNotchWidth] = useState(0);
  const [floatedLeft, setFloatedLeft] = useState(0);
  const [idleLeft, setIdleLeft] = useState(0);

  useEffect(() => {
    if (measureRef.current) {
      setNotchWidth(measureRef.current.offsetWidth);
    }
  }, [label]);

  useEffect(() => {
    if (!rootRef.current || !notchTextRef.current) return;
    const rootLeft = rootRef.current.getBoundingClientRect().left;
    const notchLeft =
      notchTextRef.current.getBoundingClientRect().left - rootLeft;
    setFloatedLeft(notchLeft);
    setIdleLeft(
      anchorRef?.current
        ? anchorRef.current.getBoundingClientRect().right - rootLeft + 4
        : notchLeft,
    );
  }, [label, notchWidth, ...remeasureDeps]);

  function handleChange(e: ChangeEvent<T>) {
    if (!isControlled) setUncontrolledHasValue(e.target.value.length > 0);
    onChange?.(e);
  }
  function handleFocus(e: FocusEvent<T>) {
    setIsFocused(true);
    onFocus?.(e);
  }
  function handleBlur(e: FocusEvent<T>) {
    setIsFocused(false);
    onBlur?.(e);
  }

  return {
    isFocused,
    floated,
    rootRef,
    measureRef,
    notchTextRef,
    notchWidth,
    floatedLeft,
    idleLeft,
    handleChange,
    handleFocus,
    handleBlur,
  };
}
