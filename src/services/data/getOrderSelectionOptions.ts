import client from "./client";
import { OrderCategoryResponse } from "./types";

export async function getOrderSelectionOptions() {
  const response = await client.get<OrderCategoryResponse>("/order-selection");
  return response;
}
