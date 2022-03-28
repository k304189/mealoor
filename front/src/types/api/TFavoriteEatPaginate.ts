import { TFavoriteEat } from "./TFavoriteEat";

export type TFavoriteEatPaginate = {
  count: number;
  total_pages: number;
  page_size: number;
  results: Array<TFavoriteEat>;
};
