import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        async lazy() {
          const orderPage = await import("./pages/order");
          return {
            Component: orderPage.default,
          };
        },
      },
      {
        path: "/order-summary",
        async lazy() {
          const OrderSummaryPage = await import("./pages/order-summary");
          return {
            Component: OrderSummaryPage.default,
          };
        },
      },
      {
        path: "/order-confirmation",
        async lazy() {
          const OrderConfirmationPage = await import(
            "./pages/order-confirmation"
          );
          return {
            Component: OrderConfirmationPage.default,
          };
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
