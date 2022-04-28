import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { FavoriteStockModal } from "./FavoriteStockModal";
import { FavoriteStockIconButton } from "../../../molecules/button/FavoriteStockIconButton";

type Props = {
  hoverText?: string;
};

export const FavoriteStockModalButton: VFC<Props> = memo((props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { hoverText = "" } = props;

  return (
    <>
      <FavoriteStockIconButton
        onClick={onOpen}
        className="favoriteStock"
        hoverText={hoverText}
      />
      <FavoriteStockModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
