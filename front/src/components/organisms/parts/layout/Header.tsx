import { memo, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, useDisclosure } from "@chakra-ui/react";

import { SignModal } from "../../pages/account/SignModal";
import { HeaderButton } from "../../../atoms/button/HeaderButton";
import { HeaderAccountMenu } from "../../../molecules/layout/HeaderAccountMenu";
import { useRequestHeader } from "../../../../hooks/common/auth/useRequestHeader";
import { useMessage } from "../../../../hooks/common/layout/useMessage";

export const Header: VFC = memo(() => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasRequestHeader, clearRequestHeader } = useRequestHeader();
  const { successToast } = useMessage();

  const openSignModal = (signin:boolean) => {
    setIsSignIn(signin);
    onOpen();
  };

  const signOut = () => {
    clearRequestHeader();
    successToast("サインアウトしました");
    navigate("/");
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
      <HeaderButton px={2} onClick={onClickLogo}>
        システムロゴ
      </HeaderButton>
      { hasRequestHeader() ? (
        <Flex h="100%">
          <HeaderAccountMenu signOut={signOut} />
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
            isOpen={isOpen}
            onClose={onClose}
            isSignIn={isSignIn}
          />
        </Flex>
      )}
    </Flex>
  );
});
