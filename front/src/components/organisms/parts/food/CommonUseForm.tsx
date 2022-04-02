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
import { useFavoriteEatApi } from "../../../../hooks/food/useFavoriteEatApi";
import { useFoodValidate } from "../../../../hooks/food/useFoodValidate";

export type Props = {
  id: number;
  quantity?: number;
  maxRate?: number;
  selectedDataText?: string;
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

  const [btnStatus, setBtnStatus] = useState(false);

  const { successToast, errorToast } = useMessage();
  const { eatFavoriteEat } = useFavoriteEatApi();
  const {
    validateDate,
    validateEatTiming,
    validateNote,
    validateRate,
  } = useFoodValidate();
  const {
    id,
    quantity = 1,
    maxRate = Number.MAX_SAFE_INTEGER,
    selectedDataText = "",
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

    const checkResult = dateInv || noteInv || eatTimingInv || rateInv;
    if (checkResult) {
      onBlurDate();
      onBlurRate();
      onBlurNote();
      setInvalidEatTiming(eatTimingInv);
      setInvalidEatTiming(eatTimingInv);
      setErrorTextEatTiming(eatTimingErrTxt);

      errorToast("入力値に不備があります");
    }
    return checkResult;
  };

  const getJson = () => {
    const json = {
      id,
      date,
      eat_timing: eatTiming,
      rate,
      price,
      discounted,
      note,
    };
    return json;
  };

  const onClickButton = () => {
    if (!validateAllValue()) {
      eatFavoriteEat(getJson())
        .then(() => {
          successToast("食事データを作成しました");
          clearForm();
        })
        .catch(() => {
          errorToast("食事データの登録に失敗しました");
        });
    }
  };

  useEffect(() => {
    setBtnStatus(invalidDate || invalidEatTiming || invalidRate || invalidNote);
  }, [invalidDate, invalidEatTiming, invalidRate, invalidNote]);

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
              label="食事日"
              type="date"
              require="require"
              value={date}
              onChange={onChangeDate}
              onBlur={onBlurDate}
              errorText={errorTextDate}
              isInvalid={invalidDate}
            />
          </Box>
          <Box w="60%">
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
        <HStack w="100%" gap={4} h="50%">
          <Box w="40%" h="100%">
            <Flex h="100%" align="end" gap={1}>
              <NumberForm
                label="食事量"
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
          <Box w="30%">
            <NumberForm
              label="価格"
              value={price}
              onChange={setPrice}
              unit="円"
              require="optional"
            />
          </Box>
          <Box w="20%" h="100%">
            <CheckboxButton isChecked={discounted} onChange={onChangeDiscounted}>
              割引品
            </CheckboxButton>
          </Box>
        </HStack>
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
              食事
            </DefaultButton>
          </Box>
        </Flex>
      </VStack>
    </>
  );
});
