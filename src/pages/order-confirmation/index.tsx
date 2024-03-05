import OrderConfirmationForm from "@/components/OrderConfirmationForm";

const OrderConfirmationPage = () => {
  return (
    <div>
      <OrderConfirmationForm
        onSubmitOrder={async () => console.log("ORDER CONFIRMED !")}
      />
    </div>
  );
};

export default OrderConfirmationPage;
