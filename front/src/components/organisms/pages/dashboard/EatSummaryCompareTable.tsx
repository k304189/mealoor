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
            <Td>{`${afterData.breakfast}${unit}`}</Td>
            <Td>{`${afterData.lunch}${unit}`}</Td>
            <Td>{`${afterData.dinner}${unit}`}</Td>
            <Td>{`${afterData.snack}${unit}`}</Td>
          </Tr>
        ) : (
          <></>
        )}
        { beforeData ? (
          <Tr>
            <Td>{beforeData.date}</Td>
            <Td>{`${beforeData.breakfast}${unit}`}</Td>
            <Td>{`${beforeData.lunch}${unit}`}</Td>
            <Td>{`${beforeData.dinner}${unit}`}</Td>
            <Td>{`${beforeData.snack}${unit}`}</Td>
          </Tr>
        ) : (
          <></>
        )}
        { diffEatSummary ? (
          <Tr>
            <Td />
            <Td>
              <Flex>
                {`${diffEatSummary.breakfast}${unit}`}
                <Spacer />
                <FontAwesomeIcon icon={getArrowIcon(diffEatSummary.breakfast ?? 0)} />
              </Flex>
            </Td>
            <Td>
              <Flex>
                {`${diffEatSummary.lunch}${unit}`}
                <Spacer />
                <FontAwesomeIcon icon={getArrowIcon(diffEatSummary.lunch ?? 0)} />
              </Flex>
            </Td>
            <Td>
              <Flex>
                {`${diffEatSummary.dinner}${unit}`}
                <Spacer />
                <FontAwesomeIcon icon={getArrowIcon(diffEatSummary.dinner ?? 0)} />
              </Flex>
            </Td>
            <Td>
              <Flex>
                {`${diffEatSummary.snack}${unit}`}
                <Spacer />
                <FontAwesomeIcon icon={getArrowIcon(diffEatSummary.snack ?? 0)} />
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
