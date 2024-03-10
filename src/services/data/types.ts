export type OrderOption = {
  id: number;
  name: string;
  imagePath: string;
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
