import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/test-utils";
import App from "@/App";

test("user order flow", async () => {
  render(<App />);
  const mintScoop = await screen.findByRole("checkbox", { name: /mint/i });
  const chocolateScoop = await screen.findByRole("checkbox", {
    name: /chocolate/i,
  });

  const cherryTopping = await screen.findByRole("spinbutton", {
    name: /cherries/i,
  });

  await userEvent.click(mintScoop);
  await userEvent.click(chocolateScoop);
  await userEvent.clear(cherryTopping);
  await userEvent.type(cherryTopping, "2");

  const scoopsSubtotal = screen.getByText(/scoops subtotal/i);
  const toppingsSubtotal = screen.getByText(/toppings subtotal/i);

  expect(scoopsSubtotal).toHaveTextContent("scoops subtotal: $7");
  expect(toppingsSubtotal).toHaveTextContent("toppings subtotal: $3");

  const grandTotal = await screen.findByText("Grand Total", {
    exact: false,
  });

  expect(grandTotal).toHaveTextContent("Grand Total: $10");

  const orderButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.click(orderButton);

  const chosenItems = await screen.findAllByRole("listitem");

  expect(chosenItems).toHaveLength(3);
  expect(chosenItems[0]).toHaveTextContent("chocolate - 1");
  expect(chosenItems[1]).toHaveTextContent("Mint chip - 1");
  expect(chosenItems[2]).toHaveTextContent("Cherries - 2");

  const chosenItemsSubtotals = screen.getAllByText(/subtotal/i);
  const chosenItemsgrandTotal = screen.getByText(/grand total/i);

  expect(chosenItemsSubtotals[0]).toHaveTextContent("Subtotal: 7");
  expect(chosenItemsSubtotals[1]).toHaveTextContent("Subtotal: 3");
  expect(chosenItemsgrandTotal).toHaveTextContent("Grand Total: 10");

  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(confirmOrderButton).toBeDisabled();
  await userEvent.click(termsAndConditionsCheckbox);
  expect(confirmOrderButton).toBeEnabled();
  await userEvent.click(confirmOrderButton);

  const thankYouMessage = await screen.findByText(/thank you/i);
  expect(thankYouMessage).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const orderAgainLink = screen.getByRole("link", { name: /order again/i });

  await userEvent.click(orderAgainLink);

  const mainPage = await screen.findByRole("heading", {
    name: /order entry/i,
  });

  expect(mainPage).toBeInTheDocument();
});
