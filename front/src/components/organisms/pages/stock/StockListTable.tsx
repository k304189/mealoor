import { memo, VFC, ReactElement, useState } from "react";
import {
  HStack,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { BellIcon, WarningIcon, NotAllowedIcon } from "@chakra-ui/icons";

import { StockModal } from "./StockModal";
import { CookIngredientListTable } from "./CookIngredientListTable";
import { UseListTable } from "./UseListTable";
import { CommonUseForm } from "../../parts/food/CommonUseForm";
import { DefaultLink } from "../../../atoms/button/DefaultLink";
import { DefaultIconButton } from "../../../atoms/button/DefaultIconButton";
import { DeleteButton } from "../../../molecules/button/DeleteButton";
import { EatIconButton } from "../../../molecules/button/EatIconButton";
import { IngredientIconButton } from "../../../molecules/button/IngredientIconButton";
import { UseIconButton } from "../../../molecules/button/UseIconButton";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
import { DivideIconButton } from "../../../molecules/button/DivideIconButton";
import { useStockApi } from "../../../../hooks/food/useStockApi";
import { TStock } from "../../../../types/api/TStock";

type Props = {
  stocks: Array<TStock>;
};

export const StockListTable: VFC<Props> = memo((props) => {
  const [openStock, setOpenStock] = useState<TStock | null>(null);
  const [useModalHeader, setUseModalHeader] = useState("");
  const [useType, setUseType] = useState<"trash" | "divide" | "eat">("trash");
  const { stocks } = props;
  const {
    isOpen: editModalIsOpen,
    onOpen: editModalOnOpen,
    onClose: editModalOnClose,
  } = useDisclosure();
  const {
    isOpen: useModalIsOpen,
    onOpen: useModalOnOpen,
    onClose: useModalOnClose,
  } = useDisclosure();
  const {
    isOpen: ingredientModalIsOpen,
    onOpen: ingredientModalOnOpen,
    onClose: ingredientModalOnClose,
  } = useDisclosure();
  const {
    isOpen: useHistoryModalIsOpen,
    onOpen: useHistoryModalOnOpen,
    onClose: useHistoryModalOnClose,
  } = useDisclosure();
  const { useStock } = useStockApi();

  const onClickStockLink = (id: number) => {
    const index = stocks.findIndex((s) => {
      return s.id === id;
    });
    setOpenStock(stocks[index]);
    editModalOnOpen();
  };

  const onClickCookIngredientButton = (id: number) => {
    const index = stocks.findIndex((s) => {
      return s.id === id;
    });
    setOpenStock(stocks[index]);
    ingredientModalOnOpen();
  };

  const onClickUseHistoryButton = (id: number) => {
    const index = stocks.findIndex((s) => {
      return s.id === id;
    });
    setOpenStock(stocks[index]);
    useHistoryModalOnOpen();
  };

  const onClickUseButton = (utype: "trash" | "divide" | "eat", id: number) => {
    let umHeader: string = "";
    if (utype === "trash") {
      umHeader = "食材処分";
    } else if (utype === "divide") {
      umHeader = "食材分割";
    } else if (utype === "eat") {
      umHeader = "食事登録";
    }
    const index = stocks.findIndex((s) => {
      return s.id === id;
    });
    setOpenStock(stocks[index]);
    setUseType(utype);
    setUseModalHeader(umHeader);
    useModalOnOpen();
  };

  const calcLimitMinusNow = (limit: string): number => {
    const now = new Date().getTime();
    const limitTime = Date.parse(limit);
    return (limitTime - now) / (1000 * 60 * 60 * 24);
  };

  const getLimitClassName = (limit: string): string => {
    const diffTime = calcLimitMinusNow(limit);
    let className = "";
    if (diffTime < -1) {
      className = "limitExpired";
    } else if (diffTime >= -1 && diffTime < 0) {
      className = "limitToday";
    } else if (diffTime >= 0 && diffTime < 4) {
      className = "limitWarning";
    }
    return className;
  };

  const getLimitAlertIcon = (limit: string): ReactElement => {
    const className = getLimitClassName(limit);
    let alert: ReactElement = (<></>);
    let icon: ReactElement = (<></>);
    let hoverText = "";
    let ariaLabel = "";
    if (className === "limitExpired") {
      hoverText = "賞味期限切れです";
      ariaLabel = "賞味期限切れ";
      icon = (<NotAllowedIcon />);
    } else if (className === "limitToday") {
      hoverText = "賞味期限が今日までです";
      ariaLabel = "賞味期限が今日まで";
      icon = (<WarningIcon />);
    } else if (className === "limitWarning") {
      hoverText = "賞味期限が5日を切りました";
      ariaLabel = "賞味期限が近い";
      icon = (<BellIcon />);
    }

    if (className) {
      alert = (
        <DefaultIconButton
          className="limitIcon"
          hoverText={hoverText}
          aria-label={ariaLabel}
          icon={icon}
          size="xs"
        />
      );
    }
    return alert;
  };

  return (
    <>
      <Table className="pagingTable" size="sm">
        <Thead>
          <Tr>
            <Th w="2%" />
            <Th w="25%">名前</Th>
            <Th w="3%" />
            <Th w="15%">賞味期限</Th>
            <Th w="10%">食料タイプ</Th>
            <Th w="10%">価格</Th>
            <Th w="10%">カロリー</Th>
            <Th w="5%">量</Th>
            <Th w="10%">残量</Th>
            <Th w="10%">食材編集</Th>
          </Tr>
        </Thead>
        <Tbody>
          { stocks.map((stock) => {
            return (
              <Tr key={stock.id} className={ getLimitClassName(stock.limit) }>
                <Td>{ getLimitAlertIcon(stock.limit) }</Td>
                <Td>
                  <DefaultLink
                    hoverText="食材編集"
                    onClick={() => { onClickStockLink(stock.id); }}
                  >
                    {stock.name}
                  </DefaultLink>
                </Td>
                <Td>
                  <HStack gap={1} align="right">
                    <UseIconButton
                      className="secondary"
                      aria-label="使用履歴を表示"
                      onClick={() => { onClickUseHistoryButton(stock.id); }}
                      size="xs"
                      hoverText="使用履歴を表示"
                    />
                    {(stock.eat_type === "自炊" && stock.food_type === "料理") ? (
                      <IngredientIconButton
                        className="secondary"
                        aria-label="使用材料を表示"
                        onClick={() => { onClickCookIngredientButton(stock.id); }}
                        size="xs"
                        hoverText="料理に使用した食材を表示"
                      />
                    ) : (
                      <></>
                    )}
                  </HStack>
                </Td>
                <Td>{stock.limit}</Td>
                <Td>{stock.food_type}</Td>
                <Td>{`${stock.price}円`}</Td>
                <Td>{`${stock.kcal}kcal`}</Td>
                <Td>{`${stock.amount}${stock.unit || ""}`}</Td>
                <Td>{`${stock.remain}%`}</Td>
                <Td>
                  <HStack gap={3}>
                    <DeleteButton
                      hoverText="対象の食材を処分します"
                      className="secondary"
                      onClick={() => { onClickUseButton("trash", stock.id); }}
                      aria-label="食材を捨てる"
                      size="xs"
                    />
                    <DivideIconButton
                      hoverText="対象の食材から食材データを分割します"
                      className="secondary"
                      onClick={() => { onClickUseButton("divide", stock.id); }}
                      aria-label="食材を分ける"
                      size="xs"
                    />
                    <EatIconButton
                      hoverText="対象の食材から食事データを登録します"
                      className="secondary"
                      onClick={() => { onClickUseButton("eat", stock.id); }}
                      aria-label="食材を食べる"
                      size="xs"
                    />
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <StockModal
        stock={openStock}
        isOpen={editModalIsOpen}
        onClose={editModalOnClose}
      />
      <DefaultModal
        isOpen={useModalIsOpen}
        onClose={useModalOnClose}
        modalHeader={useModalHeader}
        modalBody={(
          <CommonUseForm
            id={openStock?.id ?? 0}
            useType={useType}
            callFunction={useStock}
            quantity={openStock?.quantity ?? 1}
            maxRate={openStock?.remain ?? 100}
            selectedDataText={openStock?.name ?? ""}
            setUseTypeJson
          />
        )}
        size="xl"
      />
      <DefaultModal
        isOpen={ingredientModalIsOpen}
        onClose={ingredientModalOnClose}
        modalHeader="使用食材一覧"
        modalBody={(
          <CookIngredientListTable
            cookId={openStock?.id ?? 0}
            cookName={openStock?.name ?? ""}
            remain={openStock?.remain ?? 0}
          />
        )}
        size="xl"
      />
      <DefaultModal
        isOpen={useHistoryModalIsOpen}
        onClose={useHistoryModalOnClose}
        modalHeader="使用履歴"
        modalBody={(
          <UseListTable
            stockId={openStock?.id ?? 0}
            stockName={openStock?.name ?? ""}
          />
        )}
        size="3xl"
      />
    </>
  );
});
