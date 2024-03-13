import { test, expect, beforeAll, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderConfirmationPage from ".";
import { render } from "@/test-utils";

beforeAll(() => {
  vi.mock("react-router-dom", async (importOriginal) => {
    const mod = (await importOriginal()) as Record<string, unknown>;
    return {
      ...mod,
      useLocation: vi.fn().mockReturnValue({
        state: {
          orderNumber: 1234,
        },
      }),
    };
  });
});

test("renders a heading", async () => {
  render(<OrderConfirmationPage />);
  const heading = screen.getByRole("heading", {
    name: /thank you for your order!/i,
  });
  expect(heading).toBeInTheDocument();
});

test("renders a link to order again", async () => {
  render(<OrderConfirmationPage />);
  const link = screen.getByRole("link", {
    name: /wanna order again\?/i,
  });
  expect(link).toBeInTheDocument();
  userEvent.click(link);
  expect(window.location.pathname).toBe("/");
});

test("order number is displayed", async () => {
  render(<OrderConfirmationPage />);
  const orderNumber = screen.getByText(/your order number/i);
  expect(orderNumber).toBeInTheDocument();
  expect(orderNumber.nextSibling).toHaveTextContent("1234");
});
