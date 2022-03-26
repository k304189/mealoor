import { TFoodCommon } from "./TFoodCommon";

export type TFavoriteEat = TFoodCommon & {
  registeredName: string;
  amountNote: string;
};
