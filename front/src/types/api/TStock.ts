import { TFoodCommon } from "./TFoodCommon";

export type TStock = TFoodCommon & {
  limit: string;
  quantity: number;
  location: string;
  remain: number;
};
