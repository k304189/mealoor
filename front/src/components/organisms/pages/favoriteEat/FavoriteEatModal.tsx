import { memo, VFC } from "react";

import { FavoriteEatForm } from "./FavoriteEatForm";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const FavoriteEatModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="お気に入り食事編集"
      modalBody={(
        <FavoriteEatForm />
      )}
      size="6xl"
    />
  );
});
