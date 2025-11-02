jest.mock("@react-spring/three", () => ({
  useSpring: jest.fn(() => ({
    pos: [0, 0, 0],
  })),
}));

import { render, screen, act } from "@testing-library/react";
import { PaintingScene } from "../PaintingScene";
import * as THREE from "three";

const mockUseFrame = jest.fn();
const mockGetObjectByName = jest.fn(() => ({ intensity: 1.5 }));

const mockScene: any = {
  fog: null,
  environment: null,
  getObjectByName: mockGetObjectByName,
};

const mockUseThree = jest.fn(() => ({
  camera: { position: new THREE.Vector3(), lookAt: jest.fn() },
  scene: mockScene,
  viewport: { width: 10, height: 5 },
}));

jest.mock("@react-three/fiber", () => ({
  useThree: () => mockUseThree(),
  useFrame: (fn: any) => mockUseFrame(fn),
}));

const mockTexture: { mapping: number | null } = { mapping: null };
const mockUseTexture = jest.fn((path: string) => mockTexture);

jest.mock("@react-three/drei", () => ({
  useTexture: (path: string) => mockUseTexture(path),
  OrbitControls: jest.fn(({ children }: any) => (
    <div data-testid="mock-orbit-controls">{children}</div>
  )),
}));

jest.mock("../components/Painting3DViewer/FramedPainting", () => ({
  FramedPainting: ({ width, height }: any) => (
    <div data-testid="mock-framed-painting">
      FramedPainting {width}x{height}
    </div>
  ),
}));

describe("PaintingScene", () => {
  const props = {
    imageUrl: "/textures/painting.jpg",
    width: 100,
    height: 80,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it("renders essential scene elements", () => {
    const { container } = render(<PaintingScene {...props} />);
    expect(container.querySelector("ambientLight")).toBeInTheDocument();
    expect(container.querySelector("spotLight")).toBeInTheDocument();
    expect(screen.getByTestId("mock-framed-painting")).toHaveTextContent("100x80");
  });

  it("applies texture mapping and environment setup", async () => {
    render(<PaintingScene {...props} />);

    await act(async () => {
      mockTexture.mapping = THREE.EquirectangularReflectionMapping;
      mockScene.environment = mockTexture;
    });

    expect(mockTexture.mapping).toBe(THREE.EquirectangularReflectionMapping);
    expect(mockScene.environment).toBe(mockTexture);
  });

  it("calls useFrame with animation logic", () => {
    render(<PaintingScene {...props} />);

    const fn = mockUseFrame.mock.calls[0][0];
    const mockClock = { getElapsedTime: () => 1 };

    act(() => {
      fn({ clock: mockClock });
    });

    expect(mockGetObjectByName).toHaveBeenCalledWith("warmLight");
  });

  it("renders OrbitControls and SceneSetupAndAnimation", () => {
    const { getByTestId } = render(<PaintingScene {...props} />);
    expect(getByTestId("mock-orbit-controls")).toBeInTheDocument();
  });
});
