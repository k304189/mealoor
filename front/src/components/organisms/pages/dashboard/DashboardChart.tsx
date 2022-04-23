import { memo, useEffect, useState, VFC } from "react";
import { Box, VStack } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

import { DashboardChartRadio } from "./DashboardChartRadio";
import { TDashboard } from "../../../../types/api/dashboard/TDashboard";
import { TDashboardEatSummary } from "../../../../types/api/dashboard/TDashboardEatSummary";
import { TDataset } from "../../../../types/components/chart/TDataset";
import { TOptions } from "../../../../types/components/chart/TOptions";
import {
  eatSummaryKcalColor,
  eatSummaryPriceColor,
  eatTimingBreakfastChartColor,
  eatTimingLunchChartColor,
  eatTimingDinnerChartColor,
  eatTimingSnackChartColor,
  bodyWeightColor,
  bodyFatRateColor,
  bodyFatWeightColor,
} from "../../../../theme/systemTheme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  dashboardData: TDashboard | null;
};

export const DashboardChart: VFC<Props> = memo((props) => {
  const { dashboardData } = props;
  const [barChartValue, setBarChartValue] = useState("体脂肪率");
  const [yAxisLeftUnit, setYAxisLeftUnit] = useState("%");
  const [lineChartValue, setLineChartValue] = useState("体重");
  const [yAxisRightUnit, setYAxisRightUnit] = useState("%");

  const [datasets, setDatasets] = useState<Array<TDataset>>([]);
  const setAxisUnit = (value: number | string, unit: string) => {
    return `${value}${unit}`;
  };

  const options: TOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        display: true,
        stacked: true,
        position: "left",
        ticks: {
          callback: (value: number | string) => {
            return setAxisUnit(value, yAxisLeftUnit);
          },
        },
      },
      y1: {
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: (value: number | string) => {
            return setAxisUnit(value, yAxisRightUnit);
          },
        },
      },
    },
  };

  const data = {
    labels: dashboardData?.label,
    datasets,
  };

  const getBarChartDatasets = (): Array<TDataset> => {
    const barChartDatasets: Array<TDataset> = [];
    let barChartData: Array<number | null> = [];
    let axisUnit: string = "";

    if (dashboardData) {
      const yAxisID = "y";
      if (["カロリー", "価格"].includes(barChartValue)) {
        let dashboardEatSummary: TDashboardEatSummary = dashboardData.eat_summary.kcal;
        axisUnit = "kcal";
        if (barChartValue === "価格") {
          dashboardEatSummary = dashboardData.eat_summary.price;
          axisUnit = "円";
        }
        barChartDatasets.push({
          type: "bar" as const,
          label: "朝食",
          backgroundColor: eatTimingBreakfastChartColor,
          data: dashboardEatSummary.breakfast,
          yAxisID,
        });

        barChartDatasets.push({
          type: "bar" as const,
          label: "昼食",
          backgroundColor: eatTimingLunchChartColor,
          data: dashboardEatSummary.lunch,
          yAxisID,
        });

        barChartDatasets.push({
          type: "bar" as const,
          label: "夕食",
          backgroundColor: eatTimingDinnerChartColor,
          data: dashboardEatSummary.dinner,
          yAxisID,
        });

        barChartDatasets.push({
          type: "bar" as const,
          label: "間食",
          backgroundColor: eatTimingSnackChartColor,
          data: dashboardEatSummary.snack,
          yAxisID,
        });
      } else {
        let bodyChartColor = "#000000";
        if (barChartValue === "体重") {
          barChartData = dashboardData.body.weight;
          bodyChartColor = bodyWeightColor;
          axisUnit = "kg";
        } else if (barChartValue === "体脂肪率") {
          barChartData = dashboardData.body.fat_rate;
          bodyChartColor = bodyFatRateColor;
          axisUnit = "%";
        } else if (barChartValue === "体脂肪量") {
          barChartData = dashboardData.body.fat_weight;
          bodyChartColor = bodyFatWeightColor;
          axisUnit = "kg";
        }
        barChartDatasets.push({
          type: "bar" as const,
          label: barChartValue,
          backgroundColor: bodyChartColor,
          data: barChartData,
          yAxisID,
        });
      }
    }
    setYAxisLeftUnit(axisUnit);
    return barChartDatasets;
  };

  const getLineChartDataset = (): TDataset => {
    let lineChartData: Array<number | null> = [];
    let chartColor = "#000000";
    let axisUnit: string = "";
    if (dashboardData) {
      if (["カロリー", "価格"].includes(lineChartValue)) {
        let dashboardEatSummary: TDashboardEatSummary = dashboardData.eat_summary.kcal;
        axisUnit = "kcal";
        chartColor = eatSummaryKcalColor;
        if (lineChartValue === "価格") {
          dashboardEatSummary = dashboardData.eat_summary.price;
          chartColor = eatSummaryPriceColor;
          axisUnit = "円";
        }
        dashboardEatSummary.breakfast.forEach((bfData, index) => {
          const luData = dashboardEatSummary.lunch[index] ?? 0;
          const diData = dashboardEatSummary.dinner[index] ?? 0;
          const snData = dashboardEatSummary.snack[index] ?? 0;
          lineChartData.push((bfData ?? 0) + luData + diData + snData);
        });
      } else if (lineChartValue === "体重") {
        lineChartData = dashboardData.body.weight;
        chartColor = bodyWeightColor;
        axisUnit = "kg";
      } else if (lineChartValue === "体脂肪率") {
        lineChartData = dashboardData.body.fat_rate;
        chartColor = bodyFatRateColor;
        axisUnit = "%";
      } else if (lineChartValue === "体脂肪量") {
        lineChartData = dashboardData.body.fat_weight;
        chartColor = bodyFatWeightColor;
        axisUnit = "kg";
      }
    }
    setYAxisRightUnit(axisUnit);
    return {
      type: "line" as const,
      label: lineChartValue,
      borderColor: chartColor,
      data: lineChartData,
      yAxisID: "y1",
    };
  };

  const changeChart = () => {
    const barChartDatasets = getBarChartDatasets();
    const lineChartDataset = getLineChartDataset();

    setDatasets([
      lineChartDataset,
      ...barChartDatasets,
    ]);
  };

  useEffect(() => {
    changeChart();
  }, [dashboardData]);

  useEffect(() => {
    changeChart();
  }, [barChartValue, lineChartValue]);

  return (
    <VStack h="100%" w="100%" gap={3}>
      <Box h="20%" w="100%">
        <DashboardChartRadio
          barChartValue={barChartValue}
          onChangeBarChartValue={setBarChartValue}
          lineChartValue={lineChartValue}
          onChangeLineChartValue={setLineChartValue}
        />
      </Box>
      <Box h="75%" w="100%">
        <Chart type="bar" data={data} options={options} />
      </Box>
    </VStack>
  );
});
