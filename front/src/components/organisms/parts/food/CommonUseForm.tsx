import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";

import { EatTimingRadio } from "./EatTimingRadio";
import { NumberForm } from "../form/NumberForm";
import { TextForm } from "../form/TextForm";
import { TextareaForm } from "../form/TextareaForm";
import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { CheckboxButton } from "../../../atoms/button/CheckboxButton";
import { AddButton } from "../../../molecules/button/AddButton";
import { MinusButton } from "../../../molecules/button/MinusButton";
import { FormArea } from "../../../molecules/form/FormArea";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { useFoodValidate } from "../../../../hooks/food/useFoodValidate";
import { TUse } from "../../../../types/api/TUse";

export type Props = {
  id: number;
  useType: "trash" | "divide" | "eat";
  callFunction: (json: TUse) => Promise<number>;
  quantity?: number;
  maxRate?: number;
  selectedDataText?: string;
  setUseTypeJson?: boolean;
  requirePrice?: boolean;
};

export const CommonUseForm: VFC<Props> = memo((props) => {
  const [date, setDate] = useState("");
  const [eatTiming, setEatTiming] = useState("");
  const [rate, setRate] = useState(0);
  const [price, setPrice] = useState(0);
  const [discounted, setDiscounted] = useState(false);
  const [note, setNote] = useState("");

  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidEatTiming, setInvalidEatTiming] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

  const [errorTextDate, setErrorTextDate] = useState("");
  const [errorTextEatTiming, setErrorTextEatTiming] = useState("");
  const [errorTextRate, setErrorTextRate] = useState("");
  const [errorTextNote, setErrorTextNote] = useState("");

  const [btnText, setBtnText] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  const { successToast, errorToast } = useMessage();
  const {
    validateDate,
    validateEatTiming,
    validateNote,
    validateRate,
  } = useFoodValidate();
  const {
    id,
    useType,
    callFunction,
    quantity = 1,
    maxRate = Number.MAX_SAFE_INTEGER,
    selectedDataText = "",
    setUseTypeJson = false,
    requirePrice = false,
  } = props;

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const onChangeDiscounted = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscounted(e.target.checked);
  };

  const onChangeEatTiming = (et: string) => {
    const {
      invalid: eatTimingInv,
      errorText: eatTimingErrTxt,
    } = validateEatTiming(et);

    setInvalidEatTiming(eatTimingInv);
    setErrorTextEatTiming(eatTimingErrTxt);
    setEatTiming(et);
  };

  const onBlurDate = () => {
    const { invalid, errorText } = validateDate(date);
    setInvalidDate(invalid);
    setErrorTextDate(errorText);
  };

  const onBlurNote = () => {
    const { invalid, errorText } = validateNote(note);
    setInvalidNote(invalid);
    setErrorTextNote(errorText);
  };

  const onBlurRate = () => {
    const { invalid, errorText } = validateRate(rate);
    setInvalidRate(invalid);
    setErrorTextRate(errorText);
  };

  const onClickAddButton = () => {
    if (quantity > 0) {
      let tmpRate = rate + Math.trunc(100 / quantity);
      if (tmpRate > maxRate) {
        tmpRate = maxRate;
      }
      setRate(tmpRate);
    }
  };

  const onClickMinusButton = () => {
    if (quantity > 0) {
      let tmpRate = rate - Math.trunc(100 / quantity);
      if (tmpRate < 0) {
        tmpRate = 0;
      }
      setRate(tmpRate);
    }
  };

  const clearForm = () => {
    setDate("");
    setEatTiming("");
    setRate(0);
    setPrice(0);
    setDiscounted(false);
    setNote("");
  };

  const validateAllValue = () => {
    const { invalid: dateInv } = validateDate(date);
    const { invalid: noteInv } = validateNote(note);
    const {
      invalid: eatTimingInv,
      errorText: eatTimingErrTxt,
    } = validateEatTiming(eatTiming);
    const { invalid: rateInv } = validateRate(rate);

    let checkResult = dateInv || noteInv || rateInv;
    if (useType === "eat") {
      checkResult = checkResult || eatTimingInv;
      if (eatTimingInv) {
        setInvalidEatTiming(eatTimingInv);
        setErrorTextEatTiming(eatTimingErrTxt);
      }
    }
    if (checkResult) {
      onBlurDate();
      onBlurRate();
      onBlurNote();

      errorToast("入力値に不備があります");
    }
    return checkResult;
  };

  const getJson = () => {
    const json: TUse = {
      id,
      date,
      rate,
      note,
    };
    if (useType === "eat") {
      json.eat_timing = eatTiming;
    }
    if (setUseTypeJson) {
      json.use_type = useType;
    }
    if (requirePrice) {
      json.price = price;
      json.discounted = discounted;
    }
    return json;
  };

  const onClickButton = () => {
    if (!validateAllValue()) {
      callFunction(getJson())
        .then(() => {
          successToast("処理が作成しました");
          clearForm();
        })
        .catch(() => {
          errorToast("処理が失敗しました");
        });
    }
  };

  useEffect(() => {
    setBtnStatus(invalidDate || invalidEatTiming || invalidRate || invalidNote);
  }, [invalidDate, invalidEatTiming, invalidRate, invalidNote]);

  useEffect(() => {
    let b = "";
    if (useType === "trash") {
      b = "処分";
    } else if (useType === "divide") {
      b = "分割";
    } else if (useType === "eat") {
      b = "食事";
    }
    setBtnText(b);
  }, []);

  return (
    <>
      <VStack gap={2} h="100%">
        {selectedDataText ? (
          <Box h="10%" w="100%" align="left">
            {`選択中データ：${selectedDataText}`}
          </Box>
        ) : (
          <></>
        )}
        <HStack gap={2} w="100%" h="30%">
          <Box w="40%">
            <TextForm
              label="日付"
              type="date"
              require="require"
              value={date}
              onChange={onChangeDate}
              onBlur={onBlurDate}
              errorText={errorTextDate}
              isInvalid={invalidDate}
            />
          </Box>
          <Box w="40%" h="100%">
            <Flex h="100%" align="end" gap={1}>
              <NumberForm
                label="割合"
                value={rate}
                onChange={setRate}
                onBlur={onBlurRate}
                errorText={errorTextRate}
                isInvalid={invalidRate}
                unit="%"
                require="require"
              />
              <HStack pb={2}>
                <AddButton aria-label="割合追加" size="sm" onClick={onClickAddButton} />
                <MinusButton aria-label="割合削除" size="sm" onClick={onClickMinusButton} />
              </HStack>
            </Flex>
          </Box>
        </HStack>
        { useType === "eat" ? (
          <HStack w="100%" h="20%">
            <Box w="100%">
              <FormArea
                label="食事タイミング"
                require="require"
                errorText={errorTextEatTiming}
                isInvalid={invalidEatTiming}
              >
                <EatTimingRadio eatTiming={eatTiming} onChange={onChangeEatTiming} />
              </FormArea>
            </Box>
          </HStack>
        ) : (
          <></>
        )}
        { requirePrice ? (
          <HStack w="100%" h="20%" gap={4}>
            <Box w="35%">
              <NumberForm
                label="価格"
                value={price}
                onChange={setPrice}
                unit="円"
                require="optional"
              />
            </Box>
            <Box w="15%" h="100%">
              <CheckboxButton isChecked={discounted} onChange={onChangeDiscounted}>
                割引品
              </CheckboxButton>
            </Box>
          </HStack>
        ) : (
          <></>
        )}
        <Flex w="100%" h="10%" align="end">
          <TextareaForm
            label="メモ"
            value={note}
            require="optional"
            onChange={onChangeNote}
            onBlur={onBlurNote}
            errorText={errorTextNote}
            isInvalid={invalidNote}
            size="sm"
          />
          <Box pb={2} ml={2}>
            <DefaultButton
              className="primary"
              onClick={onClickButton}
              disabled={btnStatus}
            >
              {btnText}
            </DefaultButton>
          </Box>
        </Flex>
      </VStack>
    </>
  );
});
