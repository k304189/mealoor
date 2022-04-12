import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";

import { EatTimingRadio } from "./EatTimingRadio";
import { LocationRadio } from "./LocationRadio";
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
import { TSendUse } from "../../../../types/api/TSendUse";

export type Props = {
  id: number;
  useType: "trash" | "divide" | "eat" | "stock";
  callFunction: (json: TSendUse) => Promise<number>;
  quantity?: number;
  maxRate?: number;
  selectedDataText?: string;
  setUseTypeJson?: boolean;
  initName?: string;
  requireName?: boolean;
  initPrice?: number;
  requirePrice?: boolean;
};

export const CommonUseForm: VFC<Props> = memo((props) => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [eatTiming, setEatTiming] = useState("");
  const [rate, setRate] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discounted, setDiscounted] = useState(false);
  const [note, setNote] = useState("");

  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidEatTiming, setInvalidEatTiming] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

  const [errorTextDate, setErrorTextDate] = useState("");
  const [errorTextEatTiming, setErrorTextEatTiming] = useState("");
  const [errorTextLocation, setErrorTextLocation] = useState("");
  const [errorTextRate, setErrorTextRate] = useState("");
  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextNote, setErrorTextNote] = useState("");

  const [dateLabel, setDateLabel] = useState("");
  const [rateLabel, setRateLabel] = useState("");
  const [btnText, setBtnText] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  const { successToast, errorToast } = useMessage();
  const {
    validateName,
    validateDate,
    validateLocation,
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
    initName = "",
    requireName = false,
    requirePrice = false,
    initPrice = 0,
  } = props;

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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

  const onChangeLocation = (loc: string) => {
    const {
      invalid: locationInv,
      errorText: locationErrTxt,
    } = validateEatTiming(loc);

    setInvalidLocation(locationInv);
    setErrorTextLocation(locationErrTxt);
    setLocation(loc);
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

  const onBlurName = () => {
    const { invalid, errorText } = validateName(name);
    setInvalidName(invalid);
    setErrorTextName(errorText);
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
    setLocation("");
    setName("");
    setRate(0);
    setPrice(0);
    setDiscounted(false);
    setNote("");
  };

  const validateAllValue = () => {
    const { invalid: dateInv } = validateDate(date);
    const { invalid: noteInv } = validateNote(note);
    const {
      invalid: locationInv,
      errorText: locationErrTxt,
    } = validateLocation(location);
    const {
      invalid: eatTimingInv,
      errorText: eatTimingErrTxt,
    } = validateEatTiming(eatTiming);
    const { invalid: nameInv } = validateName(name);
    const { invalid: rateInv } = validateRate(rate);

    let checkResult = dateInv || noteInv || rateInv;
    if (requireName) {
      checkResult = checkResult || nameInv;
      onBlurName();
    }
    if (useType === "eat") {
      checkResult = checkResult || eatTimingInv;
      if (eatTimingInv) {
        setInvalidEatTiming(eatTimingInv);
        setErrorTextEatTiming(eatTimingErrTxt);
      }
    }
    if (useType === "stock") {
      checkResult = checkResult || locationInv;
      if (locationInv) {
        setInvalidEatTiming(locationInv);
        setErrorTextEatTiming(locationErrTxt);
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
    const json: TSendUse = {
      id,
      date,
      rate,
      note,
    };
    if (useType === "eat") {
      json.eat_timing = eatTiming;
    } else if (useType === "stock") {
      json.location = location;
    }
    if (setUseTypeJson) {
      json.use_type = useType;
    }
    if (requireName) {
      json.name = name;
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
    setBtnStatus(
      invalidDate || invalidEatTiming || invalidLocation || invalidName
      || invalidRate || invalidNote,
    );
  }, [
    invalidDate,
    invalidEatTiming,
    invalidLocation,
    invalidName,
    invalidRate,
    invalidNote,
  ]);

  useEffect(() => {
    let b = "";
    let dl = "使用日";
    let rl = "使用率";
    if (useType === "trash") {
      b = "処分";
    } else if (useType === "divide") {
      b = "分割";
    } else if (useType === "eat") {
      b = "食事";
      dl = "食事日";
      rl = "食事率";
    } else if (useType === "stock") {
      b = "登録";
      dl = "賞味期限";
      rl = "追加率";
    }
    setBtnText(b);
    setDateLabel(dl);
    setRateLabel(rl);

    if (requireName) {
      setName(initName);
    }

    if (requirePrice) {
      setPrice(initPrice);
    }
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
              label={dateLabel}
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
                label={rateLabel}
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
        <HStack w="100%" h="20%" gap={3}>
          { requireName ? (
            <Box w="30%">
              <TextForm
                label="名前"
                require="require"
                value={name}
                onChange={onChangeName}
                onBlur={onBlurName}
                errorText={errorTextName}
                isInvalid={invalidName}
              />
            </Box>
          ) : (
            <></>
          )}
          { useType === "eat" ? (
            <Box w="40%">
              <FormArea
                label="食事タイミング"
                require="require"
                errorText={errorTextEatTiming}
                isInvalid={invalidEatTiming}
              >
                <EatTimingRadio eatTiming={eatTiming} onChange={onChangeEatTiming} />
              </FormArea>
            </Box>
          ) : (
            <></>
          )}
          { useType === "stock" ? (
            <Box w="30%">
              <FormArea
                label="保管場所"
                require="require"
                errorText={errorTextLocation}
                isInvalid={invalidLocation}
              >
                <LocationRadio location={location} onChange={onChangeLocation} />
              </FormArea>
            </Box>
          ) : (
            <></>
          )}
        </HStack>
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
