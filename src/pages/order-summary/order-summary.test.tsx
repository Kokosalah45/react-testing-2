import { test, expect, vi, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import { useLocation } from "react-router-dom";

import OrderSummaryPage from ".";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  vi.mock("react-router-dom", async (importOriginal) => {
    const actualModule = await importOriginal<
      typeof import("react-router-dom")
    >();
    return {
      __esModule: true,
      ...actualModule,
      useLocation: vi.fn().mockReturnValue({
        state: {
          scoops: [{}],
          toppings: [],
          orderSubtotals: {
            scoops: 0,
            toppings: 0,
          },
          orderGrandTotal: 0,
        },
      }),
    };
  });
});

test("renders page heading", async () => {
  render(<OrderSummaryPage />);

  const headingEL = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(headingEL).toBeInTheDocument();
});

test("renders a scoops section", async () => {
  //@ts-ignore
  useLocation.mockReturnValueOnce({
    state: {
      scoops: [
        {
          id: 1,
          name: "Chocolate",
          quantity: 2,
        },
        {
          id: 2,
          name: "Vanilla",
          quantity: 1,
        },
      ],

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
    name: /scoops/i,
  });
  const chocolateScoopEL = screen.getByText(/chocolate - 2/i);
  const vanillaScoopEL = screen.getByText(/vanilla - 1/i);

  expect(headingEL).toBeInTheDocument();
  expect(chocolateScoopEL).toBeInTheDocument();
  expect(vanillaScoopEL).toBeInTheDocument();
});

test("renders a toppings section", async () => {
  // @ts-ignore
  useLocation.mockReturnValueOnce({
    state: {
      scoops: [{}],
      toppings: [
        {
          id: 1,
          name: "Cherries",
          quantity: 2,
        },
        {
          id: 2,
          name: "M&Ms",
          quantity: 1,
        },
      ],
      orderSubtotals: {
        scoops: 0,
        toppings: 0,
      },
      orderGrandTotal: 0,
    },
  });
  render(<OrderSummaryPage />);

  const headingEL = screen.getByRole("heading", {
    name: /toppings/i,
  });
  const cherriesToppingEL = screen.getByText(/cherries - 2/i);
  const mAndMsToppingEL = screen.getByText(/m&ms - 1/i);

  expect(headingEL).toBeInTheDocument();
  expect(cherriesToppingEL).toBeInTheDocument();
  expect(mAndMsToppingEL).toBeInTheDocument();
});

test("renders grand total", async () => {
  // @ts-ignore
  useLocation.mockReturnValueOnce({
    state: {
      scoops: [{}],
      toppings: [{}],
      orderSubtotals: {
        scoops: 10,
        toppings: 5,
      },
      orderGrandTotal: 15,
    },
  });
  render(<OrderSummaryPage />);

  const grandTotalEL = screen.getByText(/grand total: 15/i);
  expect(grandTotalEL).toBeInTheDocument();
});

test("renders no toppings message", async () => {
  // @ts-ignore
  useLocation.mockReturnValueOnce({
    state: {
      scoops: [{}],
      toppings: [],
      orderSubtotals: {
        scoops: 0,
        toppings: 0,
      },
      orderGrandTotal: 0,
    },
  });
  render(<OrderSummaryPage />);
  const noToppingsEL = screen.getByText(/you selected no toppings/i);
  expect(noToppingsEL).toBeInTheDocument();
});

test("renders subtotals", async () => {
  // @ts-ignore
  useLocation.mockReturnValueOnce({
    state: {
      scoops: [{}],
      toppings: [{}],
      orderSubtotals: {
        scoops: 10,
        toppings: 5,
      },
      orderGrandTotal: 15,
    },
  });
  render(<OrderSummaryPage />);
  const scoopsSubtotalEL = screen.getByText(/Subtotal: 10/i);
  const toppingsSubtotalEL = screen.getByText(/Subtotal: 5/i);
  expect(scoopsSubtotalEL).toBeInTheDocument();
  expect(toppingsSubtotalEL).toBeInTheDocument();
});

test("renders a button", async () => {
  render(<OrderSummaryPage />);
  const buttonEL = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  expect(buttonEL).toBeInTheDocument();
});

test("renders a checkbox", async () => {
  render(<OrderSummaryPage />);
  const checkboxEL = screen.getByRole("checkbox");
  expect(checkboxEL).toBeInTheDocument();
});

test("clicking the checkbox toggles the checked state", async () => {
  const user = userEvent.setup();
  render(<OrderSummaryPage />);
  const checkboxEL = screen.getByRole("checkbox");
  await user.click(checkboxEL);
  expect(checkboxEL).toBeChecked();
  await user.click(checkboxEL);
  expect(checkboxEL).not.toBeChecked();
});

test("should toggle the button state on checking and unchecking terms and conditions checkbox", async () => {
  const user = userEvent.setup();
  render(<OrderSummaryPage />);
  const checkboxEL = screen.getByRole("checkbox", {
    name: /I agree on Terms and Conditions/i,
  });
  const buttonEL = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  await user.click(checkboxEL);
  expect(buttonEL).toBeEnabled();
  await user.click(checkboxEL);
  expect(buttonEL).toBeDisabled();
});

test("terms and conditions popover shouldn't be on the screen", async () => {
  render(<OrderSummaryPage />);

  const popover = screen.queryByRole("dialog", {
    name: /Place content for the popover here./i,
  });
  expect(popover).not.toBeInTheDocument();
});

test("terms and conditions popover should be on the screen on hover", async () => {
  const user = userEvent.setup();

  render(<OrderSummaryPage />);

  const termsAndConditions = screen.getByRole("button", {
    name: /Terms and Conditions/i,
  });

  await user.hover(termsAndConditions);

  const popover = screen.getByText(/Place content for the popover here./i);

  expect(popover).toBeInTheDocument();
});
