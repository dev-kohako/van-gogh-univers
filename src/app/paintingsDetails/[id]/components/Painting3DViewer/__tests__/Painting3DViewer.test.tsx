import { render, screen, fireEvent } from "@testing-library/react";
import { Painting3DViewer } from "../Painting3DViewer";

jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => (
    <div data-testid="mock-canvas">{children}</div>
  ),
}));

jest.mock("@react-three/drei", () => ({
  Html: ({ children }: any) => <div data-testid="mock-html">{children}</div>,
}));

jest.mock("@/components/ui/spinner", () => ({
  Spinner: () => <div data-testid="mock-spinner">Spinner</div>,
}));

jest.mock("../components/Painting3DViewer/PaintingScene.tsx", () => ({
  PaintingScene: ({ imageUrl, width, height }: any) => (
    <div data-testid="mock-painting-scene">
      Scene: {imageUrl}, {width}x{height}
    </div>
  ),
}));

describe("Painting3DViewer", () => {
  const defaultProps = {
    imageUrl: "/painting.jpg",
    width: 100,
    height: 80,
    title: "Noite Estrelada",
    onClose: jest.fn(),
  };

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
      if (
        typeof msg === "string" &&
        (msg.includes("is using incorrect casing") ||
          msg.includes("unrecognized") ||
          msg.includes("React does not recognize"))
      ) {
        return;
      }
      (console as any).error.original?.(msg, ...args);
    });
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders dialog and close button", () => {
    render(<Painting3DViewer {...defaultProps} />);
    expect(
      screen.getByRole("dialog", { name: /noite estrelada/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /fechar visualizador 3d/i })
    ).toBeInTheDocument();
  });

  it("renders Canvas and PaintingScene when data is valid", () => {
    render(<Painting3DViewer {...defaultProps} />);
    expect(screen.getByTestId("mock-canvas")).toBeInTheDocument();
    expect(screen.getByTestId("mock-painting-scene")).toHaveTextContent(
      "painting.jpg"
    );
  });

  it("renders fallback when data is missing", () => {
    render(
      <Painting3DViewer
        imageUrl=""
        width={0}
        height={0}
        onClose={jest.fn()}
        title="Obra"
      />
    );
    expect(screen.getByText(/carregando dados da obra/i)).toBeInTheDocument();
    expect(screen.getByTestId("mock-spinner")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Painting3DViewer {...defaultProps} onClose={onClose} />);
    fireEvent.click(
      screen.getByRole("button", { name: /fechar visualizador 3d/i })
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = jest.fn();
    render(<Painting3DViewer {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
