import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { StockModal } from "./StockModal";
import { StockIconButton } from "../../../molecules/button/StockIconButton";

type Props = {
  hoverText?: string;
};

export const StockModalButton: VFC<Props> = memo((props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { hoverText = "" } = props;

  return (
    <>
      <StockIconButton
        onClick={onOpen}
        className="stock"
        hoverText={hoverText}
      />
      <StockModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
