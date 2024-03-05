import { test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import OrderSelectionForm from ".";

test("renders a data", async () => {
  render(<OrderSelectionForm />);
  const preElement = await screen.findByRole("img");
  expect(preElement).toBeInTheDocument();
});
