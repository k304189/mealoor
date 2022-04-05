import { memo, VFC } from "react";

import { StockForm } from "./StockForm";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
import { TStock } from "../../../../types/api/TStock";

type Props = {
  stock?: TStock | null;
  isOpen: boolean;
  onClose: () => void;
};

export const StockModal: VFC<Props> = memo((props) => {
  const { stock = null, isOpen, onClose } = props;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="食材編集"
      modalBody={(
        <StockForm stock={stock} />
      )}
      size="6xl"
    />
  );
});
