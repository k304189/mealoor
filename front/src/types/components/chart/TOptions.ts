export type TOptions = {
  maintainAspectRatio: boolean;
  scales?: {
    x?: {
      stacked?: boolean;
    },
    y?: {
      stacked?: boolean;
      display?: boolean;
      position?: "left";
      ticks?: {
        callback?: (value: number | string) => string;
      },
    },
    y1?: {
      display?: boolean;
      position?: "right";
      grid?: {
        drawOnChartArea?: boolean;
      },
      ticks?: {
        callback?: (value: number | string) => string;
      },
    },
  },
};
