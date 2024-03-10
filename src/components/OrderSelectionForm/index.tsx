import { getOrderSelectionOptions } from "@/services/data/getOrderSelectionOptions";
import { useForm } from "react-hook-form";
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

const OrderSelectionForm = () => {
  const form = useForm({
    async defaultValues() {
      try {
        const { data } = await getOrderSelectionOptions();
        return {
          scoops: {
            max: data["scoops"].max,
            multiSelect: data["scoops"].multiSelect,

            selections: data["scoops"].options.map((item) => ({
              id: item.id,
              name: item.name,
              imgPath: item.imagePath,
              quantity: 0,
            })),
          },
          toppings: {
            max: data["toppings"].max,
            multiSelect: data["toppings"].multiSelect,
            selections: data["toppings"].options.map((item) => ({
              id: item.id,
              name: item.name,
              imgPath: item.imagePath,
              quantity: 0,
            })),
          },
        };
      } catch (error) {
        console.error(error);
        return {
          scoops: {
            max: 1,
            multiSelect: false,
            selections: [],
          },
          toppings: {
            max: 1,
            multiSelect: false,
            selections: [],
          },
        };
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
        className="space-y-8"
      >
        {Object.entries(form.getValues()).map(([key, value]) => {
          const category = key as "scoops" | "toppings";
          return (
            <section key={category}>
              <h2 className="text-2xl font-bold capitalize mb-5">{category}</h2>
              <menu className="grid grid-cols-four-cols gap-5" key={key}>
                {value.selections.length > 0 ? (
                  value.selections.map((selection, index) => {
                    return (
                      <li
                        key={selection.id}
                        className="flex flex-col gap-2 bg-white p-3 rounded-lg pt-5"
                      >
                        <figure className="flex justify-center ">
                          <img
                            width={150}
                            src={selection.imgPath}
                            loading="lazy"
                          />
                        </figure>
                        <FormField
                          control={form.control}
                          name={`${category}.selections.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem
                              className={`flex justify-around items-center p-5`}
                            >
                              <FormLabel className="text-xl space-y-2">
                                {selection.name}
                              </FormLabel>
                              <FormControl>
                                {value.max > 1 ? (
                                  <Input
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
                  <div role="alert">no {category} items found</div>
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
