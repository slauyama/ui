import type { Meta } from "@storybook/react-vite";
import { guidelineStory } from "./guidelineFrame";

const meta = { title: "Type" } satisfies Meta;
export default meta;

export const Typefaces = guidelineStory("type-faces", "Typefaces");
export const Display = guidelineStory("type-display", "Display");
export const Headline = guidelineStory("type-headline", "Headline");
export const TitleAndLabel = guidelineStory(
  "type-title-label",
  "Title and label",
);
export const BodyAndCode = guidelineStory("type-body-code", "Body and code");
