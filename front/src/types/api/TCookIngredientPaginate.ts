import { TCookIngredient } from "./TCookIngredient"

export type TCookIngredientPaginate = {
  count: number;
  total_pages: number;
  page_size: number;
  results: Array<TCookIngredient>;
};
