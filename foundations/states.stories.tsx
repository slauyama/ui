import type { Meta } from "@storybook/react-vite";
import { guidelineStory } from "./guidelineFrame";

const meta = { title: "States" } satisfies Meta;
export default meta;

export const Layers = guidelineStory("state-layers", "State layers");
export const FocusAndDisabled = guidelineStory(
  "state-focus",
  "Focus and disabled",
);
