export type Surface = "surface" | "primary" | "primary-container";

export function textColorBySurface(surface: Surface) {
  return `text-(--color-on-${surface})`;
}

export function bgColorBySurface(surface: Surface) {
  return `bg-(--color-on-${surface})`;
}
