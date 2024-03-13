import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import usePostOrderRequest from "@/hooks/usePostOrderRequest";
import { OrderRequest } from "@/services/data/postOrderSelection";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const OrderSummaryPage = () => {
  const { state } = useLocation() as {
    state: OrderRequest;
  };

  useEffect(() => {
    window.history.replaceState({}, "");
  }, []);

  const { data, isSuccess, mutate, isError } = usePostOrderRequest();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/order-confirmation", {
        state: data,
      });
    }
  }, [isSuccess]);

  if (!state) return <Navigate to={"/"} />;

  if (isError)
    return (
      <Alert>
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          There was an error processing your order. Please try again.
        </AlertDescription>
      </Alert>
    );

  return (
    <>
      <header className="p-5">
        <h1 className="text-3xl font-bold text-center rounded-md p-5 bg-orange-300 shadow-md">
          Order Summary
        </h1>
      </header>
      <main className="p-8 bg-orange-300 m-5 rounded-lg shadow-md flex flex-col items-start gap-10">
        <section>
          <header className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Scoops</h2>
            <h3 className="text-md font-semibold">
              Subtotal: {state.orderSubtotals.scoops}
            </h3>
          </header>
          <ul>
            {state.scoops.map((scoop) => (
              <li className="ml-5" key={scoop.name}>
                {scoop.name} - {scoop.quantity}
              </li>
            ))}
          </ul>
        </section>
        {state.toppings.length > 0 ? (
          <section>
            <header className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Toppings</h2>
              <h3 className="text-md font-semibold">
                Subtotal: {state.orderSubtotals.toppings}
              </h3>
            </header>

            <ul>
              {state.toppings.map((topping) => (
                <li className="ml-5" key={topping.name}>
                  {topping.name} - {topping.quantity}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div>you Selected no toppings </div>
        )}

        <h2 className="text-2xl font-bold">
          Grand Total: {state.orderGrandTotal}
        </h2>

        <Button
          onClick={() => {
            mutate(state);
          }}
        >
          Order Sundae !!
        </Button>
      </main>
    </>
  );
};

export default OrderSummaryPage;
