import type { Meta } from "@storybook/react-vite";
import { guidelineStory } from "./guidelineFrame";

const meta = { title: "Spacing" } satisfies Meta;
export default meta;

export const Scale = guidelineStory("spacing-scale", "Spacing scale");
export const Insets = guidelineStory("spacing-inset", "Insets in use");
