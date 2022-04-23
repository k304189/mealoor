export type TDataset = {
  type?: "bar" | "line";
  label: string;
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  data: Array<number | null>;
  yAxisID?: string;
};
