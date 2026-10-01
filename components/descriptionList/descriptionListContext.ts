import { createContext } from "react";

export const DescriptionListContext = createContext<{
  columns: 1 | 2;
  dividers: boolean;
}>({ columns: 1, dividers: false });
