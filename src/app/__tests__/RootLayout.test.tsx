import { render, screen } from "@testing-library/react";
import RootLayout from "../layout";

jest.mock("@/components/theme-provider", () => ({
  ThemeProvider: ({ children }: any) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

jest.mock("../layoutWrapper", () => ({
  LayoutWrapper: ({ children }: any) => (
    <div data-testid="layout-wrapper">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("renders ThemeProvider and LayoutWrapper with children", () => {
    render(
      <RootLayout>
        <p>Conteúdo interno</p>
      </RootLayout>
    );

    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();
    expect(screen.getByTestId("layout-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo interno")).toBeInTheDocument();
  });
});
