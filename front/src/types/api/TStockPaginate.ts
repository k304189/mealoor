import { TStock } from "./TStock";

export type TStockPaginate = {
  count: number;
  total_pages: number;
  page_size: number;
  results: Array<TStock>;
};
