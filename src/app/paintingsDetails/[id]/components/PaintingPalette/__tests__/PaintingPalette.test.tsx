import { render, screen, fireEvent } from "@testing-library/react";
import { PaintingPalette } from "../PaintingPalette";

jest.mock("copy-to-clipboard", () => jest.fn());
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../components/PaintingPalette/ColorSwatch", () => ({
  ColorSwatch: ({ color, onCopy }: any) => (
    <button
      data-testid={`swatch-${color}`}
      onClick={() => onCopy(color)}
    >
      {color}
    </button>
  ),
}));

describe("PaintingPalette", () => {
  const colors = ["#FF0000", "#00FF00", "#0000FF"];
  const mockCopy = require("copy-to-clipboard");
  const mockToast = require("sonner").toast;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all color swatches correctly", () => {
    render(<PaintingPalette colors={colors} />);
    expect(screen.getByText("Paleta de cores")).toBeInTheDocument();

    colors.forEach((color) => {
      expect(screen.getByTestId(`swatch-${color}`)).toBeInTheDocument();
    });
  });

  it("calls toast.success when color is copied successfully", () => {
    mockCopy.mockReturnValue(true);
    render(<PaintingPalette colors={colors} />);

    const firstSwatch = screen.getByTestId("swatch-#FF0000");
    fireEvent.click(firstSwatch);

    expect(mockCopy).toHaveBeenCalledWith("#FF0000");
    expect(mockToast.success).toHaveBeenCalledWith(
      "Cor #FF0000 copiada com sucesso!"
    );
  });

  it("calls toast.error when copy fails", () => {
    mockCopy.mockReturnValue(false);
    render(<PaintingPalette colors={colors} />);

    const secondSwatch = screen.getByTestId("swatch-#00FF00");
    fireEvent.click(secondSwatch);

    expect(mockToast.error).toHaveBeenCalledWith("Falha ao copiar a cor.");
  });

  it("renders correct aria-label and structure", () => {
    render(<PaintingPalette colors={colors} />);

    const section = screen.getByRole("region", { hidden: true });
    const heading = screen.getByRole("heading", { name: /paleta de cores/i });

    expect(section).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
