import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.jsx";
import OrderPage from "./pages/order";
import OrderSummaryPage from "./pages/order-summary";
import OrderConfirmationPage from "./pages/order-confirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <OrderPage />,
        index: true,
      },
      {
        path: "/order-summary",
        element: <OrderSummaryPage />,
      },
      {
        path: "/order-confirmation",
        element: <OrderConfirmationPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
