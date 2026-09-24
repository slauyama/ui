import { ChangeEvent, FocusEvent, useState } from "react";

interface UseFloatingLabelOptions<T extends HTMLElement> {
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<T>) => void;
  onFocus?: (e: FocusEvent<T>) => void;
  onBlur?: (e: FocusEvent<T>) => void;
  /** Keeps the label floated regardless of focus/value, e.g. when there's no label to shrink from. */
  forceFloated?: boolean;
}

/**
 * Derives whether a field's label should float (shrink, move above the box)
 * from focus and value state, and wraps the change/focus/blur handlers that
 * drive it. TextField uses this; Select derives its own `floated` from
 * selection state instead, since it has no typed value.
 */
export function useFloatingLabel<
  T extends HTMLInputElement | HTMLTextAreaElement,
>({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  forceFloated = false,
}: UseFloatingLabelOptions<T>) {
  const isControlled = value !== undefined;
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;
  const floated = forceFloated || focused || currentValue.length > 0;

  function handleChange(e: ChangeEvent<T>) {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  }
  function handleFocus(e: FocusEvent<T>) {
    setFocused(true);
    onFocus?.(e);
  }
  function handleBlur(e: FocusEvent<T>) {
    setFocused(false);
    onBlur?.(e);
  }

  return {
    focused,
    floated,
    value: currentValue,
    handleChange,
    handleFocus,
    handleBlur,
  };
}
