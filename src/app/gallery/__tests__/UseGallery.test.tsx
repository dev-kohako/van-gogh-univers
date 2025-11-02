import { renderHook } from "@testing-library/react";
import { useGallery } from "../useGallery";

jest.mock("motion/react", () => ({
  useScroll: jest.fn(() => ({ scrollYProgress: 0.5 })),
  useSpring: jest.fn(() => 0.5),
}));

describe("useGallery", () => {
  it("returns all expected properties", () => {
    const { result } = renderHook(() => useGallery());
    const data = result.current;

    expect(data).toHaveProperty("scaleX");
    expect(data).toHaveProperty("hoverVariants");
    expect(data).toHaveProperty("overlayVariants");
    expect(data).toHaveProperty("titleVariants");
  });

  it("contains correct hover variant values", () => {
    const { result } = renderHook(() => useGallery());
    const { hoverVariants } = result.current;

    expect(hoverVariants.initial.scale).toBeCloseTo(1.025);
    expect(hoverVariants.hover.scale).toBeCloseTo(1.075);
    expect(hoverVariants.hover.transition.duration).toBe(0.3);
  });
});
