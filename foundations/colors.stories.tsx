import type { Meta } from "@storybook/react-vite";
import { guidelineStory } from "./guidelineFrame";

const meta = { title: "Colors" } satisfies Meta;
export default meta;

export const Primary = guidelineStory("colors-primary", "Primary");
export const SecondaryAndTertiary = guidelineStory(
  "colors-secondary-tertiary",
  "Secondary and tertiary",
);
export const Semantic = guidelineStory(
  "colors-semantic",
  "Error, outline, inverse",
);
export const Surfaces = guidelineStory("colors-surfaces", "Surface ladder");
export const Dark = guidelineStory("colors-dark", "Dark theme");
export const PaletteEmber = guidelineStory(
  "palette-ember",
  "Tonal palette: Ember",
);
export const PaletteNeutral = guidelineStory(
  "palette-neutral",
  "Tonal palette: Warm neutral",
);
export const PaletteTeal = guidelineStory(
  "palette-teal",
  "Tonal palette: Teal",
);
