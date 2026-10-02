import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgState } from "../../.storybook/useArgState";
import { SearchBar } from "./searchBar";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  args: { value: "", style: { width: 360 } },
  render: function Render(args) {
    const [value, setValue] = useArgState(args.value);
    const [submitted, setSubmitted] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SearchBar
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSubmit={setSubmitted}
        />
        {submitted ? (
          <Text as="span" variant="body-small">
            Submitted: {submitted}
          </Text>
        ) : null}
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};

export const WithTrailingIcon: Story = {
  args: { trailing: <Icon name="mic" /> },
};

export const WithAvatar: Story = {
  args: { avatar: "https://i.pravatar.cc/60" },
};
