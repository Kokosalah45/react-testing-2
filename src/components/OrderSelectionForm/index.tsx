import { getOrderSelectionOptions } from "@/services/data/getOrderSelectionOptions";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";

const OrderSelectionForm = () => {
  const form = useForm({
    async defaultValues() {
      const { data } = await getOrderSelectionOptions();
      return {
        scoops: {
          max: data["scoops"].max,
          multiSelect: data["scoops"].multiSelect,

          selections: data["scoops"].options.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: 0,
          })),
        },
        toppings: {
          max: data["toppings"].max,
          multiSelect: data["toppings"].multiSelect,
          selections: data["toppings"].options.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: 0,
          })),
        },
      };
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        console.log({ data });
      })}
      className="space-y-8"
    >
      {Object.entries(form.getValues()).map(([key, value]) => {
        const category = key as "scoops" | "toppings";
        return (
          <div key={key}>
            {value.selections.map((selection, index) => {
              return (
                <>
                  <label>{selection.name}</label>
                  <input
                    key={selection.id}
                    type={value.max > 1 ? "number" : "checkbox"}
                    id={selection.id.toString()}
                    max={value.max}
                    min={0}
                    {...form.register(
                      `${category}.selections.${index}.quantity`
                    )}
                  />
                </>
              );
            })}
          </div>
        );
      })}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default OrderSelectionForm;
