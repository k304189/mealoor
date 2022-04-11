import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import {
  Checkbox,
  HStack,
  InputGroup,
  InputRightAddon,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import { DefaultTextInput } from "../../../atoms/form/DefaultTextInput";
import { AddButton } from "../../../molecules/button/AddButton";
import { MinusButton } from "../../../molecules/button/MinusButton";
import { TCookStock } from "../../../../types/api/TCookStock";

type Props = {
  cookingStocks: Array<TCookStock>;
  onClickCheckbox: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onChangeRate: (value: number, id: number) => void;
  checkStockIdArray: Array<number>;
  selectedPage: number;
};

export const CookingStockTable: VFC<Props> = memo((props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const {
    cookingStocks,
    onClickCheckbox,
    onChangeRate,
    checkStockIdArray,
    selectedPage,
  } = props;

  const addRatePerQuantity = (id: number, isMinus = false) => {
    const targetCookStock = cookingStocks.find((cookingStock) => {
      return id === cookingStock.id;
    });

    if (targetCookStock && targetCookStock.quantity && targetCookStock.quantity > 0) {
      const targetRemain = targetCookStock.remain ?? 100;
      let ratePerQuantity = Math.floor(100 / targetCookStock.quantity);
      if (isMinus) {
        ratePerQuantity *= -1;
      }
      let calcedRate = targetCookStock.rate + ratePerQuantity;
      if (calcedRate < 0) {
        calcedRate = 0;
      } else if (calcedRate > targetRemain) {
        calcedRate = targetRemain;
      }
      onChangeRate(calcedRate, id);
    }
  };

  useEffect(() => {
    setStartIndex(selectedPage * 5);
    setEndIndex(selectedPage * 5 + 5);
  }, [selectedPage]);

  return (
    <Table className="pagingTable" size="sm">
      <Thead>
        <Tr>
          <Th w="5%" />
          <Th w="25%">名前</Th>
          <Th w="10%">個数</Th>
          <Th w="25%">残量</Th>
          <Th w="25%">使用量</Th>
        </Tr>
      </Thead>
      <Tbody>
        { cookingStocks.slice(startIndex, endIndex).map((cookingStock) => {
          return (
            <Tr key={cookingStock.id}>
              <Td>
                <Checkbox
                  onChange={ (e) => { onClickCheckbox(e, cookingStock.id); }}
                  isChecked={checkStockIdArray.includes(cookingStock.id)}
                />
              </Td>
              <Td>{cookingStock.name}</Td>
              <Td>{`${cookingStock.quantity}個`}</Td>
              <Td>{`${cookingStock.remain}%`}</Td>
              <Td>
                <HStack gap={1}>
                  <InputGroup size="xs">
                    <DefaultTextInput
                      type="number"
                      variant="filled"
                      value={cookingStock.rate}
                      onChange={ (e) => {
                        onChangeRate(Number(e.target.value), cookingStock.id);
                      }}
                      min={0}
                      max={cookingStock.remain}
                    />
                    <InputRightAddon>%</InputRightAddon>
                  </InputGroup>
                  <MinusButton
                    size="xs"
                    aria-label="1個あたりの量をマイナス"
                    onClick={ () => { addRatePerQuantity(cookingStock.id, true); }}
                  />
                  <AddButton
                    size="xs"
                    aria-label="1個あたりの量をプラス"
                    onClick={ () => { addRatePerQuantity(cookingStock.id); }}
                  />
                </HStack>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
});
