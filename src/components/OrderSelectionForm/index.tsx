import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useEffect } from "react";
import { OrderOption } from "@/services/data/types";
import useGetOrderSelectionOptions from "@/hooks/useGetOrderSelectionOptions";
import { useNavigate } from "react-router-dom";

const OrderSelectionForm = () => {
  const { data, isLoading, isFetching, isError, refetch, status } =
    useGetOrderSelectionOptions();

  const navigate = useNavigate();

  const form = useForm<{
    scoops: (Omit<OrderOption, "imagePath"> & { quantity: number })[];
    toppings: (Omit<OrderOption, "imagePath"> & { quantity: number })[];
  }>({
    defaultValues: {
      scoops: [],
      toppings: [],
    },
  });
  useEffect(() => {
    if (status === "success") {
      const { scoops, toppings } = data;
      form.reset({
        scoops: scoops.options.map((option) => {
          const { imagePath, ...rest } = option;
          return { ...rest, quantity: 0 };
        }),
        toppings: toppings.options.map((option) => {
          const { imagePath, ...rest } = option;
          return { ...rest, quantity: 0 };
        }),
      });
    }
  }, [status]);

  const values = useWatch({
    control: form.control,
  });

  if (isLoading || isFetching) return <div role="status">Loading...</div>;

  const valueEntries = Object.entries(values);

  const orderSubtotals = valueEntries.reduce(
    (acc, [key, selectionCategory]) => {
      const categoryType = key as "scoops" | "toppings";
      const subtotal = selectionCategory?.reduce(
        (acc, selection) =>
          acc + (selection.quantity || 0) * (data?.[categoryType].price || 0),
        0
      );
      return { ...acc, [categoryType]: subtotal };
    },
    { scoops: 0, toppings: 0 }
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          navigate(`/order-summary`, {
            state: data,
          });
        })}
        className="space-y-8"
      >
        {valueEntries.map(([key, selectionOptions]) => {
          const category = key as "scoops" | "toppings";
          const categoryMeta = data?.[category];
          return (
            <section key={category}>
              <h2 className="text-2xl font-bold capitalize mb-5">{category}</h2>
              <h4>
                {category} subtotal: ${orderSubtotals[category]}
              </h4>
              <menu className="grid grid-cols-four-cols gap-5" key={key}>
                {!isError ? (
                  selectionOptions.map((option, index) => {
                    const selectionMeta = categoryMeta?.options.find(
                      (currentOption) => option.id === currentOption.id
                    );
                    return (
                      <li
                        key={option.id}
                        className={`flex flex-col gap-2 bg-white p-3 rounded-lg pt-5`}
                      >
                        <figure className="flex justify-center ">
                          <img
                            width={150}
                            src={selectionMeta?.imagePath}
                            loading="lazy"
                          />
                        </figure>
                        <FormField
                          control={form.control}
                          name={`${category}.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem
                              className={`flex justify-around items-center p-5`}
                            >
                              <FormLabel className="text-xl space-y-2">
                                {option.name}
                              </FormLabel>
                              <FormControl>
                                {(categoryMeta?.max || 1) > 1 ? (
                                  <Input
                                    role="spinbutton"
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(+e.target.value)
                                    }
                                    className="w-20"
                                  />
                                ) : (
                                  <Checkbox
                                    className="w-5 h-5 "
                                    onCheckedChange={(isChecked) =>
                                      field.onChange(+isChecked)
                                    }
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </li>
                    );
                  })
                ) : (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      There was an error fetching the {category} options
                    </AlertDescription>
                  </Alert>
                )}
              </menu>
            </section>
          );
        })}
        <Button type="submit" className="hover:bg-slate-950">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default OrderSelectionForm;
