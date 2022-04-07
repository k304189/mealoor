import { TFavoriteStock } from "./TFavoriteStock";

export type TFavoriteStockPaginate = {
  count: number;
  total_pages: number;
  page_size: number;
  results: Array<TFavoriteStock>;
};
