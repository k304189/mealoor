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
      umHeader = "????????????";
    } else if (utype === "divide") {
      umHeader = "????????????";
    } else if (utype === "eat") {
      umHeader = "????????????";
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
    return Math.ceil((limitTime - now) / (1000 * 60 * 60 * 24));
  };

  const getLimitClassName = (limit: string): string => {
    const diffTime = calcLimitMinusNow(limit);
    let className = "";
    if (diffTime <= -1) {
      className = "limitExpired";
    } else if (diffTime > -1 && diffTime <= 0) {
      className = "limitToday";
    } else if (diffTime > 0 && diffTime <= 3) {
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
      hoverText = "????????????????????????";
      ariaLabel = "??????????????????";
      icon = (<NotAllowedIcon />);
    } else if (className === "limitToday") {
      hoverText = "?????????????????????????????????";
      ariaLabel = "???????????????????????????";
      icon = (<WarningIcon />);
    } else if (className === "limitWarning") {
      hoverText = "???????????????5?????????????????????";
      ariaLabel = "?????????????????????";
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
            <Th w="25%">??????</Th>
            <Th w="3%" />
            <Th w="15%">????????????</Th>
            <Th w="10%">???????????????</Th>
            <Th w="10%">??????</Th>
            <Th w="10%">????????????</Th>
            <Th w="5%">???</Th>
            <Th w="10%">??????</Th>
            <Th w="10%">????????????</Th>
          </Tr>
        </Thead>
        <Tbody>
          { stocks.map((stock) => {
            return (
              <Tr key={stock.id} className={ getLimitClassName(stock.limit) }>
                <Td>{ getLimitAlertIcon(stock.limit) }</Td>
                <Td>
                  <DefaultLink
                    hoverText="????????????"
                    onClick={() => { onClickStockLink(stock.id); }}
                  >
                    {stock.name}
                  </DefaultLink>
                </Td>
                <Td>
                  <HStack gap={1} align="right">
                    <UseIconButton
                      className="secondary"
                      aria-label="?????????????????????"
                      onClick={() => { onClickUseHistoryButton(stock.id); }}
                      size="xs"
                      hoverText="?????????????????????"
                    />
                    {(stock.eat_type === "??????" && stock.food_type === "??????") ? (
                      <IngredientIconButton
                        className="secondary"
                        aria-label="?????????????????????"
                        onClick={() => { onClickCookIngredientButton(stock.id); }}
                        size="xs"
                        hoverText="????????????????????????????????????"
                      />
                    ) : (
                      <></>
                    )}
                  </HStack>
                </Td>
                <Td>{stock.limit}</Td>
                <Td>{stock.food_type}</Td>
                <Td>{`${stock.price}???`}</Td>
                <Td>{`${stock.kcal}kcal`}</Td>
                <Td>{`${stock.amount}${stock.unit || ""}`}</Td>
                <Td>{`${stock.remain}%`}</Td>
                <Td>
                  <HStack gap={3}>
                    <DeleteButton
                      hoverText="?????????????????????????????????"
                      className="secondary"
                      onClick={() => { onClickUseButton("trash", stock.id); }}
                      aria-label="??????????????????"
                      size="xs"
                    />
                    <DivideIconButton
                      hoverText="??????????????????????????????????????????????????????"
                      className="secondary"
                      onClick={() => { onClickUseButton("divide", stock.id); }}
                      aria-label="??????????????????"
                      size="xs"
                    />
                    <EatIconButton
                      hoverText="??????????????????????????????????????????????????????"
                      className="secondary"
                      onClick={() => { onClickUseButton("eat", stock.id); }}
                      aria-label="??????????????????"
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
        modalHeader="??????????????????"
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
        modalHeader="????????????"
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
