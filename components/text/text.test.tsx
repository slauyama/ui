import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./text";

describe("Text", () => {
  it("defaults to a paragraph without margins", () => {
    render(<Text>Hello</Text>);
    const text = screen.getByText("Hello");
    expect(text.tagName).toBe("P");
    expect(getComputedStyle(text).marginTop).toBe("0px");
  });

  it("renders as the requested element", () => {
    render(<Text as="span">Hello</Text>);
    expect(screen.getByText("Hello").tagName).toBe("SPAN");
  });

  it("uses the typescale size for its variant", () => {
    render(
      <>
        <Text variant="body-large">Large</Text>
        <Text variant="label-small">Small</Text>
      </>,
    );
    const large = parseFloat(
      getComputedStyle(screen.getByText("Large")).fontSize,
    );
    const small = parseFloat(
      getComputedStyle(screen.getByText("Small")).fontSize,
    );
    expect(large).toBeGreaterThan(small);
  });

  it("aligns and colours its text", () => {
    render(
      <Text align="center" color="rgb(0, 0, 255)">
        Hello
      </Text>,
    );
    const style = getComputedStyle(screen.getByText("Hello"));
    expect(style.textAlign).toBe("center");
    expect(style.color).toBe("rgb(0, 0, 255)");
  });
});
