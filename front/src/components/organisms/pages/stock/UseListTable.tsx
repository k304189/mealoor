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

import { DefaultPaginateButton } from "../../../atoms/button/DefaultPaginateButton";
import { DeleteButton } from "../../../molecules/button/DeleteButton";
import { TUse } from "../../../../types/api/TUse";
import { useUseApi } from "../../../../hooks/food/useUseApi";
import { useMessage } from "../../../../hooks/common/layout/useMessage";

type Props = {
  stockId: number;
  stockName: string;
}

export const UseListTable: VFC<Props> = memo((props) => {
  const [uses, setUses] = useState<Array<TUse>>([]);
  const [totalPage, setTotalPage] = useState(0);

  const { stockId, stockName } = props;
  const { getUse } = useUseApi();
  const { errorToast } = useMessage();

  const callGetUse = (id: number, page?: number) => {
    let getPage: number;
    if (page) {
      getPage = page + 1;
    } else {
      getPage = 1;
    }
    getUse(id, getPage)
      .then((res) => {
        setUses(res.results);
        setTotalPage(res.total_pages);
      })
      .catch(() => {
        errorToast("使用履歴の取得に失敗しました");
      });
  };

  const onPageChange = (page: { selected: number }) => {
    callGetUse(stockId, page.selected);
  };

  useEffect(() => {
    callGetUse(stockId);
  }, []);

  return (
    <>
      <Flex>
        <Box>
          {`食材名：${stockName}`}
        </Box>
        <Spacer />
        <DefaultPaginateButton totalPage={totalPage} onPageChange={onPageChange} />
      </Flex>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="20%">使用日</Th>
            <Th w="15%">使用区分</Th>
            <Th w="10%">使用量</Th>
            <Th w="45%">メモ</Th>
            <Th w="10%" />
          </Tr>
        </Thead>
        <Tbody>
          {uses.map((use) => {
            return (
              <Tr key={use.id}>
                <Td>{use.date}</Td>
                <Td>{use.use_type}</Td>
                <Td>{`${use.rate}%`}</Td>
                <Td>{use.note}</Td>
                <Td>
                  <DeleteButton
                    aria-label="使用履歴を削除"
                    hoverText="使用履歴を削除"
                    onClick={() => {}}
                    size="xs"
                    className="secondary"
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
});
