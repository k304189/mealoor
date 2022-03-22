import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { BodyModalButton } from "../../organisms/pages/body/BodyModalButton";
import { EatModalButton } from "../../organisms/pages/eat/EatModalButton";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const DashboardPage: VFC = memo(() => {
  return (
    <HeaderLayout>
      <Box h="100%" className="bgMain">
        <p>Dashboardページです</p>
        <BodyModalButton />
        <EatModalButton />
      </Box>
    </HeaderLayout>
  );
});
