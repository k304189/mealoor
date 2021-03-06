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
      `${selectedData.name} ${selectedData.quantity}???`,
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
          successToast("????????????????????????????????????");
          favoriteStocks.splice(selectedIndex, 1);
        })
        .catch(() => {
          errorToast("????????????????????????????????????");
        })
        .finally(() => {
          deleteAlertOnClose();
        });
    } else {
      errorToast("?????????????????????????????????????????????");
    }
  };

  return (
    <>
      <Table className="pagingTable" size="sm">
        <Thead>
          <Tr>
            <Th w="25%">??????</Th>
            <Th w="5%" />
            <Th w="15%">???</Th>
            <Th w="10%">???????????????</Th>
            <Th w="10%">??????</Th>
            <Th w="10%">??????</Th>
            <Th w="10%">????????????</Th>
            <Th w="5%">???</Th>
            <Th w="10%">????????????</Th>
          </Tr>
        </Thead>
        <Tbody>
          { favoriteStocks.map((favoriteStock) => {
            return (
              <Tr key={favoriteStock.id}>
                <Td>
                  <DefaultLink
                    hoverText="???????????????????????????"
                    onClick={() => { onClickFavoriteStockLink(favoriteStock.id); }}
                  >
                    {favoriteStock.name}
                  </DefaultLink>
                </Td>
                <Td>
                  <DeleteButton
                    hoverText="????????????????????????"
                    onClick={() => { onClickDeleteButton(favoriteStock.id); }}
                    aria-label="deleteFavoriteStock"
                    className="secondary"
                    size="xs"
                  />
                </Td>
                <Td>{favoriteStock.shop}</Td>
                <Td>{favoriteStock.food_type}</Td>
                <Td>{`${favoriteStock.quantity}???`}</Td>
                <Td>{`${favoriteStock.price}???`}</Td>
                <Td>{`${favoriteStock.kcal}kcal`}</Td>
                <Td>{`${favoriteStock.amount}${favoriteStock.unit || ""}`}</Td>
                <Td>
                  <DefaultButton
                    onClick={() => { onClickAddStockButton(favoriteStock.id); }}
                    size="xs"
                    className="primary"
                  >
                    ????????????
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
        dialogHeader="??????????????????????????????"
        dialogBody={`${delFavoriteStock?.name ?? ""}??????????????????????????????????????????????????????`}
      />
      <DefaultModal
        isOpen={addStockModalIsOpen}
        onClose={addStockModalOnClose}
        modalHeader="????????????"
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
