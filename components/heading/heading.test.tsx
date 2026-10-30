import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./heading";

describe("Heading", () => {
  it("defaults to an h2", () => {
    render(<Heading>Settings</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Settings",
    );
  });

  it("renders the requested level independently of its variant", () => {
    render(
      <Heading as="h1" variant="title-small">
        Settings
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("uses the typescale size for its variant", () => {
    render(
      <>
        <Heading variant="display-large">Big</Heading>
        <Heading variant="title-small">Small</Heading>
      </>,
    );
    const big = parseFloat(getComputedStyle(screen.getByText("Big")).fontSize);
    const small = parseFloat(
      getComputedStyle(screen.getByText("Small")).fontSize,
    );
    expect(big).toBeGreaterThan(small);
  });

  it("applies a custom color", () => {
    render(<Heading color="rgb(255, 0, 0)">Settings</Heading>);
    expect(getComputedStyle(screen.getByRole("heading")).color).toBe(
      "rgb(255, 0, 0)",
    );
  });
});
