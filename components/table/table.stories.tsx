import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Table, TableProps } from "./table";
import { Card } from "../card/card";
import { Text } from "../text/text";

const meta: Meta<typeof Table> = {
  component: Table,
  argTypes: {
    bordered: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

type Person = { name: string; role: string; status: string };

const ROWS: Person[] = [
  { name: "Ada Lovelace", role: "Engineer", status: "Active" },
  { name: "Grace Hopper", role: "Engineer", status: "Active" },
  { name: "Alan Turing", role: "Researcher", status: "Invited" },
];

function renderPeople(args: TableProps) {
  return (
    <Table {...args}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Role</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ROWS.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export const Default: Story = {
  render: renderPeople,
};

function ClickableRowsDemo() {
  const [clicked, setClicked] = useState<string>();
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head align="right">Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ROWS.map((row) => (
            <Table.Row key={row.name} onClick={() => setClicked(row.name)}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell align="right">{row.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Text as="p" variant="body-medium" style={{ marginTop: 16 }}>
        Last clicked: {clicked ?? "none"}
      </Text>
    </>
  );
}

export const ClickableRows: Story = {
  render: () => <ClickableRowsDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("cell", { name: "Grace Hopper" }));
    await expect(
      canvas.getByText("Last clicked: Grace Hopper"),
    ).toBeInTheDocument();

    const rows = canvas.getAllByRole("row").slice(1);
    rows[0].focus();
    await userEvent.tab();
    await expect(rows[1]).toHaveFocus();
    await userEvent.tab();
    await expect(rows[2]).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(
      canvas.getByText("Last clicked: Alan Turing"),
    ).toBeInTheDocument();
    await userEvent.tab({ shift: true });
    await userEvent.keyboard(" ");
    await expect(
      canvas.getByText("Last clicked: Grace Hopper"),
    ).toBeInTheDocument();
  },
};

export const NoRowBorders: Story = {
  args: { bordered: false },
  render: renderPeople,
};

type SortField = keyof Person;

function SortableDemo() {
  const [field, setField] = useState<SortField>("name");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  function toggleSort(next: SortField) {
    if (next === field) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setField(next);
      setDirection("asc");
    }
  }

  const sorted = [...ROWS].sort((a, b) => a[field].localeCompare(b[field]));
  if (direction === "desc") sorted.reverse();

  function sortProps(f: SortField) {
    return {
      onSort: () => toggleSort(f),
      sortDirection: field === f ? direction : undefined,
    };
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head {...sortProps("name")}>Name</Table.Head>
          <Table.Head {...sortProps("role")}>Role</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sorted.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function firstColumn(canvasElement: HTMLElement) {
  return within(canvasElement)
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0].textContent);
}

export const SortableHeader: Story = {
  render: () => <SortableDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameHead = canvas.getByRole("columnheader", { name: "Name" });
    const roleHead = canvas.getByRole("columnheader", { name: "Role" });
    await expect(nameHead).toHaveAttribute("aria-sort", "ascending");
    await expect(roleHead).not.toHaveAttribute("aria-sort");
    await expect(firstColumn(canvasElement)).toEqual([
      "Ada Lovelace",
      "Alan Turing",
      "Grace Hopper",
    ]);

    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    await expect(nameHead).toHaveAttribute("aria-sort", "descending");
    await expect(firstColumn(canvasElement)).toEqual([
      "Grace Hopper",
      "Alan Turing",
      "Ada Lovelace",
    ]);

    await userEvent.click(canvas.getByRole("button", { name: "Role" }));
    await expect(roleHead).toHaveAttribute("aria-sort", "ascending");
    await expect(nameHead).not.toHaveAttribute("aria-sort");
  },
};

export const InCard: Story = {
  render: () => (
    <Card variant="outlined" style={{ width: 480 }}>
      {renderPeople({})}
    </Card>
  ),
};

export const OnPrimaryContainer: Story = {
  render: () => (
    <div
      style={{
        background: "var(--color-primary-container)",
        color: "var(--color-on-primary-container)",
        padding: 8,
      }}
    >
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head color="inherit">Name</Table.Head>
            <Table.Head color="inherit">Role</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ROWS.map((row) => (
            <Table.Row key={row.name}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};
