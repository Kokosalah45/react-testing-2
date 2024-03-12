import OrderSelectionForm from "@/components/OrderSelectionForm";

const OrderEntryPage = () => {
  return (
    <>
      <header className="p-5">
        <h1 className="text-3xl font-bold text-center rounded-md p-5 bg-orange-300 shadow-md">
          Order Entry
        </h1>
      </header>
      <main className="p-8 bg-orange-300 m-5 rounded-lg shadow-md">
        <OrderSelectionForm />
      </main>
    </>
  );
};

export default OrderEntryPage;
