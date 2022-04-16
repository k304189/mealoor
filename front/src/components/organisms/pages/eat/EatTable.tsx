import { memo, useState, VFC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  useDisclosure,
} from "@chakra-ui/react";

import { EatModal } from "./EatModal";
import { DefaultLink } from "../../../atoms/button/DefaultLink";
import { DeleteButton } from "../../../molecules/button/DeleteButton";
import { DefaultAlertDialog } from "../../../molecules/layout/DefaultAlertDialog";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { useEatApi } from "../../../../hooks/food/useEatApi";
import { TEat } from "../../../../types/api/TEat";

type Props = {
  eats: Array<TEat>;
  size?: "xs" | "sm" | "md" | "lg";
};

export const EatTable: VFC<Props> = memo((props) => {
  const [openEat, setOpenEat] = useState<TEat | null>(null);
  const [delEat, setDelEat] = useState<TEat | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { eats, size = "md" } = props;
  const {
    isOpen: eatModalIsOpen,
    onOpen: eatModalOnOpen,
    onClose: eatModalOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteAlertIsOpen,
    onOpen: deleteAlertOnOpen,
    onClose: deleteAlertOnClose,
  } = useDisclosure();
  const { deleteEat } = useEatApi();
  const { successToast, errorToast } = useMessage();

  const onClickEatLink = (id: number) => {
    const index = eats.findIndex((e) => {
      return e.id === id;
    });
    setOpenEat(eats[index]);
    eatModalOnOpen();
  };

  const onClickDeleteButton = (id: number) => {
    const index = eats.findIndex((e) => {
      return e.id === id;
    });
    setDelEat(eats[index]);
    setSelectedIndex(index);
    deleteAlertOnOpen();
  };

  const callDeleteEat = () => {
    if (delEat) {
      deleteEat(delEat.id)
        .then(() => {
          successToast("データ削除に成功しました");
          eats.splice(selectedIndex, 1);
        })
        .catch(() => {
          errorToast("データ削除に失敗しました");
        })
        .finally(() => {
          deleteAlertOnClose();
        });
    } else {
      errorToast("削除データの特定に失敗しました");
    }
  };

  return (
    <>
      <Table size={size}>
        <Thead>
          <Tr>
            <Th w="15%">名前</Th>
            <Th w="10%">タイミング</Th>
            <Th w="10%">食事タイプ</Th>
            <Th w="10%">価格</Th>
            <Th w="10%">カロリー</Th>
            <Th w="5%">量</Th>
            <Th w="10%">タンパク質</Th>
            <Th w="10%">脂質</Th>
            <Th w="10%">炭水化物</Th>
            <Th w="5%" />
          </Tr>
        </Thead>
        <Tbody>
          {eats.map((eat) => {
            return (
              <Tr key={eat.id}>
                <Td>
                  <DefaultLink onClick={() => { onClickEatLink(eat.id); }}>
                    {eat.name}
                  </DefaultLink>
                </Td>
                <Td>{eat.eat_timing}</Td>
                <Td>{eat.eat_type}</Td>
                <Td>{`${eat.price}円`}</Td>
                <Td>{`${eat.kcal}kcal`}</Td>
                <Td>{`${eat.amount}${eat.unit || ""}`}</Td>
                <Td>{`${eat.protein}g`}</Td>
                <Td>{`${eat.lipid}g`}</Td>
                <Td>{`${eat.carbo}g`}</Td>
                <Td>
                  <DeleteButton
                    aria-label="食事データを削除"
                    size="xs"
                    className="secondary"
                    onClick={() => { onClickDeleteButton(eat.id); }}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <EatModal
        eat={openEat}
        isOpen={eatModalIsOpen}
        onClose={eatModalOnClose}
      />
      <DefaultAlertDialog
        isOpen={deleteAlertIsOpen}
        onClose={deleteAlertOnClose}
        onClickYes={() => { callDeleteEat(); }}
        dialogHeader="食事削除確認"
        dialogBody={`${delEat?.name ?? ""}のデータを削除します。よろしいですか`}
      />
    </>
  );
});
