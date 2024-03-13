import client from "./client";
import { OrderOption } from "./types";

export type OrderRequest = {
  scoops: (Omit<OrderOption, "imagePath"> & { quantity: number })[];
  toppings: (Omit<OrderOption, "imagePath"> & { quantity: number })[];
  orderSubtotals: { scoops: number; toppings: number };
  orderGrandTotal: number;
};

export type OrderResponse = {
  orderNumber: number;
};

export default function postOrderSelection(data: OrderRequest) {
  return client.post<OrderResponse>("/order", {
    data,
  });
}
