import { memo, VFC } from "react";
import { Box, Text } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";

export const DashboardPage: VFC = memo(() => {
  return (
    <HeaderLayout>
      <Box h="100%" className="bgMain">
        <p>Dashboardページです</p>
        <Text size="xl" color="#FFAA00">mealoor</Text>
      </Box>
    </HeaderLayout>
  );
});
