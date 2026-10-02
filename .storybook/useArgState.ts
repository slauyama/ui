import { useState } from "react";

/** Story-local state seeded from an arg, reset whenever Controls change it. */
export function useArgState<T>(arg: T): [T, (next: T) => void] {
  const [value, setValue] = useState(arg);
  const [prevArg, setPrevArg] = useState(arg);
  if (arg !== prevArg) {
    setPrevArg(arg);
    setValue(arg);
  }
  return [value, setValue];
}
