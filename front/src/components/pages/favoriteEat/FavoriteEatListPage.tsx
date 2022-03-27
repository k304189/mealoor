import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { FavoriteEatModalButton } from "../../organisms/pages/favoriteEat/FavoriteEatModalButton";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const FavoriteEatListPage: VFC = memo(() => {
  return (
    <HeaderLayout title="お気に入り食事" titleClass="favoriteEat">
      <Box p={1} className="bgMain" h="100%">
        <FavoriteEatModalButton />
      </Box>
    </HeaderLayout>
  );
});
