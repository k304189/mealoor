import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { EatModal } from "./EatModal";
import { EatIconButton } from "../../../molecules/button/EatIconButton";

type Props = {
  hoverText?: string;
};

export const EatModalButton: VFC<Props> = memo((props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { hoverText = "" } = props;

  return (
    <>
      <EatIconButton
        onClick={onOpen}
        className="eat"
        hoverText={hoverText}
      />
      <EatModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
