import { memo, VFC } from "react";
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import { TFavoriteEat } from "../../../../types/api/TFavoriteEat";

type Props = {
  favoriteEat: Array<TFavoriteEat>;
};

export const FavoriteEatListTable: VFC<Props> = memo((props) => {
  const { favoriteEat } = props;
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>名前</Th>
          <Th>店</Th>
          <Th>食事タイプ</Th>
          <Th>食料タイプ</Th>
          <Th>分量メモ</Th>
          <Th>価格</Th>
          <Th>カロリー</Th>
          <Th>量</Th>
          <Th>食事登録</Th>
        </Tr>
      </Thead>
      <Tbody>
        { favoriteEat.map((fe) => {
          return (
            <Tr key={fe.id}>
              <Td>{fe.name}</Td>
              <Td>{fe.shop}</Td>
              <Td>{fe.eat_type}</Td>
              <Td>{fe.food_type}</Td>
              <Td>{fe.amount_note}</Td>
              <Td>{`${fe.price}円`}</Td>
              <Td>{`${fe.kcal}kcal`}</Td>
              <Td>{`${fe.amount}${fe.unit || ""}`}</Td>
              <Td />
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
});
