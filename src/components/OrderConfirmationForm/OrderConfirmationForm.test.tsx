import { test, expect, vitest } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderConfirmationForm from ".";

test("renders a button", async () => {
  render(
    <OrderConfirmationForm
      onSubmitOrder={async () => console.log("order confirmed")}
    />
  );
  const buttonEL = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  expect(buttonEL).toBeInTheDocument();
});

test("renders a checkbox", async () => {
  render(
    <OrderConfirmationForm
      onSubmitOrder={async () => console.log("order confirmed")}
    />
  );
  const checkboxEL = screen.getByRole("checkbox");
  expect(checkboxEL).toBeInTheDocument();
});

test("clicking the checkbox toggles the checked state", async () => {
  const user = userEvent.setup();
  render(
    <OrderConfirmationForm
      onSubmitOrder={async () => console.log("order confirmed")}
    />
  );
  const checkboxEL = screen.getByRole("checkbox");
  await user.click(checkboxEL);
  expect(checkboxEL).toBeChecked();
  await user.click(checkboxEL);
  expect(checkboxEL).not.toBeChecked();
});

test("clicking the button shouldn't call the onSubmitOrder", async () => {
  const user = userEvent.setup();
  const onSubmitOrder = vitest.fn();
  render(<OrderConfirmationForm onSubmitOrder={onSubmitOrder} />);
  const buttonEL = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  await user.click(buttonEL);
  expect(onSubmitOrder).not.toHaveBeenCalled();
});

test("clicking the button should call the onSubmitOrder if the user agrees on the terms and conditions", async () => {
  const user = userEvent.setup();
  const onSubmitOrder = vitest.fn();
  render(<OrderConfirmationForm onSubmitOrder={onSubmitOrder} />);
  const buttonEL = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  const checkboxEL = screen.getByRole("checkbox");
  await user.click(checkboxEL);
  await user.click(buttonEL);
  expect(onSubmitOrder).toHaveBeenCalled();
});

test("terms and conditions popover shouldn't be on the screen", async () => {
  render(
    <OrderConfirmationForm
      onSubmitOrder={async () => console.log("order confirmed")}
    />
  );

  const popover = screen.queryByRole("dialog", {
    name: /Place content for the popover here./i,
  });
  expect(popover).not.toBeInTheDocument();
});

test("terms and conditions popover should be on the screen on hover", async () => {
  const user = userEvent.setup();

  render(
    <OrderConfirmationForm
      onSubmitOrder={async () => console.log("order confirmed")}
    />
  );

  const termsAndConditions = screen.getByRole("button", {
    name: /Terms and Conditions/i,
  });

  await user.hover(termsAndConditions);

  const popover = screen.getByText(/Place content for the popover here./i);

  expect(popover).toBeInTheDocument();
});
