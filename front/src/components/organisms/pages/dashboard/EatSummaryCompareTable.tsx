import { memo, useEffect, useState, VFC } from "react";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";

import { ArrowIcon } from "../../../molecules/display/ArrowIcon";
import { TEatSummary } from "../../../../types/api/TEatSummary";

type Props = {
  beforeData?: TEatSummary | null;
  afterData?: TEatSummary | null;
  unit?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export const EatSummaryCompareTable: VFC<Props> = memo((props) => {
  const { beforeData = null, afterData = null, unit = "", size = "md" } = props;
  const [diffEatSummary, setDiffEatSummary] = useState<TEatSummary | null>(null);

  const getDiffClassName = (value: number) => {
    let className = "";
    if (value < 0) {
      className = "diffDownCell";
    } else if (value > 0) {
      className = "diffUpCell";
    }
    return className;
  };

  const getArrowHoverText = (value: number) => {
    let hoverText = "";
    if (value < 0) {
      hoverText = "減少しています";
    } else if (value > 0) {
      hoverText = "増加しています";
    }
    return hoverText;
  };

  useEffect(() => {
    let calcedEatSummary: TEatSummary | null = null;
    if (beforeData && afterData) {
      const breakfast = (afterData.breakfast ?? 0) - (beforeData.breakfast ?? 0);
      const lunch = (afterData.lunch ?? 0) - (beforeData.lunch ?? 0);
      const dinner = (afterData.dinner ?? 0) - (beforeData.dinner ?? 0);
      const snack = (afterData.snack ?? 0) - (beforeData.snack ?? 0);
      calcedEatSummary = {
        breakfast,
        lunch,
        dinner,
        snack,
      };
    }
    setDiffEatSummary(calcedEatSummary);
  }, [beforeData, afterData]);

  return (
    <Table size={size}>
      <Thead>
        <Tr>
          <Th w="20%">日付</Th>
          <Th w="20%">朝食</Th>
          <Th w="20%">昼食</Th>
          <Th w="20%">夕食</Th>
          <Th w="20%">間食</Th>
        </Tr>
      </Thead>
      <Tbody>
        { afterData ? (
          <Tr>
            <Td>{afterData.date}</Td>
            <Td>{`${afterData.breakfast || 0}${unit}`}</Td>
            <Td>{`${afterData.lunch || 0}${unit}`}</Td>
            <Td>{`${afterData.dinner || 0}${unit}`}</Td>
            <Td>{`${afterData.snack || 0}${unit}`}</Td>
          </Tr>
        ) : (
          <></>
        )}
        { beforeData ? (
          <Tr>
            <Td>{beforeData.date}</Td>
            <Td>{`${beforeData.breakfast || 0}${unit}`}</Td>
            <Td>{`${beforeData.lunch || 0}${unit}`}</Td>
            <Td>{`${beforeData.dinner || 0}${unit}`}</Td>
            <Td>{`${beforeData.snack || 0}${unit}`}</Td>
          </Tr>
        ) : (
          <></>
        )}
        { diffEatSummary ? (
          <Tr>
            <Td />
            <Td className={getDiffClassName(diffEatSummary.breakfast ?? 0)}>
              <Flex align="center">
                {`${diffEatSummary.breakfast}${unit}`}
                <Box pl={5}>
                  <ArrowIcon
                    value={(diffEatSummary.breakfast ?? 0)}
                    hoverText={getArrowHoverText(diffEatSummary.breakfast ?? 0)}
                  />
                </Box>
              </Flex>
            </Td>
            <Td className={getDiffClassName(diffEatSummary.lunch ?? 0)}>
              <Flex align="center">
                {`${diffEatSummary.lunch}${unit}`}
                <Box pl={5}>
                  <ArrowIcon
                    value={(diffEatSummary.lunch ?? 0)}
                    hoverText={getArrowHoverText(diffEatSummary.lunch ?? 0)}
                  />
                </Box>
              </Flex>
            </Td>
            <Td className={getDiffClassName(diffEatSummary.dinner ?? 0)}>
              <Flex align="center">
                {`${diffEatSummary.dinner}${unit}`}
                <Box pl={5}>
                  <ArrowIcon
                    value={(diffEatSummary.dinner ?? 0)}
                    hoverText={getArrowHoverText(diffEatSummary.dinner ?? 0)}
                  />
                </Box>
              </Flex>
            </Td>
            <Td className={getDiffClassName(diffEatSummary.snack ?? 0)}>
              <Flex align="center">
                {`${diffEatSummary.snack}${unit}`}
                <Box pl={5}>
                  <ArrowIcon
                    value={(diffEatSummary.snack ?? 0)}
                    hoverText={getArrowHoverText(diffEatSummary.snack ?? 0)}
                  />
                </Box>
              </Flex>
            </Td>
          </Tr>
        ) : (
          <></>
        )}
      </Tbody>
    </Table>
  );
});
