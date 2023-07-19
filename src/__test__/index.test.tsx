import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
describe("Home", () => {
  it("renders screen", () => {
    render(<Home />);
  });
});
