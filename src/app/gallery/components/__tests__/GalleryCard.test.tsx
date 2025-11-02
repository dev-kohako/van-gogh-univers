import { render, screen } from "@testing-library/react";
import { GalleryCard } from "../GalleryCard";
import React from "react";
import { Painting } from "@/types/types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, priority, blurDataURL, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      data-testid="mock-image"
      data-priority={priority ? "true" : "false"}
      data-blur={blurDataURL ? "true" : "false"}
      {...props}
    />
  ),
}));

describe("GalleryCard", () => {
  const mockPainting = {
    id: "1",
    namePainting: "Noite Estrelada",
    datePainting: "1889",
    imagePainting: "/paintings/noite-estrelada.jpg",
    alt: "Pintura Noite Estrelada",
    width: 800,
    height: 600,
  } as Painting;

  const mockVariants = {
    hover: {},
    overlay: {},
    title: {},
  };

  it("renders painting image and title", () => {
    render(
      <GalleryCard painting={mockPainting} index={0} variants={mockVariants} />
    );

    const img = screen.getByTestId("mock-image");
    expect(img).toHaveAttribute("src", mockPainting.imagePainting);
    expect(img).toHaveAttribute("alt", mockPainting.alt);

    const title = screen.getByText(/noite estrelada/i);
    expect(title).toBeInTheDocument();
  });

  it("applies correct link and aria-label", () => {
    render(
      <GalleryCard painting={mockPainting} index={0} variants={mockVariants} />
    );
    const link = screen.getByRole("link", { name: /ampliar noite estrelada/i });

    expect(link).toHaveAttribute("href", mockPainting.imagePainting);
    expect(link).toHaveAttribute(
      "aria-label",
      expect.stringContaining("Ampliar")
    );
  });

  it("sets priority and loading correctly for first 5 paintings", () => {
    const { rerender } = render(
      <GalleryCard painting={mockPainting} index={2} variants={mockVariants} />
    );

    let img = screen.getByTestId("mock-image");
    expect(img).toHaveAttribute("data-priority", "true");
    expect(img).toHaveAttribute("loading", "eager");

    rerender(
      <GalleryCard painting={mockPainting} index={6} variants={mockVariants} />
    );
    img = screen.getByTestId("mock-image");

    expect(img).toHaveAttribute("data-priority", "false");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("renders custom HTML data attribute with painting info", () => {
    render(
      <GalleryCard painting={mockPainting} index={0} variants={mockVariants} />
    );
    const link = screen.getByRole("link", { name: /ampliar noite estrelada/i });

    const html = link.getAttribute("data-sub-html")!;
    expect(html).toContain(mockPainting.namePainting);
    expect(html).toContain(mockPainting.datePainting);
  });

  it("applies correct aspect ratio based on width and height", () => {
    render(
      <GalleryCard painting={mockPainting} index={0} variants={mockVariants} />
    );
    const link = screen.getByRole("link", { name: /ampliar noite estrelada/i });

    expect(link).toHaveStyle({
      aspectRatio: `${mockPainting.width / mockPainting.height}`,
    });
  });
});
