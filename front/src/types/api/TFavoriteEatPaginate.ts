import { TFavoriteEat } from "./TFavoriteEat";

export type TFavoriteEatPaginate = {
  next_page: number | null;
  prev_page: number | null;
  count: number;
  total_pages: number;
  page_size: number;
  results: Array<TFavoriteEat>;
};
