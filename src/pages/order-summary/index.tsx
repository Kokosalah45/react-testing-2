import { OrderOption } from "@/services/data/types";
import { Navigate, useLocation } from "react-router-dom";

type OrderSummaryPageState = {
  scoops: (Omit<OrderOption, "imagePath"> & { quantity: number })[];
  toppings: (Omit<OrderOption, "imagePath"> & { quantity: number })[];
  orderSubtotals: { scoops: number; toppings: number };
  orderGrandTotal: number;
} | null;

const OrderSummaryPage = () => {
  const { state } = useLocation() as {
    state: OrderSummaryPageState;
  };

  if (!state) return <Navigate to={"/order-entry"} />;

  return <pre>{JSON.stringify({ state }, null, 2)}</pre>;
};

export default OrderSummaryPage;
