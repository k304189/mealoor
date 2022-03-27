import { memo, useEffect, useState, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { FavoriteEatModalButton } from "../../organisms/pages/favoriteEat/FavoriteEatModalButton";
import { FavoriteEatListTable } from "../../organisms/pages/favoriteEat/FavoriteEatListTable";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { useFavoriteEatApi } from "../../../hooks/food/useFavoriteEatApi";
import { TFavoriteEatPaginate } from "../../../types/api/TFavoriteEatPaginate";

export const FavoriteEatListPage: VFC = memo(() => {
  const [favoriteEatPaging, setFavoriteEatPaging] = useState<TFavoriteEatPaginate | null>(null);
  const { getFavoriteEat } = useFavoriteEatApi();

  useEffect(() => {
    getFavoriteEat()
      .then((res) => {
        setFavoriteEatPaging(res);
      });
  }, []);

  return (
    <HeaderLayout title="お気に入り食事" titleClass="favoriteEat">
      <Box p={1} className="bgMain" h="100%">
        <FavoriteEatModalButton />
        { favoriteEatPaging ? (
          <FavoriteEatListTable favoriteEat={favoriteEatPaging.results} />
        ) : (
          <Box>
            お気に入り食事が登録されていません
          </Box>
        )}
      </Box>
    </HeaderLayout>
  );
});
