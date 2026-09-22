import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Table, TableProps } from "./table";
import { Card } from "../card/card";

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

export const ClickableRows: Story = {
  render: () => (
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
          <Table.Row key={row.name} onClick={() => alert(row.name)}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell align="right">{row.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
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

export const SortableHeader: Story = {
  render: () => <SortableDemo />,
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
