import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { BodyModalButton } from "../../organisms/pages/body/BodyModalButton";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const DashboardPage: VFC = memo(() => {
  return (
    <HeaderLayout>
      <Box h="100%" className="bgMain">
        <p>Dashboardページです</p>
        <BodyModalButton />
      </Box>
    </HeaderLayout>
  );
});
