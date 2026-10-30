import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DescriptionList } from "./descriptionList";

describe("DescriptionList", () => {
  it("pairs each term with its description", () => {
    render(
      <DescriptionList>
        <DescriptionList.Item term="Status">Active</DescriptionList.Item>
        <DescriptionList.Item term="Owner">Ada</DescriptionList.Item>
      </DescriptionList>,
    );
    const terms = screen.getAllByRole("term");
    const definitions = screen.getAllByRole("definition");
    expect(terms.map((t) => t.textContent)).toEqual(["Status", "Owner"]);
    expect(definitions.map((d) => d.textContent)).toEqual(["Active", "Ada"]);
  });

  it("lays items out in the requested number of columns", () => {
    const { container } = render(
      <DescriptionList columns={2}>
        <DescriptionList.Item term="Status">Active</DescriptionList.Item>
      </DescriptionList>,
    );
    const list = container.querySelector("dl")!;
    expect(list).toHaveAttribute("data-columns", "2");
    expect(getComputedStyle(list).gridTemplateColumns.split(" ")).toHaveLength(
      2,
    );
  });

  it("draws dividers between items but not after the last", () => {
    const { container } = render(
      <DescriptionList dividers>
        <DescriptionList.Item term="Status">Active</DescriptionList.Item>
        <DescriptionList.Item term="Owner">Ada</DescriptionList.Item>
      </DescriptionList>,
    );
    const [first, last] = Array.from(container.querySelectorAll("dl > div"));
    expect(getComputedStyle(first).borderBottomWidth).toBe("1px");
    expect(getComputedStyle(last).borderBottomWidth).toBe("0px");
  });
});
