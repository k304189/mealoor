import { TFoodCategory } from "./TFoodCategory";

export type TFoodCommon = {
  id: number;
  name: string;
  eat_type: string;
  food_type: string;
  categories: Array<TFoodCategory>;
  shop: string;
  price: number;
  kcal: number;
  amount: number;
  unit: string;
  protein: number;
  lipid: number;
  carbo: number;
  discounted: boolean;
  note: string;
};
