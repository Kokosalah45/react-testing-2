import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { OrderRequest } from "@/services/data/postOrderSelection";
import { useLocation, useNavigate } from "react-router-dom";
import usePostOrderRequest from "@/hooks/usePostOrderRequest";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

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

type Props = {};

const OrderConfirmationForm = ({}: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const { state } = useLocation() as {
    state: OrderRequest;
  };

  const { data, isSuccess, mutate, isError } = usePostOrderRequest();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/order-confirmation", {
        state: data,
      });
    }
  }, [isSuccess]);

  if (isError)
    return (
      <Alert>
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          There was an error processing your order. Please try again.
        </AlertDescription>
      </Alert>
    );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const isAgreed = formData.get("termsAndConditions");
        if (isAgreed) {
          mutate(state);
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
