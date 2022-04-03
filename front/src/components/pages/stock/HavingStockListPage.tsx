import { memo, useEffect, useState, VFC } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";

import { DefaultPaginateButton } from "../../atoms/button/DefaultPaginateButton";
import { StockModalButton } from "../../organisms/pages/stock/StockModalButton";
import { StockListTable } from "../../organisms/pages/stock/StockListTable";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { useStockApi } from "../../../hooks/food/useStockApi";
import { useMessage } from "../../../hooks/common/layout/useMessage";
import { TStock } from "../../../types/api/TStock";

export const HavingStockListPage: VFC = memo(() => {
  const [stocks, setStocks] = useState<Array<TStock>>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { getStock } = useStockApi();
  const { errorToast } = useMessage();

  const callGetStock = (page?: number) => {
    let getPage: number;
    if (page) {
      getPage = page + 1;
    } else {
      getPage = 1;
    }
    getStock(getPage)
      .then((res) => {
        setStocks(res.results);
        setTotalPage(res.total_pages);
      })
      .catch(() => {
        errorToast("データの取得に失敗しました");
      });
  };

  const onPageChange = (page: { selected: number }) => {
    callGetStock(page.selected);
  };

  useEffect(() => {
    callGetStock();
  }, []);

  return (
    <HeaderLayout title="家にある食材" titleClass="stock">
      <Box p={1} className="bgMain" h="100%">
        <Flex>
          <StockModalButton />
          <Spacer />
          <DefaultPaginateButton totalPage={totalPage} onPageChange={onPageChange} />
        </Flex>
        { stocks ? (
          <StockListTable stocks={stocks} />
        ) : (
          <Box>
            食材が登録されていません。
          </Box>
        )}
      </Box>
    </HeaderLayout>
  );
});
