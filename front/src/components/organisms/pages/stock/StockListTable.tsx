import { memo, VFC, useState } from "react";
import {
  HStack,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import { StockModal } from "./StockModal";
import { DefaultLink } from "../../../atoms/button/DefaultLink";
import { DeleteButton } from "../../../molecules/button/DeleteButton";
import { EatIconButton } from "../../../molecules/button/EatIconButton";
import { DivideIconButton } from "../../../molecules/button/DivideIconButton";
import { TStock } from "../../../../types/api/TStock";

type Props = {
  stocks: Array<TStock>;
};

export const StockListTable: VFC<Props> = memo((props) => {
  const [openStock, setOpenStock] = useState<TStock | null>(null);
  const { stocks } = props;
  const {
    isOpen: editModalIsOpen,
    onOpen: editModalOnOpen,
    onClose: editModalOnClose,
  } = useDisclosure();

  const onClickStockLink = (id: number) => {
    const index = stocks.findIndex((s) => {
      return s.id === id;
    });
    setOpenStock(stocks[index]);
    editModalOnOpen();
  };

  return (
    <>
      <Table className="pagingTable" size="sm">
        <Thead>
          <Tr>
            <Th w="25%">名前</Th>
            <Th w="15%">賞味期限</Th>
            <Th w="10%">食料タイプ</Th>
            <Th w="10%">価格</Th>
            <Th w="10%">カロリー</Th>
            <Th w="5%">量</Th>
            <Th w="10%">残量</Th>
            <Th w="15%">食材編集</Th>
          </Tr>
        </Thead>
        <Tbody>
          { stocks.map((stock) => {
            return (
              <Tr key={stock.id}>
                <Td>
                  <DefaultLink
                    hoverText="食材編集"
                    onClick={() => { onClickStockLink(stock.id); }}
                  >
                    {stock.name}
                  </DefaultLink>
                </Td>
                <Td>{stock.limit}</Td>
                <Td>{stock.food_type}</Td>
                <Td>{`${stock.price}円`}</Td>
                <Td>{`${stock.kcal}kcal`}</Td>
                <Td>{`${stock.amount}${stock.unit || ""}`}</Td>
                <Td>{`${stock.remain}%`}</Td>
                <Td>
                  <HStack gap={3}>
                    <DeleteButton
                      hoverText="対象の食材を処分します"
                      className="secondary"
                      onClick={() => {}}
                      aria-label="食材を捨てる"
                      size="xs"
                    />
                    <DivideIconButton
                      hoverText="対象の食材から食材データを分割します"
                      className="secondary"
                      onClick={() => {}}
                      aria-label="食材を分ける"
                      size="xs"
                    />
                    <EatIconButton
                      hoverText="対象の食材から食事データを登録します"
                      className="secondary"
                      onClick={() => {}}
                      aria-label="食材を食べる"
                      size="xs"
                    />
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <StockModal
        stock={openStock}
        isOpen={editModalIsOpen}
        onClose={editModalOnClose}
      />
    </>
  );
});
