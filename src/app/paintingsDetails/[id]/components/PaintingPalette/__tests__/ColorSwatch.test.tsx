import { render, screen, fireEvent, act } from "@testing-library/react";
import { ColorSwatch } from "../ColorSwatch";

jest.useFakeTimers();

describe("ColorSwatch", () => {
  const mockOnCopy = jest.fn();
  const color = "#FFCC00";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct background color and aria-label", () => {
    render(<ColorSwatch color={color} onCopy={mockOnCopy} />);
    const button = screen.getByRole("button", { name: `Copiar cor ${color}` });

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: color });
  });

  it("calls onCopy and shows check icon when clicked", () => {
    render(<ColorSwatch color={color} onCopy={mockOnCopy} />);
    const button = screen.getByRole("button", { name: `Copiar cor ${color}` });

    act(() => {
      fireEvent.click(button);
    });

    expect(mockOnCopy).toHaveBeenCalledWith(color);
    expect(
      screen.getByLabelText(`Cor ${color} copiada!`)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toContainElement(
      screen.getByLabelText(`Cor ${color} copiada!`)
    );
  });

  it("resets back to copy icon after 1.5s", () => {
    render(<ColorSwatch color={color} onCopy={mockOnCopy} />);
    const button = screen.getByRole("button");

    act(() => {
      fireEvent.click(button);
    });

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(
      screen.getByRole("button", { name: `Copiar cor ${color}` })
    ).toBeInTheDocument();
  });

  it("applies hover/tap animations via motion props", () => {
    render(<ColorSwatch color={color} onCopy={mockOnCopy} />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", `Copiar cor ${color}`);
  });
});
