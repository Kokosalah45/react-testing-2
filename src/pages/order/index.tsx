import OrderConfirmationSection from "@/components/OrderConfirmationSection";

const OrderPage = () => {
  return (
    <div>
      <OrderConfirmationSection
        onSubmitOrder={() => console.log("order !!")}
        termsAndConditionsMessage="hello world"
      />
    </div>
  );
};

export default OrderPage;
