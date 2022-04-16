import { memo, useEffect, useState, VFC } from "react";
import { Flex } from "@chakra-ui/react";

import { EatTable } from "../eat/EatTable";
import { DefaultPaginateButton } from "../../../atoms/button/DefaultPaginateButton";

import { TEat } from "../../../../types/api/TEat";
// import { TEatPaginate } from "../../../../types/api/TEatPaginate";
import { useEatApi } from "../../../../hooks/food/useEatApi";
import { useMessage } from "../../../../hooks/common/layout/useMessage";

type Props = {
  date: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export const TodayEatListTable: VFC<Props> = memo((props) => {
  const { date, size = "md" } = props;
  const [eats, setEats] = useState<Array<TEat>>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { getDateEats } = useEatApi();
  const { errorToast } = useMessage();

  const callGetDateEat = (page?: number) => {
    let getPage: number;
    if (page) {
      getPage = page + 1;
    } else {
      getPage = 1;
    }
    getDateEats(date, getPage)
      .then((res) => {
        setEats(res.results);
        setTotalPage(res.total_pages);
      })
      .catch(() => {
        errorToast("データの取得に失敗しました");
      });
  };

  const onPageChange = (page: { selected: number }) => {
    callGetDateEat(page.selected);
  };

  useEffect(() => {
    callGetDateEat();
  }, []);

  return (
    <>
      <Flex justify="flex-end">
        <DefaultPaginateButton
          totalPage={totalPage}
          onPageChange={onPageChange}
        />
      </Flex>
      <EatTable
        eats={eats}
        size={size}
      />
    </>
  );
});
