import { memo, VFC } from "react";
import { Flex } from "@chakra-ui/react";

import { HeaderButton } from "../../atoms/button/HeaderButton";

export const Header: VFC = memo(() => {
  return (
    <Flex
      as="header"
      className="systemHeader"
      align="center"
      justify="space-between"
    >
      <HeaderButton px={2} onClick={() => { console.log("logo Click!"); }}>
        システムロゴ
      </HeaderButton>
      <Flex h="100%">
        <HeaderButton px={2} onClick={ () => { console.log("Sign In Click!"); } }>
          サインアップ
        </HeaderButton>
        <HeaderButton px={2} onClick={ () => { console.log("sign Up Click!"); } }>
          サインイン
        </HeaderButton>
      </Flex>
    </Flex>
  );
});
