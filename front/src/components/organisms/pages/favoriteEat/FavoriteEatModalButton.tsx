import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { FavoriteEatModal } from "./FavoriteEatModal";
import { FavoriteEatIconButton } from "../../../molecules/button/FavoriteEatIconButton";

type Props = {
  hoverText?: string;
};

export const FavoriteEatModalButton: VFC<Props> = memo((props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { hoverText = "" } = props;

  return (
    <>
      <FavoriteEatIconButton
        onClick={onOpen}
        className="favoriteEat"
        hoverText={hoverText}
      />
      <FavoriteEatModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
