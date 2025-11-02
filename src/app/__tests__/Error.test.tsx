import { render, screen, fireEvent } from "@testing-library/react";
import Error from "../error";

describe("Error Page", () => {
  const mockReset = jest.fn();
  const mockError: Error & { digest?: string } = {
    name: "Error",
    message: "Test error message",
    digest: "abc123",
  };

  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.resetModules();
    (process.env as any).NODE_ENV = "production";
  });

  afterEach(() => {
    (process.env as any).NODE_ENV = originalEnv;
  });

  it("renders correctly with message and buttons", () => {
    render(<Error error={mockError} reset={mockReset} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/algo deu errado/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tentar novamente/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /página inicial/i })).toHaveAttribute("href", "/");
  });

  it("calls reset when retry button is clicked", () => {
    render(<Error error={mockError} reset={mockReset} />);
    fireEvent.click(screen.getByRole("button", { name: /tentar novamente/i }));
    expect(mockReset).toHaveBeenCalled();
  });

  it("shows error message only in development", () => {
    (process.env as any).NODE_ENV = "development";
    render(<Error error={mockError} reset={mockReset} />);
    expect(screen.getByText(/test error message/i)).toBeInTheDocument();
  });
});
