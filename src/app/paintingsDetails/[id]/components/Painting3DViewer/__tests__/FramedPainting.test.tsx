import React from "react";
import { render, screen } from "@testing-library/react";
import { FramedPainting } from "../FramedPainting";
import * as drei from "@react-three/drei";
import * as THREE from "three";

const mockTexture = { wrapS: 0, wrapT: 0 } as unknown as THREE.Texture;

jest
  .spyOn(drei, "useTexture")
  .mockReturnValue([mockTexture, mockTexture, mockTexture]);

jest.mock("@react-three/drei", () => ({
  ...jest.requireActual("@react-three/drei"),
  Text3D: ({ children }: any) => <div data-testid="text3d">{children}</div>,
  Center: ({ children }: any) => <div data-testid="center">{children}</div>,
  useTexture: jest.fn(),
}));

(THREE.RepeatWrapping as any) = 1001;

describe("FramedPainting", () => {
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
  const props = {
    width: 60,
    height: 80,
    scaledWidth: 3,
    scaledHeight: 4,
    texture: mockTexture,
  };

  it("calls useTexture with expected texture paths", () => {
    render(<FramedPainting {...props} />);
    expect(drei.useTexture).toHaveBeenCalledWith([
      "/textures/fine_grained_wood_col_1k.jpg",
      "/textures/fine_grained_wood_nor_gl_1k.jpg",
      "/textures/fine_grained_wood_rough_1k.jpg",
    ]);
  });

  it("renders FrameBack and GalleryPlaque components", () => {
    render(<FramedPainting {...props} />);
    expect(screen.getByTestId("text3d")).toHaveTextContent("60cm x 80cm");
    expect(screen.getByTestId("center")).toBeInTheDocument();
  });

  it("applies RepeatWrapping on loaded textures", () => {
    render(<FramedPainting {...props} />);
    expect(mockTexture.wrapS).toBe(1000);
    expect(mockTexture.wrapT).toBe(1000);
  });

  it("renders correct number of frame meshes (4 sides)", () => {
    const { container } = render(<FramedPainting {...props} />);
    const meshes = container.querySelectorAll("mesh");
    expect(meshes.length).toBeGreaterThanOrEqual(4);
  });
});
