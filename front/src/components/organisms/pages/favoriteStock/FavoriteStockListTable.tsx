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

import { FavoriteStockModal } from "./FavoriteStockModal";
import { CommonUseForm } from "../../parts/food/CommonUseForm";
import { DefaultLink } from "../../../atoms/button/DefaultLink";
import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { DeleteButton } from "../../../molecules/button/DeleteButton";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
import { DefaultAlertDialog } from "../../../molecules/layout/DefaultAlertDialog";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { useFavoriteStockApi } from "../../../../hooks/food/useFavoriteStockApi";
import { TFavoriteStock } from "../../../../types/api/TFavoriteStock";

type Props = {
  favoriteStocks: Array<TFavoriteStock>;
};

export const FavoriteStockListTable: VFC<Props> = memo((props) => {
  const [openFavoriteStock, setOpenFavoriteStock] = useState<TFavoriteStock | null>(null);
  const [delFavoriteStock, setDelFavoriteStock] = useState<TFavoriteStock | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDataText, setSelectedDataText] = useState("");
  const { favoriteStocks } = props;

  const { deleteFavoriteStock, stockFavoriteStock } = useFavoriteStockApi();
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
    isOpen: addStockModalIsOpen,
    onOpen: addStockModalOnOpen,
    onClose: addStockModalOnClose,
  } = useDisclosure();

  const onClickFavoriteStockLink = (id: number) => {
    const index = favoriteStocks.findIndex((favoriteStock) => {
      return favoriteStock.id === id;
    });
    setOpenFavoriteStock(favoriteStocks[index]);
    setSelectedIndex(index);
    editModalOnOpen();
  };

  const onClickAddStockButton = (id: number) => {
    const index = favoriteStocks.findIndex((favoriteStock) => {
      return favoriteStock.id === id;
    });
    const selectedData = favoriteStocks[index];
    setOpenFavoriteStock(selectedData);
    setSelectedDataText(
      `${selectedData.name} ${selectedData.quantity}個`,
    );
    setSelectedIndex(index);
    addStockModalOnOpen();
  };

  const onClickDeleteButton = (id: number) => {
    const index = favoriteStocks.findIndex((favoriteStock) => {
      return favoriteStock.id === id;
    });
    setDelFavoriteStock(favoriteStocks[index]);
    setSelectedIndex(index);
    deleteAlertOnOpen();
  };

  const callDeleteFavoriteStock = () => {
    if (delFavoriteStock) {
      deleteFavoriteStock(delFavoriteStock.id)
        .then(() => {
          successToast("データ削除に成功しました");
          favoriteStocks.splice(selectedIndex, 1);
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
            <Th w="10%">食材タイプ</Th>
            <Th w="10%">個数</Th>
            <Th w="10%">価格</Th>
            <Th w="10%">カロリー</Th>
            <Th w="5%">量</Th>
            <Th w="10%">食事登録</Th>
          </Tr>
        </Thead>
        <Tbody>
          { favoriteStocks.map((favoriteStock) => {
            return (
              <Tr key={favoriteStock.id}>
                <Td>
                  <DefaultLink
                    hoverText="お気に入り食事編集"
                    onClick={() => { onClickFavoriteStockLink(favoriteStock.id); }}
                  >
                    {favoriteStock.name}
                  </DefaultLink>
                </Td>
                <Td>
                  <DeleteButton
                    hoverText="よく買う食材削除"
                    onClick={() => { onClickDeleteButton(favoriteStock.id); }}
                    aria-label="deleteFavoriteStock"
                    size="xs"
                  />
                </Td>
                <Td>{favoriteStock.shop}</Td>
                <Td>{favoriteStock.food_type}</Td>
                <Td>{`${favoriteStock.quantity}個`}</Td>
                <Td>{`${favoriteStock.price}円`}</Td>
                <Td>{`${favoriteStock.kcal}kcal`}</Td>
                <Td>{`${favoriteStock.amount}${favoriteStock.unit || ""}`}</Td>
                <Td>
                  <DefaultButton
                    onClick={() => { onClickAddStockButton(favoriteStock.id); }}
                    size="xs"
                    className="primary"
                  >
                    食材登録
                  </DefaultButton>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <FavoriteStockModal
        favoriteStock={openFavoriteStock}
        isOpen={editModalIsOpen}
        onClose={editModalOnClose}
      />
      <DefaultAlertDialog
        isOpen={deleteAlertIsOpen}
        onClose={deleteAlertOnClose}
        onClickYes={() => { callDeleteFavoriteStock(); }}
        dialogHeader="よく買う食材削除確認"
        dialogBody={`${delFavoriteStock?.name ?? ""}のデータを削除します。よろしいですか`}
      />
      <DefaultModal
        isOpen={addStockModalIsOpen}
        onClose={addStockModalOnClose}
        modalHeader="食材登録"
        modalBody={(
          <CommonUseForm
            id={openFavoriteStock?.id ?? 0}
            useType="stock"
            callFunction={stockFavoriteStock}
            selectedDataText={selectedDataText}
            initName={openFavoriteStock?.registered_name || openFavoriteStock?.name}
            initPrice={openFavoriteStock?.price ?? 0}
            requireName
            requirePrice
          />
        )}
        size="2xl"
      />
    </>
  );
});
