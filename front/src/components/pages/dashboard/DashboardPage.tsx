import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { BodyIconButton } from "../../molecules/button/BodyIconButton";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const DashboardPage: VFC = memo(() => {
  return (
    <HeaderLayout>
      <Box h="100%" className="bgMain">
        <p>Dashboardページです</p>
        <BodyIconButton onClick={() => {}} />
      </Box>
    </HeaderLayout>
  );
});
