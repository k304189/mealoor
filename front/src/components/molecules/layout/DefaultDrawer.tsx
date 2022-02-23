import { memo, ReactNode, VFC } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  drawerBody: ReactNode;
  drawerHeader?: ReactNode;
  drawerFooter?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  placement?: "left" | "right" | "top" | "bottom";
};

export const DefaultDrawer: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    drawerBody,
    drawerHeader = <Box />,
    drawerFooter = <Box />,
    size = "xs",
    placement = "left",
  } = props;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      placement={placement}
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>{drawerHeader}</DrawerHeader>
        <DrawerCloseButton
          onClose={onClose}
          data-testid="drawerCloseButton"
        />
        <DrawerBody>{drawerBody}</DrawerBody>
        <DrawerFooter>{drawerFooter}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
