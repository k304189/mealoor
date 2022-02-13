import { memo, ReactNode, VFC } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  modalBody: ReactNode;
  modalHeader?: string;
  modalFooter?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | "6xl";
};

export const DefaultModal: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    modalBody,
    modalHeader = "",
    modalFooter = <Box />,
    size = "md",
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton data-testid="modalCloseButton" />
        <ModalBody>
          {modalBody}
        </ModalBody>
        <ModalFooter>
          {modalFooter}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
