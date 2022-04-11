import { memo, useEffect, useState, VFC } from "react";
import {
  Box,
  Flex,
  Spacer,
  Table,
  Tbody,
  Thead,
  Td,
  Tr,
  Th,
} from "@chakra-ui/react";

import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { DefaultPaginateButton } from "../../../atoms/button/DefaultPaginateButton";
import { TCookIngredient } from "../../../../types/api/TCookIngredient";
import { useCookApi } from "../../../../hooks/food/useCookApi";
import { useCookIngredientApi } from "../../../../hooks/food/useCookIngredientApi";
import { useMessage } from "../../../../hooks/common/layout/useMessage";

type Props = {
  cookId: number;
  cookName: string;
  remain: number;
}

export const CookIngredientListTable: VFC<Props> = memo((props) => {
  const [cookIngredients, setCookIngredients] = useState<Array<TCookIngredient>>([]);
  const [totalPage, setTotalPage] = useState(0);

  const { cookId, cookName, remain } = props;
  const { cancelCook } = useCookApi();
  const { getCookIngredient } = useCookIngredientApi();
  const { successToast, errorToast } = useMessage();

  const callGetCookIngredient = (id: number, page?: number) => {
    let getPage: number;
    if (page) {
      getPage = page + 1;
    } else {
      getPage = 1;
    }
    getCookIngredient(id, getPage)
      .then((res) => {
        setCookIngredients(res.results);
        setTotalPage(res.total_pages);
      })
      .catch(() => {
        errorToast("食材データの取得に失敗しました");
      });
  };

  const onPageChange = (page: { selected: number }) => {
    callGetCookIngredient(cookId, page.selected);
  };

  const onClickCancelButton = () => {
    cancelCook(cookId)
      .then(() => {
        successToast("料理の取消が完了しました");
      })
      .catch(() => {
        errorToast("料理の取消が失敗しました");
      });
  };

  useEffect(() => {
    callGetCookIngredient(cookId);
  }, []);

  return (
    <>
      <Flex>
        <Box>
          {`料理名：${cookName}`}
        </Box>
        <Spacer />
        <DefaultPaginateButton totalPage={totalPage} onPageChange={onPageChange} />
      </Flex>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>食材名</Th>
            <Th>価格</Th>
            <Th>カロリー</Th>
            <Th>量</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cookIngredients.map((ci) => {
            return (
              <Tr key={ci.id}>
                <Td>{ci.stock.name}</Td>
                <Td>{`${ci.stock.price * (ci.rate / 100)}円`}</Td>
                <Td>{`${ci.stock.kcal * (ci.rate / 100)}kcal`}</Td>
                <Td>{`${ci.stock.amount * (ci.rate / 100)}${ci.stock.unit}`}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex justify="flex-end">
        <DefaultButton
          className="primary"
          onClick={onClickCancelButton}
          disabled={remain !== 100}
          hoverText="残量が100%の時、元の食材データを復活します"
        >
          取消
        </DefaultButton>
      </Flex>
    </>
  );
});
