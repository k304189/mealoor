import { TUse } from "./TUse";

export type TUsePaginate = {
  count: number;
  total_pages: number;
  page_size: number;
  results: Array<TUse>;
};
