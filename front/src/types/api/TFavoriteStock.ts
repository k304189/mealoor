import { TFoodCommon } from "./TFoodCommon";

export type TFavoriteStock = TFoodCommon & {
  registered_name: string;
  quantity: number;
};
