import { TFoodCommon } from "./TFoodCommon";

export type TEat = TFoodCommon & {
  eat_timing: string;
  date: string;
};
