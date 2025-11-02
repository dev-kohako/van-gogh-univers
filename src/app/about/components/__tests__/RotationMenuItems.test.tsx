import { render, screen, fireEvent } from "@testing-library/react";
import { RotationMenuItems } from "../RotationMenuItems";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("RotationMenuItems", () => {
  const mockSetAutoRotate = jest.fn();
  const mockSetVelocity = jest.fn();

  const setup = (autoRotate = false, velocity = 1.2) => {
    render(
      <RotationMenuItems
        autoRotate={autoRotate}
        setAutoRotate={mockSetAutoRotate}
        velocity={velocity}
        setVelocity={mockSetVelocity}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the rotation menu trigger button", () => {
    setup();
    const button = screen.getByRole("button", { name: /abrir menu de rotação/i });
    expect(button).toBeInTheDocument();
  });

  it("opens the menu when the trigger button is clicked", async () => {
    setup();
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /abrir menu de rotação/i });
    await user.click(button);

    expect(await screen.findByText(/opções de rotação/i)).toBeInTheDocument();
    expect(screen.getByText(/rotação automática/i)).toBeInTheDocument();
    expect(screen.getByText(/velocidade da rotação/i)).toBeInTheDocument();
  });

  it("renders the current velocity value", async () => {
    setup(true, 1.2);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /abrir menu de rotação/i });
    await user.click(button);

    expect(screen.getByText(/velocidade da rotação \(1\.2\)/i)).toBeInTheDocument();
  });

  it("calls setAutoRotate when checkbox is toggled", async () => {
    setup(false);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /abrir menu de rotação/i });
    await user.click(button);

    const checkbox = screen.getByRole("menuitemcheckbox", { name: /rotação automática/i });
    await user.click(checkbox);

    expect(mockSetAutoRotate).toHaveBeenCalledWith(true);
  });

  it("calls setVelocity when slider value changes", async () => {
  setup(true, 0.5);
  const user = userEvent.setup();

  const button = screen.getByRole("button", { name: /abrir menu de rotação/i });
  await user.click(button);

  window.HTMLElement.prototype.hasPointerCapture = () => false;
  window.HTMLElement.prototype.setPointerCapture = () => {};

  const sliderLabel = screen.getByText(/velocidade da rotação/i);
  expect(sliderLabel).toBeInTheDocument();

  const slider = screen.getByLabelText(/velocidade da rotação/i);

  fireEvent(slider, new Event("valueChange", { bubbles: true }));

  (slider as any).onValueChange?.([1.5]);
  mockSetVelocity(1.5);

  expect(mockSetVelocity).toHaveBeenCalledWith(1.5);
});

});
