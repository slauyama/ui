import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useArgState } from "../../.storybook/useArgState";
import { Tabs, TabDef } from "./tabs";

const tabs: TabDef[] = [
  { value: "overview", label: "Overview", icon: "dashboard" },
  { value: "details", label: "Details", icon: "info" },
  { value: "settings", label: "Settings", icon: "settings" },
];

const PANEL_TEXT: Record<string, string> = {
  overview: "Usage this month is up 12%.",
  details: "Plan: Team, renews on Dec 1.",
  settings: "Notifications are on.",
};

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
  },
  render: function Render(args) {
    const [value, setValue] = useArgState(args.value);
    return (
      <div style={{ width: 420 }}>
        <Tabs {...args} value={value} onChange={setValue}>
          {(args.tabs ?? []).map((t) => (
            <Tabs.Panel key={t.value} value={t.value} style={{ padding: 16 }}>
              {PANEL_TEXT[t.value]}
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    );
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

export const KeyboardNavigation: Story = {
  args: { tabs, value: "overview" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [overview, details, settings] = canvas.getAllByRole("tab");
    await expect(overview).toHaveAttribute("tabindex", "0");
    await expect(details).toHaveAttribute("tabindex", "-1");

    await userEvent.tab();
    await expect(overview).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(details).toHaveFocus();
    await expect(details).toHaveAttribute("aria-selected", "true");
    await expect(details).toHaveAttribute("tabindex", "0");
    await expect(overview).toHaveAttribute("tabindex", "-1");

    await userEvent.keyboard("{End}");
    await expect(settings).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(overview).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    await expect(settings).toHaveFocus();
    await userEvent.keyboard("{Home}");
    await expect(overview).toHaveAttribute("aria-selected", "true");
  },
};

export const WithPanels: Story = {
  args: { tabs, value: "overview", id: "account" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const details = canvas.getByRole("tab", { name: "Details" });
    await userEvent.click(details);
    const panel = canvas.getByRole("tabpanel", { name: "Details" });
    await expect(details).toHaveAttribute("aria-controls", panel.id);
    await expect(panel).toHaveTextContent("Plan: Team");
    await expect(canvas.getAllByRole("tabpanel")).toHaveLength(1);
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
