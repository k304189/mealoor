import { memo, ReactNode, VFC } from "react";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  popTrigger: ReactNode;
  popBody: ReactNode;
  popHeader?: ReactNode;
  popFooter?: ReactNode;
};

export const DefaultPopover: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onOpen,
    onClose,
    popTrigger,
    popBody,
    popHeader = (<Box />),
    popFooter = (<Box />),
  } = props;

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={false}
    >
      <PopoverTrigger>{popTrigger}</PopoverTrigger>
      <PopoverContent w="100%">
        <PopoverArrow />
        <PopoverCloseButton data-testid="popoverCloseButton" />
        <PopoverHeader>{popHeader}</PopoverHeader>
        <PopoverBody>{popBody}</PopoverBody>
        <PopoverFooter>{popFooter}</PopoverFooter>
      </PopoverContent>
    </Popover>
  );
});
