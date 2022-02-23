import { memo, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Flex, useDisclosure } from "@chakra-ui/react";

import { MenuDrawer } from "./MenuDrawer";
import { SignModal } from "../../pages/account/SignModal";
import { HeaderButton } from "../../../atoms/button/HeaderButton";
import { HamburgerButton } from "../../../molecules/button/HamburgerButton";
import { HeaderAccountMenu } from "../../../molecules/layout/HeaderAccountMenu";
import { useRequestHeader } from "../../../../hooks/common/auth/useRequestHeader";
import { useAuthApi } from "../../../../hooks/common/auth/useAuthApi";
import { useMessage } from "../../../../hooks/common/layout/useMessage";

export const Header: VFC = memo(() => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const {
    isOpen: signIsOpen,
    onOpen: signOnOpen,
    onClose: signOnClose,
  } = useDisclosure();
  const {
    isOpen: menuIsOpen,
    onOpen: menuOnOpen,
    onClose: menuOnClose,
  } = useDisclosure();
  const { hasRequestHeader } = useRequestHeader();
  const { signOut } = useAuthApi();
  const { successToast, errorToast } = useMessage();

  const openSignModal = (signin:boolean) => {
    setIsSignIn(signin);
    signOnOpen();
  };

  const callSignOutApi = () => {
    signOut()
      .then(() => {
        successToast("サインアウトしました");
        navigate("/");
      })
      .catch(() => {
        errorToast("サインアウトに失敗しました");
      });
  };

  const onClickLogo = () => {
    let linkTo = "/";
    if (hasRequestHeader()) {
      linkTo = "/dashboard";
    }
    navigate(linkTo);
  };
  return (
    <Flex
      as="header"
      className="systemHeader"
      align="center"
      justify="space-between"
    >
      <Flex h="100%">
        <Center ml={1}>
          <HamburgerButton
            bg="transparent"
            aria-label="メニューボタン"
            onClick={menuOnOpen}
          />
        </Center>
        <HeaderButton px={2} onClick={onClickLogo}>
          システムロゴ
        </HeaderButton>
      </Flex>
      { hasRequestHeader() ? (
        <Flex h="100%">
          <HeaderAccountMenu signOut={callSignOutApi} />
        </Flex>
      ) : (
        <Flex h="100%">
          <HeaderButton px={2} onClick={() => { openSignModal(false); }}>
            サインアップ
          </HeaderButton>
          <HeaderButton px={2} onClick={() => { openSignModal(true); }}>
            サインイン
          </HeaderButton>
          <SignModal
            isOpen={signIsOpen}
            onClose={signOnClose}
            isSignIn={isSignIn}
          />
        </Flex>
      )}
      <MenuDrawer isOpen={menuIsOpen} onClose={menuOnClose} />
    </Flex>
  );
});
