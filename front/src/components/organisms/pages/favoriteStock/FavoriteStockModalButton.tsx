import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { FavoriteStockModal } from "./FavoriteStockModal";
import { FavoriteStockIconButton } from "../../../molecules/button/FavoriteStockIconButton";

export const FavoriteStockModalButton: VFC = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <FavoriteStockIconButton onClick={onOpen} className="favoriteStock" />
      <FavoriteStockModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
