import { memo, VFC } from "react";

import { FavoriteStockForm } from "./FavoriteStockForm";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
import { TFavoriteStock } from "../../../../types/api/TFavoriteStock";

type Props = {
  favoriteStock?: TFavoriteStock | null;
  isOpen: boolean;
  onClose: () => void;
};

export const FavoriteStockModal: VFC<Props> = memo((props) => {
  const { favoriteStock = null, isOpen, onClose } = props;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="よく買う食材編集"
      modalBody={(
        <FavoriteStockForm favoriteStock={favoriteStock} />
      )}
      size="6xl"
    />
  );
});
