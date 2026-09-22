import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchBar } from "./searchBar";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: { style: { width: 360 } },
};

export const WithTrailingIcon: Story = {
  args: {
    style: { width: 360 },
    trailing: <Icon name="mic" />,
  },
};

export const WithAvatar: Story = {
  args: {
    style: { width: 360 },
    avatar: "https://i.pravatar.cc/60",
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [submitted, setSubmitted] = useState("");
    return (
      <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 8 }}>
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSubmit={setSubmitted}
          trailing={<Icon name="mic" />}
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
