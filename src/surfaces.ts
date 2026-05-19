import { hover } from "framer-motion";

export type Surface =
  | "surface"
  | "surface-hover"
  | "primary"
  | "primary-container"
  | "error";

export const ALL_SURFACES: Surface[] = [
  "surface",
  "surface-hover",
  "primary",
  "primary-container",
  "error",
];
const TEXT_COLOR: Record<Surface, string> = {
  surface: "text-(--color-on-surface)",
  "surface-hover": "ERROR",
  primary: "text-(--color-on-primary)",
  "primary-container": "text-(--color-on-primary-container)",
  error: "text-(--color-on-error)",
};

const BG_COLOR: Record<Surface, string> = {
  surface: "bg-(--color-surface)",
  "surface-hover": "bg-(--color-surface-hover)",
  primary: "bg-(--color-primary)",
  "primary-container": "bg-(--color-primary-container)",
  error: "bg-(--color-error)",
};

export function textColorBySurface(surface: Surface) {
  return TEXT_COLOR[surface];
}

export function bgColorBySurface(surface: Surface) {
  return BG_COLOR[surface];
}
