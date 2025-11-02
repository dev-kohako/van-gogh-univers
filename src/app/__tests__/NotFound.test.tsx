import { render, screen } from "@testing-library/react";
import NotFound from "../not-found";

describe("NotFound Page", () => {
  it("renders 404 and link to home", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /voltar para o início/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
