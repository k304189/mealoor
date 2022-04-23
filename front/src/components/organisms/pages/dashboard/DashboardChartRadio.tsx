import { memo, useEffect, useState, VFC } from "react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/react";

import { DefaultRadioGroup } from "../../../molecules/form/DefaultRadioGroup";
import { TFormAttribute } from "../../../../types/components/TFormAttribute";

type Props = {
  barChartValue: string;
  onChangeBarChartValue: (nextValue: string) => void;
  lineChartValue: string;
  onChangeLineChartValue: (nextValue: string) => void;
};

export const DashboardChartRadio: VFC<Props> = memo((props) => {
  const {
    barChartValue,
    onChangeBarChartValue,
    lineChartValue,
    onChangeLineChartValue,
  } = props;
  const [barChartArray, setBarChartArray] = useState<Array<TFormAttribute>>([]);
  const [lineChartArray, setLineChartArray] = useState<Array<TFormAttribute>>([]);

  const dashboardChartArrayBase = [
    { value: "体重" },
    { value: "体脂肪率" },
    { value: "体脂肪量" },
    { value: "カロリー" },
    { value: "価格" },
  ];

  useEffect(() => {
    const tmpBarChartArray = dashboardChartArrayBase.map((baseData) => {
      return {
        value: baseData.value,
        disabled: baseData.value === lineChartValue,
      };
    });

    const tmpLineChartArray = dashboardChartArrayBase.map((baseData) => {
      return {
        value: baseData.value,
        disabled: baseData.value === barChartValue,
      };
    });

    setBarChartArray(tmpBarChartArray);
    setLineChartArray(tmpLineChartArray);
  }, [barChartValue, lineChartValue]);

  return (
    <Table size="sm" variant="unstyled">
      <Tbody>
        <Tr>
          <Td p={1} w="15%">棒グラフ</Td>
          <Td p={1} w="85%">
            <DefaultRadioGroup
              items={barChartArray}
              groupName="barChartRadio"
              value={barChartValue}
              onChange={onChangeBarChartValue}
              size="xs"
            />
          </Td>
        </Tr>
        <Tr>
          <Td p={1}>折れ線グラフ</Td>
          <Td p={1}>
            <DefaultRadioGroup
              items={lineChartArray}
              groupName="lineChartRadio"
              value={lineChartValue}
              onChange={onChangeLineChartValue}
              size="xs"
              className="defaultSecondRadioButton"
            />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
});
