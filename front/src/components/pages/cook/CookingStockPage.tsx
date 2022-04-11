import { ChangeEvent, memo, VFC, useEffect, useState } from "react";
import { Box, Flex, HStack, Spacer, VStack } from "@chakra-ui/react";

import { DefaultButton } from "../../atoms/button/DefaultButton";
import { DefaultPaginateButton } from "../../atoms/button/DefaultPaginateButton";
import { CheckboxButton } from "../../atoms/button/CheckboxButton";
import { FormArea } from "../../molecules/form/FormArea";
import { HavingStockTable } from "../../organisms/pages/cook/HavingStockTable";
import { CookingStockTable } from "../../organisms/pages/cook/CookingStockTable";
import { TextForm } from "../../organisms/parts/form/TextForm";
import { NumberForm } from "../../organisms/parts/form/NumberForm";
import { LocationRadio } from "../../organisms/parts/food/LocationRadio";
import { EatTimingRadio } from "../../organisms/parts/food/EatTimingRadio";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { useStockApi } from "../../../hooks/food/useStockApi";
import { useCookApi } from "../../../hooks/food/useCookApi";
import { useFoodValidate } from "../../../hooks/food/useFoodValidate";
import { useMessage } from "../../../hooks/common/layout/useMessage";
import { TStock } from "../../../types/api/TStock";
import { TCook } from "../../../types/api/TCook";
import { TCookStock } from "../../../types/api/TCookStock";
import { TValidateReturn } from "../../../types/hooks/common/validate/TValidateReturn";

export const CookingStockPage: VFC = memo(() => {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [eatTiming, setEatTiming] = useState("");
  const [rate, setRate] = useState(0);

  const [invalidName, setInvalidName] = useState(false);
  const [invalidLimit, setInvalidLimit] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidEatTiming, setInvalidEatTiming] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);

  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextLimit, setErrorTextLimit] = useState("");
  const [errorTextLocation, setErrorTextLocation] = useState("");
  const [errorTextDate, setErrorTextDate] = useState("");
  const [errorTextEatTiming, setErrorTextEatTiming] = useState("");
  const [errorTextRate, setErrorTextRate] = useState("");

  const [eatRegistFlg, setEatRegistFlg] = useState(false);
  const [havingStocks, setHavingStocks] = useState<Array<TStock>>([]);
  const [cookingStocks, setCookingStocks] = useState<Array<TCookStock>>([]);

  const [checkStockIdArray, setCheckStockIdArray] = useState<Array<number>>([]);
  const [totalHavingPage, setTotalHavingPage] = useState(0);
  const [totalCookingPage, setTotalCookingPage] = useState(0);
  const [selectedCookingPage, setSelectedCookingPage] = useState(0);

  const [invalidCookingStocks, setInvalidCookingStocks] = useState(false);
  const [errorTextCookingStocks, setErrorTextCookingStocks] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { getStock } = useStockApi();
  const { createCook } = useCookApi();
  const { successToast, errorToast } = useMessage();
  const {
    validateName,
    validateDate,
    validateLocation,
    validateEatTiming,
    validateRate,
  } = useFoodValidate();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeLimit = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(e.target.value);
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onChangeLocation = (loc: string) => {
    const { invalid, errorText } = validateLocation(loc);
    setInvalidLocation(invalid);
    setErrorTextLocation(errorText);

    setLocation(loc);
  };

  const onChangeEatTiming = (et: string) => {
    const { invalid, errorText } = validateEatTiming(et);
    setInvalidEatTiming(invalid);
    setErrorTextEatTiming(errorText);

    setEatTiming(et);
  };

  const onChangeEatRegistFlg = (e: ChangeEvent<HTMLInputElement>) => {
    setEatRegistFlg(e.target.checked);
  };

  const onBlurName = () => {
    const { invalid, errorText } = validateName(name);
    setInvalidName(invalid);
    setErrorTextName(errorText);
  };

  const onBlurLimit = () => {
    const { invalid, errorText } = validateDate(limit, "賞味期限");
    setInvalidLimit(invalid);
    setErrorTextLimit(errorText);
  };

  const onBlurDate = () => {
    const { invalid, errorText } = validateDate(date, "食事日");
    setInvalidDate(invalid);
    setErrorTextDate(errorText);
  };

  const onBlurRate = () => {
    const { invalid, errorText } = validateRate(rate, "食事量");
    setInvalidRate(invalid);
    setErrorTextRate(errorText);
  };

  const validateCookingStocks = (): TValidateReturn => {
    let invalid = false;
    let errorText = "";
    if (cookingStocks.length <= 0) {
      invalid = true;
      errorText = "料理に使う食材が選択されていません";
    }
    const rateZeroStocks = cookingStocks.filter((cookingStock) => {
      return cookingStock.rate <= 0;
    });
    if (rateZeroStocks.length > 0) {
      invalid = true;
      errorText = "食料に使う食材で使用料が0のものがあります";
    }
    return { invalid, errorText };
  };

  const callGetStock = (page?: number) => {
    let getPage: number;
    if (page) {
      getPage = page + 1;
    } else {
      getPage = 1;
    }
    getStock(getPage)
      .then((res) => {
        setHavingStocks(res.results);
        setTotalHavingPage(res.total_pages);
      })
      .catch(() => {
        errorToast("データの取得に失敗しました");
      });
  };

  const onHavingPageChange = (page: { selected: number }) => {
    callGetStock(page.selected);
  };

  const onCookingPageChange = (page: { selected: number }) => {
    setSelectedCookingPage(page.selected);
  };

  const onClickCheckbox = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      const index = havingStocks.findIndex((havingStock) => {
        return id === havingStock.id;
      });
      const targetStock = havingStocks[index];
      const addCookStock: TCookStock = {
        id,
        name: targetStock.name,
        quantity: targetStock.quantity,
        remain: targetStock.remain,
        rate: 0,
      };
      setCookingStocks([...cookingStocks, addCookStock]);
      setCheckStockIdArray([...checkStockIdArray, id]);
    } else {
      const csIndex = cookingStocks.findIndex((cookingStock) => {
        return id === cookingStock.id;
      });
      const idIndex = checkStockIdArray.findIndex((checkStockId) => {
        return id === checkStockId;
      });
      cookingStocks.splice(csIndex, 1);
      checkStockIdArray.splice(idIndex, 1);

      setCookingStocks([...cookingStocks]);
      setCheckStockIdArray([...checkStockIdArray]);
    }
  };

  const onChangeRate = (value: number, id: number) => {
    const index = cookingStocks.findIndex((cookingStock) => {
      return id === cookingStock.id;
    });
    const targetCookStock = cookingStocks[index];
    targetCookStock.rate = value;
    cookingStocks.splice(index, 1, targetCookStock);
    setCookingStocks([...cookingStocks]);
  };

  const isInvalidAllValue = () => {
    const { invalid: nameInv } = validateName(name);
    const { invalid: limitInv } = validateDate(limit);
    const { invalid: locationInv, errorText: locationErrTxt } = validateLocation(location);
    const { invalid: dateInv } = validateDate(date);
    const { invalid: eatTimingInv, errorText: eatTimingErrTxt } = validateEatTiming(eatTiming);
    const { invalid: rateInv } = validateRate(rate);
    const { invalid: cookingStockInv, errorText: cookingStockErrTxt } = validateCookingStocks();

    let checkResult = nameInv || limitInv || locationInv || cookingStockInv;
    if (eatRegistFlg) {
      checkResult = checkResult || dateInv || eatTimingInv || rateInv;
    }

    setInvalidCookingStocks(cookingStockInv);
    setErrorTextCookingStocks(cookingStockErrTxt);
    if (checkResult) {
      onBlurName();
      onBlurLimit();
      setInvalidLocation(locationInv);
      setErrorTextLocation(locationErrTxt);
      if (eatRegistFlg) {
        onBlurDate();
        setInvalidEatTiming(eatTimingInv);
        setErrorTextEatTiming(eatTimingErrTxt);
        onBlurRate();
      }

      errorToast("入力値に不備があります");
      throw new Error();
    }
  };

  const getCookJson = (): TCook => {
    isInvalidAllValue();
    let json: TCook = {
      name,
      limit,
      location,
      ingredients: cookingStocks.map((cookingStock) => {
        return { id: cookingStock.id, rate: cookingStock.rate };
      }),
    };

    if (eatRegistFlg) {
      json = { ...json, date, rate, eat_timing: eatTiming };
    }
    return json;
  };

  const callCookCreate = () => {
    const cookJson = getCookJson();
    createCook(cookJson)
      .then(() => {
        successToast("料理データを作成しました");
      })
      .catch(() => {
        errorToast("料理データ作成に失敗しました");
      });
  };

  useEffect(() => {
    setTotalCookingPage(Math.ceil(cookingStocks.length / 5));
  }, [cookingStocks]);

  useEffect(() => {
    const btnStatus = invalidName || invalidLimit || invalidLocation
      || invalidDate || invalidEatTiming || invalidRate;
    setButtonDisabled(btnStatus);
  }, [
    invalidName,
    invalidLimit,
    invalidLocation,
    invalidDate,
    invalidEatTiming,
    invalidRate,
  ]);

  useEffect(() => {
    callGetStock();
  }, []);

  return (
    <HeaderLayout title="料理" titleClass="stock">
      <HStack h="100%" gap={2} m={2}>
        <Box w="45%" h="100%" p={2} className="bgMain">
          <Flex justify="flex-end">
            <Box w="50%" className="sectionTitle">
              家にある食材
            </Box>
            <Spacer />
            <DefaultPaginateButton
              totalPage={totalHavingPage}
              onPageChange={onHavingPageChange}
              size="xs"
            />
          </Flex>
          { havingStocks ? (
            <HavingStockTable
              havingStocks={havingStocks}
              onClickCheckbox={onClickCheckbox}
              checkStockIdArray={checkStockIdArray}
            />
          ) : (
            <Box>
              食材が登録されていません。
            </Box>
          )}
        </Box>
        <VStack w="55%" h="100%">
          <Box w="100%" h="60%" p={2} className="bgMain">
            <Flex>
              <Box w="50%" className="sectionTitle">
                料理に使う食材
              </Box>
              <Spacer />
              <DefaultPaginateButton
                totalPage={totalCookingPage}
                onPageChange={onCookingPageChange}
                size="xs"
              />
            </Flex>
            <CookingStockTable
              cookingStocks={cookingStocks}
              onClickCheckbox={onClickCheckbox}
              onChangeRate={onChangeRate}
              checkStockIdArray={checkStockIdArray}
              selectedPage={selectedCookingPage}
            />
            <Box color="red">{invalidCookingStocks ? errorTextCookingStocks : ""}</Box>
          </Box>
          <Box w="100%" h="40%" p={2} className="bgMain">
            <Box className="sectionTitle">
              料理情報
            </Box>
            <HStack w="100%" gap={2}>
              <Box w="45%">
                <TextForm
                  label="名前"
                  require="require"
                  value={name}
                  onChange={onChangeName}
                  onBlur={onBlurName}
                  isInvalid={invalidName}
                  errorText={errorTextName}
                  size="xs"
                  labelSize="xs"
                />
              </Box>
              <Box w="15%">
                <TextForm
                  label="賞味期限"
                  type="date"
                  require="require"
                  value={limit}
                  onChange={onChangeLimit}
                  onBlur={onBlurLimit}
                  isInvalid={invalidLimit}
                  errorText={errorTextLimit}
                  size="xs"
                  labelSize="xs"
                />
              </Box>
              <Box w="35%">
                <FormArea
                  label="保管場所"
                  labelSize="xs"
                  require="require"
                  isInvalid={invalidLocation}
                  errorText={errorTextLocation}
                >
                  <LocationRadio
                    location={location}
                    onChange={onChangeLocation}
                    size="sm"
                  />
                </FormArea>
              </Box>
            </HStack>
            <HStack w="100%" gap={2}>
              <Box w="10%">
                <CheckboxButton
                  isChecked={eatRegistFlg}
                  onChange={onChangeEatRegistFlg}
                  size="xs"
                >
                  食事登録
                </CheckboxButton>
              </Box>
              <Box w="15%">
                <TextForm
                  label="食事日"
                  type="date"
                  require={eatRegistFlg ? "require" : ""}
                  value={date}
                  onChange={onChangeDate}
                  onBlur={onBlurDate}
                  isInvalid={invalidDate}
                  errorText={errorTextDate}
                  size="xs"
                  labelSize="xs"
                  isDisabled={!eatRegistFlg}
                />
              </Box>
              <Box w="35%">
                <FormArea
                  label="食事タイミング"
                  labelSize="xs"
                  require={eatRegistFlg ? "require" : ""}
                  isDisabled={!eatRegistFlg}
                  isInvalid={invalidEatTiming}
                  errorText={errorTextEatTiming}
                >
                  <EatTimingRadio
                    eatTiming={eatTiming}
                    onChange={onChangeEatTiming}
                    isGroupDisabled={!eatRegistFlg}
                    size="sm"
                  />
                </FormArea>
              </Box>
              <Box w="15%">
                <NumberForm
                  label="食事量"
                  labelSize="xs"
                  require={eatRegistFlg ? "require" : ""}
                  value={rate}
                  onChange={setRate}
                  onBlur={onBlurRate}
                  isInvalid={invalidRate}
                  errorText={errorTextRate}
                  min={0}
                  max={100}
                  isDisabled={!eatRegistFlg}
                  unit="%"
                  size="xs"
                />
              </Box>
              <Flex w="25%" justify="flex-end">
                <DefaultButton
                  className="primary"
                  onClick={callCookCreate}
                  disabled={buttonDisabled}
                >
                  登録
                </DefaultButton>
              </Flex>
            </HStack>
          </Box>
        </VStack>
      </HStack>
    </HeaderLayout>
  );
});
