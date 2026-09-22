import type { Meta } from "@storybook/react-vite";
import { guidelineStory } from "./guidelineFrame";

const meta = { title: "Motion" } satisfies Meta;
export default meta;

export const Durations = guidelineStory("motion-durations", "Durations");
export const Easing = guidelineStory("motion-easing", "Easing");
