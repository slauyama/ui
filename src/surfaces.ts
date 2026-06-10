type AddSuffix<S extends string, X extends string> = `${S}${X}`;

export type Surface =
  | "surface"
  | "primary"
  | "primary-container"
  | "secondary"
  | "secondary-container"
  | "tertiary"
  | "tertiary-container"
  | "error";
export type SurfaceHover = AddSuffix<Surface, "-hover">;

export const ALL_SURFACES: Array<Surface> = [
  "surface",
  "primary",
  "primary-container",
  "secondary",
  "secondary-container",
  "tertiary",
  "tertiary-container",
  "error",
];

const TEXT_COLOR: Record<Surface, string> = {
  surface: "text-(--color-on-surface)",
  primary: "text-(--color-on-primary)",
  "primary-container": "text-(--color-on-primary-container)",
  secondary: "text-(--color-on-secondary)",
  "secondary-container": "text-(--color-on-secondary-container)",
  tertiary: "text-(--color-on-tertiary)",
  "tertiary-container": "text-(--color-on-tertiary-container)",
  error: "text-(--color-on-error)",
};
const TEXT_HOVER_COLOR: Record<"surface" | "primary-container", string> = {
  surface: "text-(--color-on-surface-hover)",
  "primary-container": "text-(--color-on-primary-container-hover)",
};

const BG_COLOR: Record<Surface, string> = {
  surface: "bg-(--color-surface-hover)",
  primary: "bg-(--color-primary)",
  "primary-container": "bg-(--color-primary-container)",
  secondary: "bg-(--color-secondary)",
  "secondary-container": "bg-(--color-secondary-container)",
  tertiary: "bg-(--color-tertiary)",
  "tertiary-container": "bg-(--color-tertiary-container)",
  error: "bg-(--color-error)",
};
const BG_HOVER_COLOR: Record<Surface, string> = {
  surface: "bg-(--color-surface-hover)",
  primary: "bg-(--color-primary-hover)",
  "primary-container": "bg-(--color-primary-container-hover)",
  secondary: "bg-(--color-secondary-hover)",
  "secondary-container": "bg-(--color-secondary-container-hover)",
  tertiary: "bg-(--color-tertiary-hover)",
  "tertiary-container": "bg-(--color-tertiary-container-hover)",
  error: "bg-(--color-error-hover)",
};

export function textColorBySurface(surface: Surface) {
  return TEXT_COLOR[surface];
}

export function textHoverColorBySurface(
  surface: "surface" | "primary-container",
) {
  return `hover:${TEXT_HOVER_COLOR[surface]}`;
}

export function bgColorBySurface(surface: Surface) {
  return BG_COLOR[surface];
}

export function bgHoverColorBySurface(surface: Surface) {
  return `hover:${BG_HOVER_COLOR[surface]}`;
}
