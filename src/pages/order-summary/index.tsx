import { useLocation } from "react-router-dom";

const OrderSummaryPage = () => {
  const { state } = useLocation();

  return <pre>{JSON.stringify({ state }, null, 2)}</pre>;
};

export default OrderSummaryPage;
