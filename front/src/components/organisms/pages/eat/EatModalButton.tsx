import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { EatModal } from "./EatModal";
import { EatIconButton } from "../../../molecules/button/EatIconButton";

export const EatModalButton: VFC = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <EatIconButton onClick={onOpen} />
      <EatModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
