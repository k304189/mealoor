import { ChangeEvent, memo, VFC } from "react";
import {
  Checkbox,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import { TStock } from "../../../../types/api/TStock";

type Props = {
  havingStocks: Array<TStock>;
  onClickCheckbox: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  checkStockIdArray: Array<number>;
};

export const HavingStockTable: VFC<Props> = memo((props) => {
  const { havingStocks, onClickCheckbox, checkStockIdArray } = props;

  return (
    <Table className="pagingTable" size="sm">
      <Thead>
        <Tr>
          <Th w="2%" />
          <Th w="25%">名前</Th>
          <Th w="20%">賞味期限</Th>
          <Th w="18%">価格</Th>
          <Th w="20%">カロリー</Th>
          <Th w="15%">残量</Th>
        </Tr>
      </Thead>
      <Tbody>
        { havingStocks.map((havingStock) => {
          return (
            <Tr key={havingStock.id}>
              <Td>
                <Checkbox
                  onChange={ (e) => { onClickCheckbox(e, havingStock.id); }}
                  isChecked={checkStockIdArray.includes(havingStock.id)}
                />
              </Td>
              <Td>{havingStock.name}</Td>
              <Td>{havingStock.limit}</Td>
              <Td>{`${havingStock.price}円`}</Td>
              <Td>{`${havingStock.kcal}kcal`}</Td>
              <Td>{`${havingStock.remain}%`}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
});
