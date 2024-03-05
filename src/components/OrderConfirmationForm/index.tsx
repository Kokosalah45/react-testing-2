import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const TermsAndConditionsPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <span>I agree on </span>
      <PopoverTrigger
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-blue-600 underline"
      >
        Terms and Conditions
      </PopoverTrigger>
      <PopoverContent role="dialog">
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
};

type Props = {
  onSubmitOrder: () => Promise<void>;
};

const OrderConfirmationForm = ({ onSubmitOrder }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const isAgreed = formData.get("termsAndConditions");
        if (isAgreed) {
          await onSubmitOrder();
        }
      }}
    >
      <div className={cn("flex", "items-center")}>
        <Checkbox
          id="terms-and-conditions"
          checked={isChecked}
          onClick={() => setIsChecked((prev) => !prev)}
          className="mr-2"
          name="termsAndConditions"
        />
        <label className="mt-px" htmlFor="terms-and-conditions">
          <TermsAndConditionsPopover />
        </label>
      </div>
      <Button disabled={!isChecked}>Confirm Order</Button>
    </form>
  );
};

export default OrderConfirmationForm;
