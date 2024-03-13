import { test, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
// import { server } from "@/mocks/node";
// import { errorHandlers } from "@/mocks/handlers";
// import userEvent from "@testing-library/user-event";
import { render } from "@/test-utils";
import OrderSummaryPage from ".";

import * as reactDOM from "react-router-dom";

test.only("renders page heading", async () => {
  vi.spyOn(reactDOM, "useLocation").mockReturnValueOnce({
    ...reactDOM.useLocation(),
    state: {
      scoops: [],
      toppings: [{}],
      orderSubtotals: {
        scoops: 0,
        toppings: 0,
      },
      orderGrandTotal: 0,
    },
  });

  render(<OrderSummaryPage />);

  const headingEL = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(headingEL).toBeInTheDocument();
});

test("renders a scoops section", async () => {
  render(<OrderSummaryPage />);

  const headingEL = screen.getByRole("heading", {
    name: /scoops/i,
  });
  expect(headingEL).toBeInTheDocument();
});

test("renders a toppings section", async () => {
  render(<OrderSummaryPage />);

  const headingEL = screen.getByRole("heading", {
    name: /toppings/i,
  });
  expect(headingEL).toBeInTheDocument();
});

test("renders a button", async () => {
  render(<OrderSummaryPage />);
  const buttonEL = screen.getByRole("button", {
    name: /order sundae/i,
  });
  expect(buttonEL).toBeInTheDocument();
});
