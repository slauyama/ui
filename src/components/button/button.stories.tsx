import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { ALL_SURFACES } from "../../surfaces";
import { PlusSvg } from "../svgIcons/plus";
import { RightArrowSvg } from "../svgIcons/rightArrow";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "tonal", "elevated", "outlined", "text"],
    },
    color: { control: "select", options: ["default", "destructive"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllSurfaces: Story = {
  render: () => (
    <div className="flex flex-row flex-wrap gap-2">
      {ALL_SURFACES.map((surface) => (
        <Button key={surface} surface={surface}>
          {surface} Button
        </Button>
      ))}
    </div>
  ),
};

export const Filled: Story = {
  args: { variant: "filled", children: "Button" },
};

export const Tonal: Story = {
  args: { variant: "tonal", children: "Button" },
};

export const Elevated: Story = {
  args: { variant: "elevated", children: "Button" },
};

export const Outlined: Story = {
  args: { variant: "outlined", children: "Button" },
};

export const Text: Story = {
  args: { variant: "text", children: "Button" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <Button variant="filled">Filled</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <Button variant="filled" surface="error">
        Delete
      </Button>
      <Button variant="tonal" surface="error">
        Delete
      </Button>
      <Button variant="elevated" surface="error">
        Delete
      </Button>
      <Button variant="outlined" surface="error">
        Delete
      </Button>
      <Button variant="text" surface="error">
        Delete
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: "filled", children: "Button", disabled: true },
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <Button variant="filled" isLoading>
        Saving
      </Button>
      <Button variant="outlined" isLoading>
        Saving
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <Button leadingIcon={<PlusSvg />}>New item</Button>
      <Button variant="outlined" trailingIcon={<RightArrowSvg />}>
        Continue
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">XS Button</Button>
      <Button size="sm">SM Button</Button>
      <Button size="md">MD Button</Button>
      <Button size="lg">LG Button</Button>
    </div>
  ),
};
