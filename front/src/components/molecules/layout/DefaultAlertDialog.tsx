import React, { memo, ReactNode, useState, VFC } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  HStack,
} from "@chakra-ui/react";

import { DefaultButton } from "../../atoms/button/DefaultButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickYes: () => void;
  dialogBody: ReactNode;
  dialogHeader?: ReactNode;
  yesButtonText?: string;
  noButtonText?: string;
};

export const DefaultAlertDialog: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    onClickYes,
    dialogBody,
    dialogHeader = (<Box />),
    yesButtonText = "はい",
    noButtonText = "いいえ",
  } = props;
  const cancelRef = React.useRef(null);
  const [yesButtonLoading, setYesButtonLoading] = useState(false);

  const yesFunction = () => {
    setYesButtonLoading(true);
    try {
      onClickYes();
    } finally {
      setYesButtonLoading(false);
    }
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      autoFocus={false}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{dialogHeader}</AlertDialogHeader>
        <AlertDialogBody>
          {dialogBody}
        </AlertDialogBody>
        <AlertDialogFooter>
          <HStack spacing="10px">
            <DefaultButton
              onClick={onClose}
              className="no"
            >
              {noButtonText}
            </DefaultButton>
            <DefaultButton
              onClick={yesFunction}
              className="primary"
              loading={yesButtonLoading}
            >
              {yesButtonText}
            </DefaultButton>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
