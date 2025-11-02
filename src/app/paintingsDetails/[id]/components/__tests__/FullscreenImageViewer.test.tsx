import { render } from "@testing-library/react";
import { FullscreenImageViewer } from "../FullscreenImageViewer";
import { Painting } from "@/types/types";

jest.mock("lightgallery/plugins/zoom", () => jest.fn(() => "zoom-plugin"));
jest.mock("lightgallery/plugins/fullscreen", () => jest.fn(() => "fullscreen-plugin"));

const mockOpenGallery = jest.fn();
const mockLightGalleryInstance = { openGallery: mockOpenGallery };

let capturedProps: any = {};

jest.mock("lightgallery/react", () => {
  return jest.fn((props: any) => {
    capturedProps = props;

    if (props.onInit) {
      setTimeout(() => {
        props.onInit({ instance: mockLightGalleryInstance });
      }, 50);
    }

    setTimeout(() => props.onAfterClose?.(), 100);

    return <div data-testid="mock-lightgallery">Mock LightGallery</div>;
  });
});

describe("FullscreenImageViewer", () => {
  const painting = {
    namePainting: "Noite Estrelada",
    datePainting: "1889",
    imagePainting: "/assets/paintings/noite_estrelada.jpg",
  } as Painting;

  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
      if (
        typeof msg === "string" &&
        (msg.includes("non-boolean attribute") ||
          msg.includes("React does not recognize"))
      ) {
        return;
      }
      (console.error as any).original?.(msg, ...args);
    });
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore?.();
  });

  it("renders LightGallery and passes correct props", () => {
    render(<FullscreenImageViewer painting={painting} onClose={onClose} />);

    expect(document.querySelector("[data-testid='mock-lightgallery']")).toBeInTheDocument();
    expect(capturedProps.speed).toBe(500);
    expect(capturedProps.download).toBe(false);
    expect(capturedProps.closable).toBe(true);
    expect(capturedProps.dynamic).toBe(true);
    expect(capturedProps.plugins).toHaveLength(2);
  });

  it("calls openGallery(0) on init after timeout", () => {
    jest.useFakeTimers();
    render(<FullscreenImageViewer painting={painting} onClose={onClose} />);

    jest.advanceTimersByTime(100);

    expect(mockOpenGallery).toHaveBeenCalledWith(0);
    jest.useRealTimers();
  });

  it("calls onClose after gallery is closed", () => {
    jest.useFakeTimers();
    render(<FullscreenImageViewer painting={painting} onClose={onClose} />);

    jest.runAllTimers();
    expect(onClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("passes correct dynamic elements", () => {
    render(<FullscreenImageViewer painting={painting} onClose={onClose} />);
    const dynamicEl = capturedProps.dynamicEl;

    expect(dynamicEl).toHaveLength(1);
    expect(dynamicEl[0].src).toBe(painting.imagePainting);
    expect(dynamicEl[0].subHtml).toContain(painting.namePainting);
    expect(dynamicEl[0].subHtml).toContain(painting.datePainting);
  });
});
