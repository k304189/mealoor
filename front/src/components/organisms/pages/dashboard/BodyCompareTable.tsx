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
import { TBody } from "../../../../types/api/TBody";

type Props = {
  beforeData?: TBody | null;
  afterData?: TBody | null;
  size?: "xs" | "sm" | "md" | "lg";
};

export const BodyCompareTable: VFC<Props> = memo((props) => {
  const { beforeData = null, afterData = null, size = "md" } = props;
  const [diffBody, setDiffBody] = useState<TBody | null>(null);

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
    let calcedDiffBody: TBody | null = null;
    if (beforeData && afterData) {
      const weight = Math.round((afterData.weight - beforeData.weight) * 100) / 100;
      const fatRate = Math.round((afterData.fat_rate - beforeData.fat_rate) * 100) / 100;
      let fatWeight = (afterData.fat_weight ?? 0);
      fatWeight -= (beforeData.fat_weight ?? 0);
      fatWeight = Math.round(fatWeight * 100) / 100;
      calcedDiffBody = {
        date: "",
        weight,
        fat_rate: fatRate,
        fat_weight: fatWeight,
      };
    }
    setDiffBody(calcedDiffBody);
  }, [beforeData, afterData]);

  return (
    <Table size={size}>
      <Thead>
        <Tr>
          <Th w="19%">日付</Th>
          <Th w="27%">体重</Th>
          <Th w="27%">体脂肪率</Th>
          <Th w="27%">体脂肪量</Th>
        </Tr>
      </Thead>
      <Tbody>
        { afterData ? (
          <Tr>
            <Td>{afterData.date}</Td>
            <Td>{`${afterData.weight}kg`}</Td>
            <Td>{`${afterData.fat_rate}%`}</Td>
            <Td>{`${afterData.fat_weight}kg`}</Td>
          </Tr>
        ) : (
          <></>
        )}
        { beforeData ? (
          <Tr>
            <Td>{beforeData.date}</Td>
            <Td>{`${beforeData.weight}kg`}</Td>
            <Td>{`${beforeData.fat_rate}%`}</Td>
            <Td>{`${beforeData.fat_weight}kg`}</Td>
          </Tr>
        ) : (
          <></>
        )}
        { diffBody ? (
          <Tr>
            <Td />
            <Td className={getDiffClassName(diffBody.weight ?? 0)}>
              <Flex align="center">
                {`${diffBody.weight}kg`}
                <Box pl={5}>
                  <ArrowIcon
                    value={(diffBody.weight ?? 0)}
                    hoverText={getArrowHoverText(diffBody.weight ?? 0)}
                  />
                </Box>
              </Flex>
            </Td>
            <Td className={getDiffClassName(diffBody.fat_rate ?? 0)}>
              <Flex align="center">
                {`${diffBody.fat_rate}%`}
                <Box pl={5}>
                  <ArrowIcon
                    value={(diffBody.fat_rate ?? 0)}
                    hoverText={getArrowHoverText(diffBody.fat_rate ?? 0)}
                  />
                </Box>
              </Flex>
            </Td>
            <Td className={getDiffClassName(diffBody.fat_weight ?? 0)}>
              <Flex align="center">
                {`${diffBody.fat_weight}kg`}
                <Box pl={5}>
                  <ArrowIcon
                    value={(diffBody.fat_weight ?? 0)}
                    hoverText={getArrowHoverText(diffBody.fat_weight ?? 0)}
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
