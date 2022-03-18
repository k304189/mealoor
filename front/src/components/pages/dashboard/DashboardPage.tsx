import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { FoodCategorySelect } from "../../molecules/form/FoodCategorySelect";
import { FoodUnitSelect } from "../../molecules/form/FoodUnitSelect";
import { DefaultSelect } from "../../atoms/form/DefaultSelect";
import { FoodCategoryPop } from "../../organisms/parts/layout/FoodCategoryPop";
import { BodyModalButton } from "../../organisms/pages/body/BodyModalButton";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const DashboardPage: VFC = memo(() => {
  return (
    <HeaderLayout>
      <Box h="100%" className="bgMain">
        <p>Dashboardページです</p>
        <BodyModalButton />
        <FoodCategorySelect size="xs" />
        <FoodUnitSelect size="xs" />
        <DefaultSelect size="xs" />
        <FoodCategoryPop />
      </Box>
    </HeaderLayout>
  );
});
