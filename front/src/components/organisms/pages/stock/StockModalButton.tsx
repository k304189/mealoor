import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { StockModal } from "./StockModal";
import { StockIconButton } from "../../../molecules/button/StockIconButton";

export const StockModalButton: VFC = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <StockIconButton onClick={onOpen} className="stock" />
      <StockModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
