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

export function textColorBySurface(surface: Surface) {
  return TEXT_COLOR[surface];
}

const TEXT_HOVER_COLOR: Record<"surface" | "primary-container", string> = {
  surface: "hover:text-(--color-on-surface-hover)",
  "primary-container": "hover:text-(--color-on-primary-container-hover)",
};

export function textHoverColorBySurface(
  surface: "surface" | "primary-container",
) {
  return TEXT_HOVER_COLOR[surface];
}

const BG_COLOR: Record<Surface, string> = {
  surface: "bg-(--color-surface)",
  primary: "bg-(--color-primary)",
  "primary-container": "bg-(--color-primary-container)",
  secondary: "bg-(--color-secondary)",
  "secondary-container": "bg-(--color-secondary-container)",
  tertiary: "bg-(--color-tertiary)",
  "tertiary-container": "bg-(--color-tertiary-container)",
  error: "bg-(--color-error)",
};
export function bgColorBySurface(surface: Surface) {
  return BG_COLOR[surface];
}

const ACCENT_TEXT_COLOR: Record<Surface, string> = {
  surface: "text-(--color-on-surface)",
  primary: "text-(--color-primary)",
  "primary-container": "text-(--color-primary)",
  secondary: "text-(--color-secondary)",
  "secondary-container": "text-(--color-secondary)",
  tertiary: "text-(--color-tertiary)",
  "tertiary-container": "text-(--color-tertiary)",
  error: "text-(--color-error)",
};

export function accentTextColorBySurface(surface: Surface) {
  return ACCENT_TEXT_COLOR[surface];
}

const BG_HOVER_COLOR: Record<Surface, string> = {
  surface: "hover:bg-(--color-surface-hover)",
  primary: "hover:bg-(--color-primary-hover)",
  "primary-container": "hover:bg-(--color-primary-container-hover)",
  secondary: "hover:bg-(--color-secondary-hover)",
  "secondary-container": "hover:bg-(--color-secondary-container-hover)",
  tertiary: "hover:bg-(--color-tertiary-hover)",
  "tertiary-container": "hover:bg-(--color-tertiary-container-hover)",
  error: "hover:bg-(--color-error-hover)",
};

export function bgHoverColorBySurface(surface: Surface) {
  return BG_HOVER_COLOR[surface];
}

const BG_TINT_HOVER_COLOR: Record<Surface, string> = {
  surface: "hover:bg-(--color-on-surface)/10",
  primary: "hover:bg-(--color-primary)/10",
  "primary-container": "hover:bg-(--color-primary)/10",
  secondary: "hover:bg-(--color-secondary)/10",
  "secondary-container": "hover:bg-(--color-secondary)/10",
  tertiary: "hover:bg-(--color-tertiary)/10",
  "tertiary-container": "hover:bg-(--color-tertiary)/10",
  error: "hover:bg-(--color-error)/10",
};

export function bgTintHoverColorBySurface(surface: Surface) {
  return BG_TINT_HOVER_COLOR[surface];
}
