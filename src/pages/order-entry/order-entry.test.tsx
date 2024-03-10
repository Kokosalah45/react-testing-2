import { test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import OrderPage from ".";
import { afterEach } from "node:test";
import { server } from "@/mocks/node";
import { errorHandlers } from "@/mocks/handlers";

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
