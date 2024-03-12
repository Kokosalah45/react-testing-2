import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrderConfirmationPage from "./pages/order-confirmation";
import OrderEntryPage from "./pages/order-entry/index.js";
import OrderSummaryPage from "./pages/order-summary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/order-entry" />} />
            <Route path="/order-entry" element={<OrderEntryPage />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
