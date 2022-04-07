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
import { CommonUseForm } from "../../parts/food/CommonUseForm";
import { DefaultLink } from "../../../atoms/button/DefaultLink";
import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { DeleteButton } from "../../../molecules/button/DeleteButton";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
import { DefaultAlertDialog } from "../../../molecules/layout/DefaultAlertDialog";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { useFavoriteEatApi } from "../../../../hooks/food/useFavoriteEatApi";
import { TFavoriteEat } from "../../../../types/api/TFavoriteEat";

type Props = {
  favoriteEat: Array<TFavoriteEat>;
};

export const FavoriteEatListTable: VFC<Props> = memo((props) => {
  const [openFavoriteEat, setOpenFavoriteEat] = useState<TFavoriteEat | null>(null);
  const [delFavoriteEat, setDelFavoriteEat] = useState<TFavoriteEat | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDataText, setSelectedDataText] = useState("");
  const { favoriteEat } = props;
  const { deleteFavoriteEat, eatFavoriteEat } = useFavoriteEatApi();
  const { successToast, errorToast } = useMessage();
  const {
    isOpen: editModalIsOpen,
    onOpen: editModalOnOpen,
    onClose: editModalOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteAlertIsOpen,
    onOpen: deleteAlertOnOpen,
    onClose: deleteAlertOnClose,
  } = useDisclosure();
  const {
    isOpen: addEatModalIsOpen,
    onOpen: addEatModalOnOpen,
    onClose: addEatModalOnClose,
  } = useDisclosure();

  const onClickFavoriteEatLink = (id: number) => {
    const index = favoriteEat.findIndex((fe) => {
      return fe.id === id;
    });
    setOpenFavoriteEat(favoriteEat[index]);
    setSelectedIndex(index);
    editModalOnOpen();
  };

  const onClickAddEatButton = (id: number) => {
    const index = favoriteEat.findIndex((fe) => {
      return fe.id === id;
    });
    const selectedData = favoriteEat[index];
    setOpenFavoriteEat(selectedData);
    setSelectedDataText(
      `${selectedData.name} ${selectedData.amount_note}`,
    );
    setSelectedIndex(index);
    addEatModalOnOpen();
  };

  const onClickDeleteButton = (id: number) => {
    const index = favoriteEat.findIndex((fe) => {
      return fe.id === id;
    });
    setDelFavoriteEat(favoriteEat[index]);
    setSelectedIndex(index);
    deleteAlertOnOpen();
  };

  const callDeleteFavoriteEat = () => {
    if (delFavoriteEat) {
      deleteFavoriteEat(delFavoriteEat.id)
        .then(() => {
          successToast("データ削除に成功しました");
          favoriteEat.splice(selectedIndex, 1);
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
      <Table className="pagingTable" size="sm">
        <Thead>
          <Tr>
            <Th w="25%">名前</Th>
            <Th w="5%" />
            <Th w="15%">店</Th>
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
                    hoverText="お気に入り食事編集"
                    onClick={() => { onClickFavoriteEatLink(fe.id); }}
                  >
                    {fe.name}
                  </DefaultLink>
                </Td>
                <Td>
                  <DeleteButton
                    hoverText="お気に入り食事削除"
                    onClick={() => { onClickDeleteButton(fe.id); }}
                    aria-label="deleteFavoriteEat"
                    size="xs"
                  />
                </Td>
                <Td>{fe.shop}</Td>
                <Td>{fe.eat_type}</Td>
                <Td>{fe.amount_note}</Td>
                <Td>{`${fe.price}円`}</Td>
                <Td>{`${fe.kcal}kcal`}</Td>
                <Td>{`${fe.amount}${fe.unit || ""}`}</Td>
                <Td>
                  <DefaultButton
                    onClick={() => { onClickAddEatButton(fe.id); }}
                    size="xs"
                    className="primary"
                  >
                    食事登録
                  </DefaultButton>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <FavoriteEatModal
        favoriteEat={openFavoriteEat}
        isOpen={editModalIsOpen}
        onClose={editModalOnClose}
      />
      <DefaultAlertDialog
        isOpen={deleteAlertIsOpen}
        onClose={deleteAlertOnClose}
        onClickYes={() => { callDeleteFavoriteEat(); }}
        dialogHeader="お気に入り食事削除確認"
        dialogBody={`${delFavoriteEat?.name ?? ""}のデータを削除します。よろしいですか`}
      />
      <DefaultModal
        isOpen={addEatModalIsOpen}
        onClose={addEatModalOnClose}
        modalHeader="食事登録"
        modalBody={(
          <CommonUseForm
            id={openFavoriteEat?.id ?? 0}
            useType="eat"
            callFunction={eatFavoriteEat}
            selectedDataText={selectedDataText}
            initName={openFavoriteEat?.registered_name || openFavoriteEat?.name}
            initPrice={openFavoriteEat?.price ?? 0}
            requireName
            requirePrice
          />
        )}
        size="2xl"
      />
    </>
  );
});
