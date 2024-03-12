import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import OrderPage from ".";
import { server } from "@/mocks/node";
import { errorHandlers } from "@/mocks/handlers";
import userEvent from "@testing-library/user-event";
import { customRender } from "@/test-utils";

test("renders a selection sections", async () => {
  customRender(<OrderPage />);

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
  customRender(<OrderPage />);
  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);
});

test("renders a selection images", async () => {
  customRender(<OrderPage />);
  const selectionsImages = await screen.findAllByRole("img");
  expect(selectionsImages).toHaveLength(10);
});

test("renders correct subtotals for scoops and toppings", async () => {
  const user = userEvent.setup();

  customRender(<OrderPage />);

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
