import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("Should check wether Contact component rendered", () => {
  render(<Contact />);
  const heading = screen.getByRole("heading");

  expect(heading).toBeInTheDocument();
});

it("Should load the email", () => {
  render(<Contact />);
  const email = screen.getByText("support@foodfire.com");
  expect(email).toBeInTheDocument();
});
