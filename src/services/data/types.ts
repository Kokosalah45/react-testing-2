export type OrderOption = {
  id: number;
  name: string;
  imagePath: string;
};

export type OrderCategory = {
  multiSelect: boolean;
  price: number;
  max: number;
  options: OrderOption[];
};
