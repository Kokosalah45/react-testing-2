import { test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import OrderPage from ".";
import { afterEach } from "node:test";
import { server } from "@/mocks/node";
import { errorHandlers } from "@/mocks/handlers";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  server.resetHandlers();
});

test("renders a selection sections", async () => {
  render(<OrderPage />);

  const scoopsSection = await screen.findByRole("heading", {
    name: /scoops/i,
  });
  const toppingsSection = await screen.findByRole("heading", {
    name: /toppings/i,
  });
  expect(scoopsSection).toBeInTheDocument();
  expect(toppingsSection).toBeInTheDocument();
});

test.only("renders correct subtotals for scoops and toppings", async () => {
  const user = userEvent.setup();

  render(<OrderPage />);

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

test("renders alert with proper messages when an error takes place", async () => {
  server.use(...errorHandlers);
  render(<OrderPage />);
  const alert = await screen.findAllByRole("alert");
  expect(alert).toHaveLength(2);
});

test("renders a selection images", async () => {
  render(<OrderPage />);
  const selectionsImages = await screen.findAllByRole("img");
  expect(selectionsImages).toHaveLength(10);
});
