import { memo, useEffect, useState, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { DefaultPaginateButton } from "../../atoms/button/DefaultPaginateButton";
import { FavoriteEatModalButton } from "../../organisms/pages/favoriteEat/FavoriteEatModalButton";
import { FavoriteEatListTable } from "../../organisms/pages/favoriteEat/FavoriteEatListTable";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { useFavoriteEatApi } from "../../../hooks/food/useFavoriteEatApi";
import { TFavoriteEat } from "../../../types/api/TFavoriteEat";

export const FavoriteEatListPage: VFC = memo(() => {
  const [favoriteEats, setFavoriteEats] = useState<Array<TFavoriteEat>>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { getFavoriteEat } = useFavoriteEatApi();

  const callGetFavoriteEat = (page?: number) => {
    let getPage: number;
    if (page) {
      getPage = page + 1;
    } else {
      getPage = 1;
    }
    getFavoriteEat(getPage)
      .then((res) => {
        setFavoriteEats(res.results);
        setTotalPage(res.total_pages);
      });
  };

  const onPageChange = (page: { selected: number }) => {
    callGetFavoriteEat(page.selected);
  };

  useEffect(() => {
    callGetFavoriteEat();
  }, []);

  return (
    <HeaderLayout title="お気に入り食事" titleClass="favoriteEat">
      <Box p={1} className="bgMain" h="100%">
        <FavoriteEatModalButton />
        <DefaultPaginateButton totalPage={totalPage} onPageChange={onPageChange} />
        { favoriteEats ? (
          <FavoriteEatListTable favoriteEat={favoriteEats} />
        ) : (
          <Box>
            お気に入り食事が登録されていません
          </Box>
        )}
      </Box>
    </HeaderLayout>
  );
});
