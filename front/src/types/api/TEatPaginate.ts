import { TEat } from "./TEat";

export type TEatPaginate = {
  count: number;
  total_pages: number;
  page_size: number;
  results: Array<TEat>;
};
