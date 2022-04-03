import { memo, VFC } from "react";

import { StockForm } from "./StockForm";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
// import { TFavoriteEat } from "../../../../types/api/TFavoriteEat";

type Props = {
  // favoriteEat?: TFavoriteEat | null;
  isOpen: boolean;
  onClose: () => void;
};

export const StockModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="食材編集"
      modalBody={(
        <StockForm />
      )}
      size="6xl"
    />
  );
});
