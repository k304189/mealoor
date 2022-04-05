import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import {
  FavoriteStockModalButton,
} from "../../organisms/pages/favoriteStock/FavoriteStockModalButton";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const FavoriteStockListPage: VFC = memo(() => {
  return (
    <HeaderLayout title="よく買う食材" titleClass="favoriteStock">
      <Box p={1} className="bgMain" h="100%">
        <FavoriteStockModalButton />
        よく買う食材画面です
      </Box>
    </HeaderLayout>
  );
});
