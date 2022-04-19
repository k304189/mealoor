import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { BodyModal } from "./BodyModal";
import { BodyIconButton } from "../../../molecules/button/BodyIconButton";

type Props = {
  hoverText?: string;
};

export const BodyModalButton: VFC<Props> = memo((props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { hoverText = "" } = props;

  return (
    <>
      <BodyIconButton
        onClick={onOpen}
        className="body"
        hoverText={hoverText}
      />
      <BodyModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
