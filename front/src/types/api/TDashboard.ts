export type TDashboard = {
  label: Array<string>;
  eat_summary: {
    kcal: {
      breakfast: Array<number | null>;
      lunch: Array<number | null>;
      dinner: Array<number | null>;
      snack: Array<number | null>;
    },
    price: {
      breakfast: Array<number | null>;
      lunch: Array<number | null>;
      dinner: Array<number | null>;
      snack: Array<number | null>;
    },
  },
  body: {
    weight: Array<number | null>;
    fat_rate: Array<number | null>;
    fat_weight: Array<number | null>;
  },
  warning_stock_count: number;
};
