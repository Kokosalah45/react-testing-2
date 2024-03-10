import { test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderConfirmationPage from ".";

test("renders a button", async () => {
  render(<OrderConfirmationPage />);
  const buttonEL = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  expect(buttonEL).toBeInTheDocument();
});

test("renders a checkbox", async () => {
  render(<OrderConfirmationPage />);
  const checkboxEL = screen.getByRole("checkbox");
  expect(checkboxEL).toBeInTheDocument();
});

test("clicking the checkbox toggles the checked state", async () => {
  const user = userEvent.setup();
  render(<OrderConfirmationPage />);
  const checkboxEL = screen.getByRole("checkbox");
  await user.click(checkboxEL);
  expect(checkboxEL).toBeChecked();
  await user.click(checkboxEL);
  expect(checkboxEL).not.toBeChecked();
});

test("should toggle the button state on checking and unchecking terms and conditions checkbox", async () => {
  const user = userEvent.setup();
  render(<OrderConfirmationPage />);
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
  render(<OrderConfirmationPage />);

  const popover = screen.queryByRole("dialog", {
    name: /Place content for the popover here./i,
  });
  expect(popover).not.toBeInTheDocument();
});

test("terms and conditions popover should be on the screen on hover", async () => {
  const user = userEvent.setup();

  render(<OrderConfirmationPage />);

  const termsAndConditions = screen.getByRole("button", {
    name: /Terms and Conditions/i,
  });

  await user.hover(termsAndConditions);

  const popover = screen.getByText(/Place content for the popover here./i);

  expect(popover).toBeInTheDocument();
});
