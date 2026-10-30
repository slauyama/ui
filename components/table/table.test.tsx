import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Table } from "./table";

describe("Table", () => {
  it("renders a table with column headers", () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head align="right">Size</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>report.pdf</Table.Cell>
            <Table.Cell align="right">2 MB</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    const name = screen.getByRole("columnheader", { name: "Name" });
    expect(name).toHaveAttribute("scope", "col");
    expect(
      screen.getByRole("cell", { name: "report.pdf" }),
    ).toBeInTheDocument();
    expect(
      getComputedStyle(screen.getByRole("cell", { name: "2 MB" })).textAlign,
    ).toBe("right");
  });

  it("makes a sortable header a button and reports its direction", async () => {
    const onSort = vi.fn();
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head sortDirection="desc" onSort={onSort}>
              Name
            </Table.Head>
            <Table.Head>Size</Table.Head>
          </Table.Row>
        </Table.Header>
      </Table>,
    );
    const header = screen.getByRole("columnheader", { name: /Name/ });
    expect(header).toHaveAttribute("aria-sort", "descending");
    expect(
      screen.getByRole("columnheader", { name: "Size" }),
    ).not.toHaveAttribute("aria-sort");
    await userEvent.click(screen.getByRole("button", { name: /Name/ }));
    expect(onSort).toHaveBeenCalledTimes(1);
  });

  it("makes a clickable row focusable and activates it with Enter and Space", async () => {
    const onClick = vi.fn();
    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={onClick}>
            <Table.Cell>report.pdf</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>notes.txt</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    const [clickable, plain] = screen.getAllByRole("row");
    expect(clickable).toHaveAttribute("tabindex", "0");
    expect(plain).not.toHaveAttribute("tabindex");
    await userEvent.tab();
    expect(clickable).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("draws row dividers unless bordered is off", () => {
    const { rerender } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getComputedStyle(screen.getByRole("row")).borderBottomWidth).toBe(
      "1px",
    );
    rerender(
      <Table bordered={false}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getComputedStyle(screen.getByRole("row")).borderBottomWidth).toBe(
      "0px",
    );
  });
});
