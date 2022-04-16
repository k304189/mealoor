import { memo, useEffect, useState, VFC } from "react";
import {
  Flex,
  Spacer,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faArrowDown, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { TBody } from "../../../../types/api/TBody";

type Props = {
  beforeData?: TBody | null;
  afterData?: TBody | null;
  size?: "xs" | "sm" | "md" | "lg";
};

export const BodyCompareTable: VFC<Props> = memo((props) => {
  const { beforeData = null, afterData = null, size = "md" } = props;
  const [diffBody, setDiffBody] = useState<TBody | null>(null);

  const getArrowIcon = (value: number): IconDefinition => {
    let icon: IconDefinition = faArrowRight;
    if (value > 0) {
      icon = faArrowUp;
    } else if (value < 0) {
      icon = faArrowDown;
    }
    return icon;
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
          <Th w="20%">日付</Th>
          <Th w="20%">体重</Th>
          <Th w="30%">体脂肪率</Th>
          <Th w="30%">体脂肪量</Th>
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
            <Td>
              <Flex>
                {`${diffBody.weight}kg`}
                <Spacer />
                <FontAwesomeIcon icon={getArrowIcon(diffBody.weight)} />
              </Flex>
            </Td>
            <Td>
              <Flex>
                {`${diffBody.fat_rate}%`}
                <Spacer />
                <FontAwesomeIcon icon={getArrowIcon(diffBody.fat_rate)} />
              </Flex>
            </Td>
            <Td>
              <Flex>
                {`${diffBody.fat_weight}kg`}
                <Spacer />
                <FontAwesomeIcon icon={getArrowIcon(diffBody.fat_weight ?? 0)} />
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
