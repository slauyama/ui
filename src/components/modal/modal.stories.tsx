import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal } from "./modal";
import { Button } from "../button/button";

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const controls = { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
    return (
      <>
        <Button onClick={controls.open}>Open modal</Button>
        <Modal title="Modal title" subtitle="Optional subtitle" modalControls={controls}>
          <div className="px-6 py-4">
            <p className="text-sm text-zinc-600">Modal content goes here.</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutSubtitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const controls = { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
    return (
      <>
        <Button onClick={controls.open}>Open modal</Button>
        <Modal title="Confirm action" modalControls={controls}>
          <div className="px-6 py-4">
            <p className="text-sm text-zinc-600">Are you sure you want to continue?</p>
          </div>
        </Modal>
      </>
    );
  },
};
