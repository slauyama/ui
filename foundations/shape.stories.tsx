import type { Meta } from "@storybook/react-vite";
import { guidelineStory } from "./guidelineFrame";

const meta = { title: "Shape" } satisfies Meta;
export default meta;

export const CornerScale = guidelineStory("shape-scale", "Corner scale");
export const Elevation = guidelineStory("elevation-levels", "Elevation");
