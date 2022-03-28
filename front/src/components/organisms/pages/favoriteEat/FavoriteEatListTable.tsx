import { memo, VFC, useState } from "react";
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import { FavoriteEatModal } from "./FavoriteEatModal";
import { DefaultLink } from "../../../atoms/button/DefaultLink";
import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { TFavoriteEat } from "../../../../types/api/TFavoriteEat";

type Props = {
  favoriteEat: Array<TFavoriteEat>;
};

export const FavoriteEatListTable: VFC<Props> = memo((props) => {
  const [openFavoriteEat, setOpenFavoriteEat] = useState<TFavoriteEat | null>(null);
  const { favoriteEat } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickFavoriteEatLink = (id: number) => {
    const index = favoriteEat.findIndex((fe) => {
      return fe.id === id;
    });
    setOpenFavoriteEat(favoriteEat[index]);
    onOpen();
  };

  return (
    <>
      <Table className="pagingTable" size="sm">
        <Thead>
          <Tr>
            <Th w="25%">名前</Th>
            <Th w="20%">店</Th>
            <Th w="10%">食事タイプ</Th>
            <Th w="10%">分量メモ</Th>
            <Th w="10%">価格</Th>
            <Th w="10%">カロリー</Th>
            <Th w="5%">量</Th>
            <Th w="10%">食事登録</Th>
          </Tr>
        </Thead>
        <Tbody>
          { favoriteEat.map((fe) => {
            return (
              <Tr key={fe.id}>
                <Td>
                  <DefaultLink
                    onClick={() => { onClickFavoriteEatLink(fe.id); }}
                  >
                    {fe.name}
                  </DefaultLink>
                </Td>
                <Td>{fe.shop}</Td>
                <Td>{fe.eat_type}</Td>
                <Td>{fe.amount_note}</Td>
                <Td>{`${fe.price}円`}</Td>
                <Td>{`${fe.kcal}kcal`}</Td>
                <Td>{`${fe.amount}${fe.unit || ""}`}</Td>
                <Td><DefaultButton onClick={() => {}} size="xs" className="primary">食事登録</DefaultButton></Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <FavoriteEatModal
        favoriteEat={openFavoriteEat}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
