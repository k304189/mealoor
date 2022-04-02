import { TFoodCommon } from "./TFoodCommon";

export type TFavoriteEat = TFoodCommon & {
  registered_name: string;
  amount_note: string;
};
