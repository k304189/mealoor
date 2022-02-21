import { memo, VFC } from "react";
import { Box, Center } from "@chakra-ui/react";

import { DefaultAvatar } from "../../atoms/display/DefaultAvatar";
import { useSignInAccount } from "../../../hooks/common/auth/useSignInAccount";

export const AvatarUsername: VFC = memo(() => {
  const { getSignInUsername } = useSignInAccount();
  const username = getSignInUsername();
  return (
    <Center>
      <DefaultAvatar />
      <Box ml={2}>{username}</Box>
    </Center>
  );
});
