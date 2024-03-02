import { test, expect, vitest } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import OrderConfirmationSection from "../OrderConfirmationSection";

test("renders a button", () => {
  render(
    <OrderConfirmationSection
      onSubmitOrder={() => {}}
      submitOrderMessage="hello world"
      termsAndConditionsMessage="hello world"
    />
  );
  const buttonEL = screen.getByRole("button");
  expect(buttonEL).toBeInTheDocument();
});

test("renders a checkbox", () => {
  render(
    <OrderConfirmationSection
      onSubmitOrder={() => {}}
      submitOrderMessage="hello world"
      termsAndConditionsMessage="hello world"
    />
  );
  const checkboxEL = screen.getByRole("checkbox");
  expect(checkboxEL).toBeInTheDocument();
});

test("clicking the checkbox toggles the checked state", () => {
  render(
    <OrderConfirmationSection
      onSubmitOrder={() => {}}
      submitOrderMessage="hello world"
      termsAndConditionsMessage="hello world"
    />
  );
  const checkboxEL = screen.getByRole("checkbox");
  fireEvent.click(checkboxEL);
  expect(checkboxEL).toBeChecked();
  fireEvent.click(checkboxEL);
  expect(checkboxEL).not.toBeChecked();
});

test("clicking the button shouldn't call the onSubmitOrder", () => {
  const onSubmitOrder = vitest.fn();
  render(
    <OrderConfirmationSection
      submitOrderMessage="hello world"
      onSubmitOrder={onSubmitOrder}
      termsAndConditionsMessage="hello world"
    />
  );
  const buttonEL = screen.getByRole("button");
  fireEvent.click(buttonEL);
  expect(onSubmitOrder).not.toHaveBeenCalled();
});

test("clicking the button should call the onSubmitOrder if the user agrees on the terms and conditions", () => {
  const onSubmitOrder = vitest.fn();
  render(
    <OrderConfirmationSection
      onSubmitOrder={onSubmitOrder}
      submitOrderMessage="hello world"
      termsAndConditionsMessage="hello world"
    />
  );
  const buttonEL = screen.getByRole("button");
  const checkboxEL = screen.getByRole("checkbox");
  fireEvent.click(checkboxEL);
  fireEvent.click(buttonEL);
  expect(onSubmitOrder).toHaveBeenCalled();
});
