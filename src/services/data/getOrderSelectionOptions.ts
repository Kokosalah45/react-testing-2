import client from "./client";
import { OrderCategory } from "./types";

export type OrderCategoryResponse = Record<
  "toppings" | "scoops",
  OrderCategory
>;

export async function getOrderSelectionOptions() {
  const response = await client.get<OrderCategoryResponse>("/order-selection");
  return response;
}
