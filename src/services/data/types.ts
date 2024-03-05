export type OrderOption = {
  id: number;
  name: string;
  price: number;
};

export type OrderCategory = {
  multiSelect: boolean;
  max: number;
  options: OrderOption[];
};

export type OrderCategoryResponse = Record<
  "toppings" | "scoops",
  OrderCategory
>;
