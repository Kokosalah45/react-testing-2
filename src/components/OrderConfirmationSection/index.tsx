import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

type Props = {
  onSubmitOrder: () => void;
  termsAndConditionsMessage: string;
  submitOrderMessage: string;
};

const OrderConfirmationSection = ({
  onSubmitOrder,
  termsAndConditionsMessage,
  submitOrderMessage,
}: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <section>
      <div className={cn("flex", "items-center")}>
        <Checkbox
          id="termsAndConditions"
          checked={isChecked}
          onClick={() => setIsChecked((prev) => !prev)}
          className="mr-2"
        />
        <label className="mt-px" htmlFor="termsAndConditions">
          {termsAndConditionsMessage}
        </label>
      </div>
      <Button
        disabled={!isChecked}
        onClick={onSubmitOrder}
        variant={"destructive"}
      >
        {submitOrderMessage}
      </Button>
    </section>
  );
};

export default OrderConfirmationSection;
