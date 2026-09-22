import { HTMLAttributes } from "react";

/**
 * Material Symbols Rounded glyph, sized and filled via the font's variable axes.
 */
export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Ligature name, e.g. "search", "bolt", "chevron_right". */
  name: string;
  size?: number;
  filled?: boolean;
  weight?: number;
  /** Overrides the inherited colour. */
  color?: string;
}

/** Material Symbols Rounded glyph. Name = the ligature from fonts.google.com/icons. */
export function Icon({
  name,
  size = 24,
  filled = false,
  weight = 400,
  color,
  className = "",
  style,
  ...rest
}: IconProps) {
  return (
    <span
      className={`inline-block align-middle font-['Material_Symbols_Rounded'] font-normal not-italic leading-none tracking-normal whitespace-nowrap normal-case antialiased select-none [direction:ltr] font-features-['liga'] [word-wrap:normal] ${className}`}
      data-filled={filled ? "true" : "false"}
      aria-hidden="true"
      style={{
        fontSize: size,
        color,
        fontVariationSettings: `"FILL" ${filled ? 1 : 0}, "wght" ${weight}, "GRAD" 0, "opsz" ${size}`,
        ...style,
      }}
      {...rest}
    >
      {name}
    </span>
  );
}
