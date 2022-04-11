import { TCookStock } from "./TCookStock";

export type TCook = {
  name: string;
  limit: string;
  location: string;
  date?: string;
  eat_timing?: string;
  rate?: number;
  ingredients: Array<TCookStock>;
};
