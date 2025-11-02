import { render, screen } from "@testing-library/react";
import { PaintingDetails } from "../PaintingDetails";
import { Painting } from "@/types/types";

const mockPaintingPalette = jest.fn();

jest.mock("../components/PaintingPalette/PaintingPalette", () => ({
  PaintingPalette: (props: any) => mockPaintingPalette(props),
}));

jest.mock("@/lib/utils", () => ({
  capitalizeFirst: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
}));

describe("PaintingDetails", () => {
  const painting = {
    namePainting: "Noite Estrelada",
    originalTitle: "The Starry Night",
    datePainting: "1889",
    local: "Museu de Arte Moderna, Nova York",
    materials: "Óleo sobre tela",
    style: "Pós-impressionismo",
    physicalDimensions: "73,7 cm × 92,1 cm",
    period: "Saint-Rémy-de-Provence",
    genre: "Paisagem",
    description:
      "Uma das pinturas mais famosas de Van Gogh, representando a vista de seu quarto no asilo de Saint-Rémy.",
    color1: "#123456",
    color2: "#654321",
    color3: "#abcdef",
    color4: "#fedcba",
    color5: "#0f0f0f",
  } as Painting;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPaintingPalette.mockImplementation(({ colors }) =>
      colors && colors.length > 0 ? (
        <div data-testid="mock-palette">Mocked Palette</div>
      ) : null
    );
  });

  it("renders all details correctly", () => {
    render(<PaintingDetails painting={painting} />);

    const expectedLabels = [
      "Título original:",
      "Data:",
      "Local:",
      "Materiais:",
      "Estilo:",
      "Dimensões:",
      "Período:",
      "Gênero:",
    ];

    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    expect(screen.getByText("The Starry Night")).toBeInTheDocument();
    expect(screen.getByText("1889")).toBeInTheDocument();
    expect(screen.getByText("Pós-impressionismo")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<PaintingDetails painting={painting} />);
    expect(
      screen.getByText(/uma das pinturas mais famosas de van gogh/i)
    ).toBeInTheDocument();
  });

  it("renders PaintingPalette when colors are provided", () => {
    render(<PaintingDetails painting={painting} />);

    expect(mockPaintingPalette).toHaveBeenCalledWith({
      colors: [
        "#123456",
        "#654321",
        "#abcdef",
        "#fedcba",
        "#0f0f0f",
      ],
    });

    expect(screen.getByTestId("mock-palette")).toBeInTheDocument();
  });

  it("does not render palette section when no colors exist", () => {
    const paintingWithoutColors = {
      ...painting,
      color1: "",
      color2: "",
      color3: "",
      color4: "",
      color5: "",
    };

    render(<PaintingDetails painting={paintingWithoutColors} />);
    expect(screen.queryByTestId("mock-palette")).not.toBeInTheDocument();
  });

  it("has accessible structure and labels", () => {
    render(<PaintingDetails painting={painting} />);

    const article = screen.getByRole("article", {
      name: /detalhes da pintura/i,
    });
    expect(article).toBeInTheDocument();
  });
});
