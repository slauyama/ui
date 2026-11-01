import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { LinkPreview } from "./linkPreview";
import { Text } from "../text/text";

const THUMBNAIL =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6750a4"/><stop offset="1" stop-color="#7d5260"/></linearGradient></defs><rect width="320" height="180" fill="url(#g)"/><circle cx="240" cy="60" r="36" fill="#ffd8e4" fill-opacity=".7"/><path d="M0 150 L90 90 L160 135 L230 80 L320 140 V180 H0Z" fill="#21005d" fill-opacity=".55"/></svg>`,
  );

const meta: Meta<typeof LinkPreview> = {
  component: LinkPreview,
  argTypes: {
    placement: { control: "select", options: ["top", "bottom"] },
  },
  args: {
    href: "#material-3",
    title: "Material Design 3",
    description:
      "Google's open-source design system, with guidelines, components and tools for building beautiful, usable products.",
    image: THUMBNAIL,
  },
};

export default meta;
type Story = StoryObj<typeof LinkPreview>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "300px 48px 48px", maxWidth: 480 }}>
      <Text>
        This library follows <LinkPreview {...args}>Material 3</LinkPreview>{" "}
        for its tokens and motion.
      </Text>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Material 3" });
    await expect(link).toHaveAccessibleDescription(
      /Material Design 3 Google's open-source design system/,
    );

    await userEvent.hover(link);
    await waitFor(() =>
      expect(canvas.getByRole("tooltip")).toHaveTextContent(
        "Material Design 3",
      ),
    );

    await userEvent.unhover(link);
    await waitFor(() =>
      expect(canvas.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  },
};

export const KeyboardAndEscape: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "Material 3" })).toHaveFocus();
    await waitFor(() => expect(canvas.getByRole("tooltip")).toBeVisible());

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(canvas.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  },
};

export const Bottom: Story = {
  args: { placement: "bottom" },
  render: (args) => (
    <div style={{ padding: "48px 48px 300px", maxWidth: 480 }}>
      <Text>
        Read the <LinkPreview {...args}>Material 3 guidelines</LinkPreview>{" "}
        first.
      </Text>
    </div>
  ),
};

export const TextOnly: Story = {
  args: { image: undefined },
  render: Default.render,
};
