import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/order-entry" />,
      },
      {
        path: "/order-entry",
        async lazy() {
          const orderEntryPage = await import("./pages/order-entry/index.js");
          return {
            Component: orderEntryPage.default,
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
