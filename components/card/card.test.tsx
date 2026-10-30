import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Card } from "./card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Quarterly report</Card>);
    expect(screen.getByText("Quarterly report")).toBeInTheDocument();
  });

  it("defaults to elevated and not interactive", () => {
    render(<Card data-testid="card">Body</Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("data-variant", "elevated");
    expect(card).toHaveAttribute("data-interactive", "false");
  });

  it.each(["elevated", "filled", "outlined"] as const)(
    "applies the %s variant",
    (variant) => {
      render(
        <Card variant={variant} data-testid="card">
          Body
        </Card>,
      );
      expect(screen.getByTestId("card")).toHaveAttribute(
        "data-variant",
        variant,
      );
    },
  );

  it("draws a border only when outlined", () => {
    render(
      <>
        <Card variant="outlined" data-testid="outlined">
          A
        </Card>
        <Card variant="filled" data-testid="filled">
          B
        </Card>
      </>,
    );
    expect(
      getComputedStyle(screen.getByTestId("outlined")).borderTopWidth,
    ).toBe("1px");
    expect(getComputedStyle(screen.getByTestId("filled")).borderTopWidth).toBe(
      "0px",
    );
  });

  it("passes clicks through when interactive", async () => {
    const onClick = vi.fn();
    render(
      <Card interactive onClick={onClick} data-testid="card">
        Body
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("data-interactive", "true");
    await userEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
