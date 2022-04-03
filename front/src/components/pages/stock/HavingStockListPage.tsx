import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { StockModalButton } from "../../organisms/pages/stock/StockModalButton";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const HavingStockListPage: VFC = memo(() => {
  return (
    <HeaderLayout title="家にある食材" titleClass="stock">
      <Box p={1} className="bgMain" h="100%">
        <StockModalButton />
      </Box>
    </HeaderLayout>
  );
});
