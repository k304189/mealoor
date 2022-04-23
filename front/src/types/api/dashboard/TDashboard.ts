import { TDashboardBody } from "./TDashboardBody";
import { TDashboardEatSummary } from "./TDashboardEatSummary";

export type TDashboard = {
  label: Array<string>;
  eat_summary: {
    kcal: TDashboardEatSummary;
    price: TDashboardEatSummary;
  },
  body: TDashboardBody;
  warning_stock_count: number;
};
