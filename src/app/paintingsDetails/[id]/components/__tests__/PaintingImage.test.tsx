import { render, screen, fireEvent } from "@testing-library/react";
import { PaintingImage } from "../PaintingImage";
import { Painting } from "@/types/types";

jest.mock("next/image", () => (props: any) => (
  <img data-testid="mock-image" {...props} />
));

jest.mock("next/link", () => (props: any) => (
  <a data-testid="mock-link" {...props} />
));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...rest }: any) => (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  ),
}));

describe("PaintingImage", () => {
  const painting = {
    id: "1",
    namePainting: "Noite Estrelada",
    alt: "Noite Estrelada",
    imagePainting: "/assets/paintings/noite_estrelada.jpg",
    width: 800,
    height: 600,
  } as Painting;

  const prevPainting = { id: "0", namePainting: "Anterior" } as Painting;
  const nextPainting = { id: "2", namePainting: "Seguinte" } as Painting;

  const mockShow3D = jest.fn();
  const mockOpenFullscreen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders painting image and 3D button", () => {
    render(
      <PaintingImage
        painting={painting}
        prevPainting={null}
        nextPainting={null}
        onShow3D={mockShow3D}
        onOpenFullscreen={mockOpenFullscreen}
      />
    );

    expect(screen.getByTestId("mock-image")).toHaveAttribute(
      "src",
      painting.imagePainting
    );
    expect(
      screen.getByRole("button", {
        name: `Visualizar ${painting.alt} em 3D`,
      })
    ).toBeInTheDocument();
  });

  it("calls onShow3D when 3D button is clicked", () => {
    render(
      <PaintingImage
        painting={painting}
        prevPainting={null}
        nextPainting={null}
        onShow3D={mockShow3D}
        onOpenFullscreen={mockOpenFullscreen}
      />
    );

    const button = screen.getByRole("button", {
      name: `Visualizar ${painting.alt} em 3D`,
    });
    fireEvent.click(button);
    expect(mockShow3D).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenFullscreen when fullscreen button is clicked", () => {
    render(
      <PaintingImage
        painting={painting}
        prevPainting={null}
        nextPainting={null}
        onShow3D={mockShow3D}
        onOpenFullscreen={mockOpenFullscreen}
      />
    );

    const button = screen.getByRole("button", {
      name: `Ver ${painting.alt} em tela cheia`,
    });
    fireEvent.click(button);
    expect(mockOpenFullscreen).toHaveBeenCalledTimes(1);
  });

  it("renders navigation buttons when prevPainting and nextPainting exist", () => {
    render(
      <PaintingImage
        painting={painting}
        prevPainting={prevPainting}
        nextPainting={nextPainting}
        onShow3D={mockShow3D}
        onOpenFullscreen={mockOpenFullscreen}
      />
    );

    expect(
      screen.getByRole("button", { name: /ver pintura anterior/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ver pintura seguinte/i })
    ).toBeInTheDocument();

    const links = screen.getAllByTestId("mock-link");
    expect(links[0]).toHaveAttribute(
      "href",
      `/paintingsDetails/${prevPainting.id}`
    );
    expect(links[1]).toHaveAttribute(
      "href",
      `/paintingsDetails/${nextPainting.id}`
    );
  });

  it("renders accessible structure with ARIA labels", () => {
    render(
      <PaintingImage
        painting={painting}
        prevPainting={null}
        nextPainting={null}
        onShow3D={mockShow3D}
        onOpenFullscreen={mockOpenFullscreen}
      />
    );

    expect(
      screen.getByRole("group", { name: /visualizador da pintura/i })
    ).toBeInTheDocument();
  });
});
