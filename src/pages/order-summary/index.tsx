import { Button } from "@/components/ui/button";
import { OrderOption } from "@/services/data/types";
import { Link, Navigate, useLocation } from "react-router-dom";

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

  return (
    <>
      <header className="p-5">
        <h1 className="text-3xl font-bold text-center rounded-md p-5 bg-orange-300 shadow-md">
          Order Summary{" "}
        </h1>
      </header>
      <main className="p-8 bg-orange-300 m-5 rounded-lg shadow-md">
        <h2>Scoops: {state.orderSubtotals.scoops}</h2>
        <ul>
          {state.scoops.map((scoop) => (
            <li key={scoop.name}>
              {scoop.name} - {scoop.quantity}
            </li>
          ))}
        </ul>
        {state.toppings.length > 0 ? (
          <>
            <h2>Toppings: {state.orderSubtotals.toppings}</h2>
            <ul>
              {state.toppings.map((topping) => (
                <li key={topping.name}>
                  {topping.name} - {topping.quantity}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>you Selected no toppings </div>
        )}

        <h2>Grand Total: {state.orderGrandTotal}</h2>

        <Button onClick={() => console.log({ state })}>Order Sundae !!</Button>
      </main>
    </>
  );
};

export default OrderSummaryPage;
