import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

const OrderConfirmationPage = () => {
  const { state } = useLocation() as {
    state: {
      orderNumber: number;
    };
  };

  if (!state) return <Navigate to={"/"} />;

  useEffect(() => {
    window.history.replaceState({}, "");
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="p-5">
        <h1 className="text-3xl font-bold text-center rounded-md p-5 bg-orange-300 shadow-md">
          Thank you for your order!
        </h1>
      </header>
      <main className="p-8 bg-orange-300 m-5 rounded-lg shadow-md flex-1 grid place-items-center">
        <div className="flex items-center flex-col gap-3">
          <h2 className="text-3xl font-bold">Your order number </h2>
          <p className="text-xl">{state.orderNumber}</p>
          <Link to="/">
            <Button className="py-3 px-6">wanna order again?</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmationPage;
