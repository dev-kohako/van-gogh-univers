import { render, screen } from "@testing-library/react";
import { VanGogh3DCard } from "../VanGogh3DCard";
import React from "react";

jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="mock-canvas">{children}</div>,
  useLoader: jest.fn(() => ({
    wrapS: 0,
    wrapT: 0,
    repeat: { set: jest.fn() },
  })),
  mesh: "mesh",
  planeGeometry: "planeGeometry",
  shadowMaterial: "shadowMaterial",
  sphereGeometry: "sphereGeometry",
  cylinderGeometry: "cylinderGeometry",
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="mock-orbit-controls" />,
  Loader: () => <div data-testid="mock-loader" />,
  useGLTF: () => ({ scene: { clone: jest.fn(() => ({ traverse: jest.fn() })) } }),
}));

jest.mock("three", () => ({
  Mesh: class MockMesh {},
  BackSide: "BackSide",
  RepeatWrapping: "RepeatWrapping",
  TextureLoader: class MockTextureLoader {},
}));

jest.mock("../components/RotationMenuItems", () => ({
  RotationMenuItems: ({ autoRotate, velocity }: any) => (
    <div data-testid="mock-rotation-menu">
      Menu — autoRotate: {String(autoRotate)} — velocity: {velocity}
    </div>
  ),
}));

jest.mock("../components/VanGoghDetails", () => () => (
  <div data-testid="mock-details">Detalhes de Van Gogh</div>
));

describe("VanGogh3DCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing and shows core UI elements", () => {
    render(<VanGogh3DCard />);

    expect(
      screen.getByRole("region", { name: /seção 3d de van gogh/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-loader")).toBeInTheDocument();
    expect(screen.getByTestId("mock-canvas")).toBeInTheDocument();
    expect(screen.getByTestId("mock-details")).toBeInTheDocument();
    expect(
      screen.getByText(/eu sonho minha pintura e depois pinto meu sonho/i)
    ).toBeInTheDocument();
  });

  it("shows rotation badges with default states", () => {
    render(<VanGogh3DCard />);

    expect(
      screen.getByLabelText(/rotação automática ativada/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/velocidade atual de rotação: 0\.5/i)
    ).toBeInTheDocument();
  });

  it("includes the rotation control menu component", () => {
    render(<VanGogh3DCard />);
    expect(screen.getByTestId("mock-rotation-menu")).toHaveTextContent(
      "autoRotate: true"
    );
    expect(screen.getByTestId("mock-rotation-menu")).toHaveTextContent(
      "velocity: 0.5"
    );
  });
});
