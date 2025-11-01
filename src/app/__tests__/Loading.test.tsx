import { render, screen } from "@testing-library/react";
import Loading from "../loading";

jest.mock("@/components/ui/loader", () => ({
  LoaderOne: ({ color }: any) => (
    <div data-testid="mock-loader" data-color={color}></div>
  ),
}));

describe("Loading Page", () => {
  it("renders loader and text", () => {
    render(<Loading />);
    expect(screen.getByTestId("mock-loader")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText(/carregando conteúdo/i)).toBeInTheDocument();
  });
});
