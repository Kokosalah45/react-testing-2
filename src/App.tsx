import { Navigate, Route, Routes } from "react-router-dom";
import OrderEntryPage from "./pages/order-entry";
import OrderSummaryPage from "./pages/order-summary";
import OrderConfirmationPage from "./pages/order-confirmation";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/order-entry" />} />
      <Route path="/order-entry" element={<OrderEntryPage />} />
      <Route path="/order-summary" element={<OrderSummaryPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
    </Routes>
  );
}

export default App;
