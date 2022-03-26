import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { FavoriteEatModal } from "./FavoriteEatModal";
import { FavoriteEatIconButton } from "../../../molecules/button/FavoriteEatIconButton";

export const FavoriteEatModalButton: VFC = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <FavoriteEatIconButton onClick={onOpen} />
      <FavoriteEatModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
