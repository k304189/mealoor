import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

import { BodyCompareTable } from "../../organisms/pages/dashboard/BodyCompareTable";
import { EatSummaryRadio } from "../../organisms/pages/dashboard/EatSummaryRadio";
import { EatSummaryCompareTable } from "../../organisms/pages/dashboard/EatSummaryCompareTable";
import { TodayEatListModal } from "../../organisms/pages/dashboard/TodayEatListModal";
import { DefaultButton } from "../../atoms/button/DefaultButton";
import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DefaultAlert } from "../../molecules/display/DefaultAlert";
import { TextForm } from "../../organisms/parts/form/TextForm";
import { BodyModalButton } from "../../organisms/pages/body/BodyModalButton";
import { EatModalButton } from "../../organisms/pages/eat/EatModalButton";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { useDashboardApi } from "../../../hooks/dashboard/useDashboardApi";
import { useMessage } from "../../../hooks/common/layout/useMessage";
import { TBody } from "../../../types/api/TBody";
import { TDashboard } from "../../../types/api/TDashboard";
import { TEatSummary } from "../../../types/api/TEatSummary";

export const DashboardPage: VFC = memo(() => {
  const [date, setDate] = useState("");
  const [dashboardData, setDashboardData] = useState<TDashboard | null>(null);
  const [tableEatSummary, setTableEatSummary] = useState("カロリー");
  const [tableEatSummaryUnit, setTableEatSummaryUnit] = useState("kcal");

  const [beforeBody, setBeforeBody] = useState<TBody | null>(null);
  const [afterBody, setAfterBody] = useState<TBody | null>(null);
  const [beforeEatSummary, setBeforeEatSummary] = useState<TEatSummary | null>(null);
  const [afterEatSummary, setAfterEatSummary] = useState<TEatSummary | null>(null);
  const [warningStockCount, setWarningStockCount] = useState(0);

  const [btnLoading, setBtnLoading] = useState(false);

  const [invalidDate, setInvalidDate] = useState(false);
  const [errorTextDate, setErrorTextDate] = useState("");

  const { getDashboard } = useDashboardApi();
  const { errorToast } = useMessage();

  const {
    isOpen: todayEatListModalIsOpen,
    onClose: todayEatListModalOnClose,
    onOpen: todayEatListModalOnOpen,
  } = useDisclosure();

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onBlurDate = () => {
    let invalid = false;
    let tmpErrorText = "";
    if (!date || date.length <= 0) {
      invalid = true;
      tmpErrorText = "表示日を入力してください";
    }
    setInvalidDate(invalid);
    setErrorTextDate(tmpErrorText);
  };

  const callGetDashboard = (getDate: string) => {
    getDashboard(getDate)
      .then((res) => {
        setDashboardData(res);
      })
      .catch(() => {
        errorToast("データの取得に失敗しました");
      });
  };

  const onClickDateChangeButton = () => {
    setBtnLoading(true);
    callGetDashboard(date);
    setBtnLoading(false);
  };

  const getTableBodyData = (isBefore?: boolean): TBody | null => {
    let idx = -1;
    let bodyData: TBody | null = null;
    if (isBefore) {
      idx = -2;
    }
    if (dashboardData) {
      bodyData = {
        date: dashboardData.label.slice(idx)[0],
        weight: dashboardData.body.weight.slice(idx)[0] ?? 0,
        fat_rate: dashboardData.body.fat_rate.slice(idx)[0] ?? 0,
        fat_weight: dashboardData.body.fat_weight.slice(idx)[0] ?? 0,
      };
    }
    return bodyData;
  };

  const getTableEatSummaryData = (isBefore?: boolean): TEatSummary | null => {
    let idx = -1;
    let eatSummaryData: TEatSummary | null = null;
    if (isBefore) {
      idx = -2;
    }
    if (dashboardData) {
      let tempBreakfastArray: Array<number | null> = dashboardData.eat_summary.kcal.breakfast;
      let tempLunchArray: Array<number | null> = dashboardData.eat_summary.kcal.lunch;
      let tempDinnerArray: Array<number | null> = dashboardData.eat_summary.kcal.dinner;
      let tempSnackArray: Array<number | null> = dashboardData.eat_summary.kcal.snack;

      if (tableEatSummary === "価格") {
        tempBreakfastArray = dashboardData.eat_summary.price.breakfast;
        tempLunchArray = dashboardData.eat_summary.price.lunch;
        tempDinnerArray = dashboardData.eat_summary.price.dinner;
        tempSnackArray = dashboardData.eat_summary.price.snack;
      }

      eatSummaryData = {
        date: dashboardData.label.slice(idx)[0],
        breakfast: tempBreakfastArray.slice(idx)[0],
        lunch: tempLunchArray.slice(idx)[0],
        dinner: tempDinnerArray.slice(idx)[0],
        snack: tempSnackArray.slice(idx)[0],
      };
    }
    return eatSummaryData;
  };

  useEffect(() => {
    const initDate = new Date();
    const initDateStr = initDate.toISOString().split("T")[0];
    setDate(initDateStr);
    callGetDashboard(initDateStr);
  }, []);

  useEffect(() => {
    let unit = "kcal";
    if (tableEatSummary === "価格") {
      unit = "円";
    }
    setTableEatSummaryUnit(unit);

    setBeforeEatSummary(getTableEatSummaryData(true));
    setAfterEatSummary(getTableEatSummaryData());
  }, [tableEatSummary]);

  useEffect(() => {
    setBeforeBody(getTableBodyData(true));
    setAfterBody(getTableBodyData());
    setBeforeEatSummary(getTableEatSummaryData(true));
    setAfterEatSummary(getTableEatSummaryData());
    if (dashboardData) {
      setWarningStockCount(dashboardData.warning_stock_count);
    }
  }, [dashboardData]);

  return (
    <HeaderLayout>
      <Box h="100%" py={1} px={2} className="bgMain">
        <HStack my={1} gap={2}>
          <Box w="20%">
            <TextForm
              label="表示日"
              type="date"
              value={date}
              onChange={onChangeDate}
              onBlur={onBlurDate}
              size="xs"
              labelSize="xs"
              isInvalid={invalidDate}
              errorText={errorTextDate}
            />
          </Box>
          <DefaultButton
            className="primary"
            size="sm"
            onClick={onClickDateChangeButton}
            disabled={invalidDate}
            loading={btnLoading}
          >
            切替
          </DefaultButton>
          { warningStockCount > 0 ? (
            <DefaultAlert status="warning">
              {`賞味期限が近い食材が${warningStockCount}個あります`}
            </DefaultAlert>
          ) : (
            <></>
          )}
        </HStack>
        <Flex w="100%" mt={5}>
          <VStack w="40%" gap={3}>
            <Box w="100%">
              <Flex>
                <Box className="sectionTitle">
                  体重
                </Box>
                <Spacer />
                <BodyModalButton hoverText="体調データを登録します" />
              </Flex>
              <BodyCompareTable
                beforeData={beforeBody}
                afterData={afterBody}
                size="xs"
              />
            </Box>
            <Box w="100%">
              <Flex>
                <Box className="sectionTitle">
                  食事サマリー
                </Box>
                <Spacer />
                <HStack gap={3}>
                  <DefaultLink
                    onClick={todayEatListModalOnOpen}
                    hoverText="表示日の食事一覧を開きます"
                  >
                    食事一覧
                  </DefaultLink>
                  <EatSummaryRadio
                    eatSummary={tableEatSummary}
                    onChange={setTableEatSummary}
                    size="sm"
                  />
                  <EatModalButton hoverText="食事データを登録します" />
                </HStack>
              </Flex>
              <EatSummaryCompareTable
                beforeData={beforeEatSummary}
                afterData={afterEatSummary}
                unit={tableEatSummaryUnit}
                size="xs"
              />
            </Box>
          </VStack>
        </Flex>
      </Box>
      <TodayEatListModal
        date={date}
        isOpen={todayEatListModalIsOpen}
        onClose={todayEatListModalOnClose}
      />
    </HeaderLayout>
  );
});
