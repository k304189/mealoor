import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { BodyModal } from "./BodyModal";
import { BodyIconButton } from "../../../molecules/button/BodyIconButton";

export const BodyModalButton: VFC = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <BodyIconButton onClick={onOpen} />
      <BodyModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
