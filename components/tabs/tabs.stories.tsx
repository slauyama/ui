import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useArgState } from "../../.storybook/useArgState";
import { Tabs, TabDef } from "./tabs";

const tabs: TabDef[] = [
  { value: "overview", label: "Overview", icon: "dashboard" },
  { value: "details", label: "Details", icon: "info" },
  { value: "settings", label: "Settings", icon: "settings" },
];

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
  },
  render: function Render(args) {
    const [value, setValue] = useArgState(args.value);
    return <Tabs {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: { tabs, value: "overview", variant: "primary" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("tablist")).toBeInTheDocument();
    const overview = canvas.getByRole("tab", { name: "Overview" });
    const details = canvas.getByRole("tab", { name: "Details" });
    await expect(overview).toHaveAttribute("aria-selected", "true");

    await userEvent.click(details);
    await expect(details).toHaveAttribute("aria-selected", "true");
    await expect(overview).toHaveAttribute("aria-selected", "false");
    await expect(canvas.getAllByRole("tab", { selected: true })).toHaveLength(
      1,
    );
  },
};

export const Secondary: Story = {
  args: { tabs, value: "overview", variant: "secondary" },
};

export const NoIcons: Story = {
  args: {
    tabs: tabs.map((t) => ({ ...t, icon: undefined })),
    value: "overview",
  },
};
