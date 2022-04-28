import { memo, useEffect, useState, VFC } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";

import { DefaultPaginateButton } from "../../atoms/button/DefaultPaginateButton";
import {
  FavoriteStockModalButton,
} from "../../organisms/pages/favoriteStock/FavoriteStockModalButton";
import { FavoriteStockListTable } from "../../organisms/pages/favoriteStock/FavoriteStockListTable";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { useFavoriteStockApi } from "../../../hooks/food/useFavoriteStockApi";
import { TFavoriteStock } from "../../../types/api/TFavoriteStock";

export const FavoriteStockListPage: VFC = memo(() => {
  const [favoriteStocks, setFavoriteStocks] = useState<Array<TFavoriteStock>>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { getFavoriteStock } = useFavoriteStockApi();

  const callGetFavoriteStock = (page?: number) => {
    let getPage: number;
    if (page) {
      getPage = page + 1;
    } else {
      getPage = 1;
    }
    getFavoriteStock(getPage)
      .then((res) => {
        setFavoriteStocks(res.results);
        setTotalPage(res.total_pages);
      });
  };

  const onPageChange = (page: { selected: number }) => {
    callGetFavoriteStock(page.selected);
  };

  useEffect(() => {
    callGetFavoriteStock();
  }, []);

  return (
    <HeaderLayout title="よく買う食材" titleClass="favoriteStock">
      <Box p={1} className="bgMain" h="100%">
        <Flex>
          <FavoriteStockModalButton
            hoverText="よく買う食材登録"
          />
          <Spacer />
          <DefaultPaginateButton totalPage={totalPage} onPageChange={onPageChange} />
        </Flex>
        { favoriteStocks ? (
          <FavoriteStockListTable favoriteStocks={favoriteStocks} />
        ) : (
          <Box>
            よく買う食材が登録されていません
          </Box>
        )}
      </Box>
    </HeaderLayout>
  );
});
