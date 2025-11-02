import { renderHook, act } from "@testing-library/react";
import { usePaintingDetails } from "../usePaintingDetails";

jest.mock("../../../../../public/data/data.json", () => ({
  data_painting: [
    { id: "1", namePainting: "Primeira" },
    { id: "2", namePainting: "Segunda" },
    { id: "3", namePainting: "Terceira" },
  ],
}));

describe("usePaintingDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns prevPainting and nextPainting correctly", () => {
    const painting = { id: "2", namePainting: "Segunda" } as any;
    const { result } = renderHook(() => usePaintingDetails(painting));

    expect(result.current.prevPainting?.namePainting).toBe("Primeira");
    expect(result.current.nextPainting?.namePainting).toBe("Terceira");
  });

  it("returns undefined when painting is not provided", () => {
    const { result } = renderHook(() => usePaintingDetails(undefined));
    expect(result.current.prevPainting).toBeUndefined();
    expect(result.current.nextPainting).toBeUndefined();
  });

  it("initializes with default states", () => {
    const painting = { id: "1", namePainting: "Primeira" } as any;
    const { result } = renderHook(() => usePaintingDetails(painting));

    expect(result.current.show3D).toBe(false);
    expect(result.current.isFullscreen).toBe(false);
  });

  it("updates show3D and isFullscreen states", () => {
    const painting = { id: "1", namePainting: "Primeira" } as any;
    const { result } = renderHook(() => usePaintingDetails(painting));

    act(() => result.current.setShow3D(true));
    act(() => result.current.setIsFullscreen(true));

    expect(result.current.show3D).toBe(true);
    expect(result.current.isFullscreen).toBe(true);
  });

  it("resets both states when Escape key is pressed", () => {
    const painting = { id: "2", namePainting: "Segunda" } as any;
    const { result } = renderHook(() => usePaintingDetails(painting));

    act(() => {
      result.current.setShow3D(true);
      result.current.setIsFullscreen(true);
    });

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Escape" });
      window.dispatchEvent(event);
    });

    expect(result.current.show3D).toBe(false);
    expect(result.current.isFullscreen).toBe(false);
  });

  it("removes keydown listener on unmount", () => {
    const painting = { id: "1", namePainting: "Primeira" } as any;
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => usePaintingDetails(painting));
    expect(addSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    unmount();
    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
  });
});
