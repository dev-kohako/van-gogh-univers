import { render, screen } from "@testing-library/react";
import AboutPage from "../page";
import React from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, alt, ...props }: any) => (
    <img
      {...props}
      data-testid="mock-image"
      alt={alt || "mock image"}
      data-fill={fill ? "true" : "false"}
      data-priority={priority ? "true" : "false"}
    />
  ),
}));


jest.mock("@/components/ui/ScrollReveal", () => ({
  ScrollReveal: ({ children }: any) => <div data-testid="mock-scroll">{children}</div>,
}));

jest.mock("../components/VanGogh3DCard", () => ({
  VanGogh3DCard: () => <div data-testid="mock-3d-card">Mock 3D Card</div>,
}));

describe("AboutPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders main title and introduction text", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { name: /sobre o van gogh univers/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/uma experiência digital imersiva que une arte/i)
    ).toBeInTheDocument();
  });

  it("renders the 3D card component", () => {
    render(<AboutPage />);
    expect(screen.getByTestId("mock-3d-card")).toBeInTheDocument();
  });

  it("renders all main sections with headings", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { name: /nossa visão/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /tecnologia e arte/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /uma experiência imersiva/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /o legado de van gogh/i })).toBeInTheDocument();
  });

  it("renders the main portrait image", () => {
    render(<AboutPage />);
    const img = screen.getByTestId("mock-image");
    expect(img).toHaveAttribute("src", "/assets/van-gogh-portrait.jpg");
    expect(img).toHaveAttribute("alt", "Retrato de Vincent van Gogh");
  });

  it("contains Van Gogh quote at the end", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/a arte é para consolar aqueles que são quebrados pela vida/i)
    ).toBeInTheDocument();
  });
});
