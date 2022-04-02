import { memo, VFC } from "react";

import { FavoriteEatForm } from "./FavoriteEatForm";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
import { TFavoriteEat } from "../../../../types/api/TFavoriteEat";

type Props = {
  favoriteEat?: TFavoriteEat | null;
  isOpen: boolean;
  onClose: () => void;
};

export const FavoriteEatModal: VFC<Props> = memo((props) => {
  const { favoriteEat = null, isOpen, onClose } = props;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="お気に入り食事編集"
      modalBody={(
        <FavoriteEatForm favoriteEat={favoriteEat} />
      )}
      size="6xl"
    />
  );
});
