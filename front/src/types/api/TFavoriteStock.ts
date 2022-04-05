import { TFoodCommon } from "./TFoodCommon";

export type TFavoriteStock = TFoodCommon & {
  quantity: number;
  location: string;
};
