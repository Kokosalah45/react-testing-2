import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { server } from "@/mocks/node";
import { errorHandlers } from "@/mocks/handlers";
import userEvent from "@testing-library/user-event";
import { render } from "@/test-utils";
import OrderEntryPage from ".";

test("renders a selection sections", async () => {
  render(<OrderEntryPage />);

  const scoopsSection = await screen.findByRole("heading", {
    name: "scoops",
  });
  const toppingsSection = await screen.findByRole("heading", {
    name: "toppings",
  });
  expect(scoopsSection).toBeInTheDocument();
  expect(toppingsSection).toBeInTheDocument();
});

test("renders alert with proper messages when an error takes place", async () => {
  server.use(...errorHandlers);
  render(<OrderEntryPage />);
  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);
});

test("renders a selection images", async () => {
  render(<OrderEntryPage />);
  const selectionsImages = await screen.findAllByRole("img");
  expect(selectionsImages).toHaveLength(10);
});

test("renders correct subtotals for scoops and toppings", async () => {
  const user = userEvent.setup();

  render(<OrderEntryPage />);

  const scoopsSubtotal = await screen.findByText(/scoops subtotal/i);
  const toppingsSubtotal = await screen.findByText(/toppings subtotal/i);

  expect(scoopsSubtotal).toHaveTextContent("scoops subtotal: $0");
  expect(toppingsSubtotal).toHaveTextContent("toppings subtotal: $0");

  const chocolateScoop = await screen.findByRole("checkbox", {
    name: /chocolate/i,
  });

  const mintScoop = await screen.findByRole("checkbox", {
    name: /mint/i,
  });

  const cherryTopping = await screen.findByRole("spinbutton", {
    name: /cherries/i,
  });

  await user.click(chocolateScoop);
  await user.click(mintScoop);
  await user.clear(cherryTopping);
  await user.type(cherryTopping, "2");

  expect(scoopsSubtotal).toHaveTextContent("scoops subtotal: $7");
  expect(toppingsSubtotal).toHaveTextContent("toppings subtotal: $3");
});

test("render correct grand total", async () => {
  const user = userEvent.setup();
  render(<OrderEntryPage />);
  const grandTotal = await screen.findByText("Grand Total", {
    exact: false,
  });
  expect(grandTotal).toHaveTextContent("Grand Total: $0");

  const chocolateScoop = await screen.findByRole("checkbox", {
    name: /chocolate/i,
  });

  const mintScoop = await screen.findByRole("checkbox", {
    name: /mint/i,
  });

  const cherryTopping = await screen.findByRole("spinbutton", {
    name: /cherries/i,
  });

  await user.click(chocolateScoop);
  await user.click(mintScoop);
  await user.clear(cherryTopping);
  await user.type(cherryTopping, "2");

  expect(grandTotal).toHaveTextContent("Grand Total: $10");
});
