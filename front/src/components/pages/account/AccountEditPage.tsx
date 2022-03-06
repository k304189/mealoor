import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { AccountForm } from "../../organisms/pages/account/AccountForm";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const AccountEditPage: VFC = memo(() => {
  return (
    <HeaderLayout title="アカウント" titleClass="account">
      <Box className="bgMain" h="100%">
        <AccountForm />
      </Box>
    </HeaderLayout>
  );
});
