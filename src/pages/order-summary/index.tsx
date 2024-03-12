import { useSearchParams } from "react-router-dom";

const OrderSummaryPage = () => {
  const [searchParams] = useSearchParams();

  return <pre>{searchParams.get("selections")}</pre>;
};

export default OrderSummaryPage;
