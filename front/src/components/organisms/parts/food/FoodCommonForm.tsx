import { ChangeEvent, memo, VFC, useEffect, useState } from "react";
import { Box, HStack, VStack, useDisclosure } from "@chakra-ui/react";

import { FoodCategoryPop } from "./FoodCategoryPop";
import { EatTimingRadio } from "./EatTimingRadio";
import { LocationRadio } from "./LocationRadio";
import { TextForm } from "../form/TextForm";
import { NumberForm } from "../form/NumberForm";
import { TextareaForm } from "../form/TextareaForm";
import { CheckboxButton } from "../../../atoms/button/CheckboxButton";
import { ModelFormFrame } from "../../../molecules/form/ModelFormFrame";
import { DefaultRadioGroup } from "../../../molecules/form/DefaultRadioGroup";
import { FormArea } from "../../../molecules/form/FormArea";
import { FoodUnitSelect } from "../../../molecules/form/FoodUnitSelect";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";
import { TFormAttribute } from "../../../../types/components/TFormAttribute";
import { TFoodCommon } from "../../../../types/api/TFoodCommon";
import { TEat } from "../../../../types/api/TEat";
import { useEatApi } from "../../../../hooks/food/useEatApi";
import { useFoodValidate } from "../../../../hooks/food/useFoodValidate";

type Props = {
  model: string;
  updateMode: "create" | "update";
};

export const FoodCommonForm: VFC<Props> = memo((props) => {
  const { model, updateMode } = props;
  const [name, setName] = useState("");
  const [eatType, setEatType] = useState("");
  const [foodType, setFoodType] = useState("");
  const [categories, setCategories] = useState<Array<TFoodCategory>>([]);
  const [shop, setShop] = useState("");
  const [price, setPrice] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");
  const [protein, setProtein] = useState(0);
  const [lipid, setLipid] = useState(0);
  const [carbo, setCarbo] = useState(0);
  const [note, setNote] = useState("");
  const [discounted, setDiscounted] = useState(false);

  const [date, setDate] = useState("");
  const [eatTiming, setEatTiming] = useState("");

  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEatType, setInvalidEatType] = useState(false);
  const [invalidFoodType, setInvalidFoodType] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidEatTiming, setInvalidEatTiming] = useState(false);
  const [invalidShop, setInvalidShop] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextEatType, setErrorTextEatType] = useState("");
  const [errorTextFoodType, setErrorTextFoodType] = useState("");
  const [errorTextDate, setErrorTextDate] = useState("");
  const [errorTextEatTiming, setErrorTextEatTiming] = useState("");
  const [errorTextShop, setErrorTextShop] = useState("");
  const [errorTextNote, setErrorTextNote] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    validateName,
    validateEatType,
    validateFoodType,
    validateDate,
    validateEatTiming,
    validateShop,
    validateNote,
  } = useFoodValidate();
  const { createEat } = useEatApi();

  const eatTypeArrayBase = [
    { value: "外食" },
    { value: "中食" },
    { value: "自炊" },
  ];
  const [eatTypeArray, setEatTypeArray] = useState<Array<TFormAttribute>>(eatTypeArrayBase);
  const [eatTypeGroupDisabled, setEatTypeGroupDisabled] = useState(false);

  const foodTypeArrayBase = [
    { value: "食材" },
    { value: "料理" },
  ];
  const [foodTypeArray, setFoodTypeArray] = useState<Array<TFormAttribute>>(foodTypeArrayBase);
  const [foodTypeGroupDisabled, setFoodTypeGroupDisabled] = useState(false);

  const remain = 100;

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onChangeExpirationDate = (e: ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(e.target.value);
  };

  const onChangeShop = (e: ChangeEvent<HTMLInputElement>) => {
    setShop(e.target.value);
  };

  const onChangeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };

  const onChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const onChangeDiscounted = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscounted(e.target.checked);
  };

  const onBlurName = () => {
    const { invalid, errorText } = validateName(name);
    setInvalidName(invalid);
    setErrorTextName(errorText);
  };

  const onBlurDate = () => {
    const { invalid, errorText } = validateDate(date);
    setInvalidDate(invalid);
    setErrorTextDate(errorText);
  };

  const onBlurShop = () => {
    const { invalid, errorText } = validateShop(shop);
    setInvalidShop(invalid);
    setErrorTextShop(errorText);
  };

  const onBlurNote = () => {
    const { invalid, errorText } = validateNote(note);
    setInvalidNote(invalid);
    setErrorTextNote(errorText);
  };

  const isInvalidAllValue = (): boolean => {
    const { invalid: nameInv } = validateName(name);
    const { invalid: eatTypeInv, errorText: eatTypeErrTxt } = validateEatType(eatType);
    const { invalid: foodTypeInv, errorText: foodTypeErrTxt } = validateFoodType(foodType);
    const { invalid: shopInv } = validateShop(shop);
    const { invalid: noteInv } = validateNote(note);

    let checkResult = nameInv || eatTypeInv || foodTypeInv || shopInv || noteInv;
    if (model === "eat") {
      const { invalid: dateInv } = validateDate(date);
      const { invalid: eatTimingInv, errorText: eatTimingErrTxt } = validateEatTiming(eatTiming);
      if (dateInv || eatTimingInv) {
        onBlurDate();
        setInvalidEatTiming(eatTimingInv);
        setErrorTextEatTiming(eatTimingErrTxt);
      }
      checkResult = checkResult || dateInv || eatTimingInv;
    }
    if (checkResult) {
      onBlurName();
      onBlurShop();
      onBlurNote();
      setInvalidEatType(eatTypeInv);
      setErrorTextEatType(eatTypeErrTxt);
      setInvalidFoodType(foodTypeInv);
      setErrorTextFoodType(foodTypeErrTxt);
    }
    return checkResult;
  };

  const getCommonJson = () :TFoodCommon => {
    return {
      name,
      eat_type: eatType,
      food_type: foodType,
      shop,
      price,
      kcal,
      amount,
      unit,
      protein,
      lipid,
      carbo,
      discounted,
      note,
    };
  };

  const getEatJson = (): TEat => {
    return {
      ...getCommonJson(),
      eat_timing: eatTiming,
      date,
    };
  };

  const createFunction = async () => {
    const checkResult = isInvalidAllValue();
    if (!checkResult) {
      if (model === "eat") {
        createEat(getEatJson());
      }
    }
  };

  const updateFunction = async () => {
    const checkResult = isInvalidAllValue();
    if (!checkResult) {
      if (model === "eat") {
        console.log(getEatJson());
      }
    }
  };

  useEffect(() => {
    if (eatType === "自炊") {
      if (foodType === "料理") {
        setFoodTypeGroupDisabled(true);
      } else {
        setFoodTypeArray(foodTypeArrayBase.map((ft) => {
          return { value: ft.value, disabled: ["料理"].includes(ft.value) };
        }));
      }
    } else {
      setFoodTypeArray(foodTypeArrayBase);
    }
    if (foodType === "料理") {
      if (eatType === "自炊") {
        setEatTypeGroupDisabled(true);
      } else {
        setEatTypeArray(eatTypeArrayBase.map((et) => {
          return { value: et.value, disabled: ["自炊"].includes(et.value) };
        }));
      }
    } else {
      setEatTypeArray(eatTypeArrayBase);
    }
  }, [eatType, foodType]);

  useEffect(() => {
    if (categories.length >= 2) {
      setFoodTypeArray(foodTypeArray.map((ft) => {
        return { value: ft.value, disabled: ["食材"].includes(ft.value) };
      }));
    } else {
      setFoodTypeArray(foodTypeArrayBase);
    }
  }, [categories]);

  useEffect(() => {
    const btnStatus = invalidName || invalidEatType || invalidFoodType
      || invalidDate || invalidEatTiming || invalidShop || invalidNote;
    setButtonDisabled(btnStatus);
  }, [
    invalidName,
    invalidEatType,
    invalidFoodType,
    invalidDate,
    invalidEatTiming,
    invalidShop,
    invalidNote,
  ]);

  return (
    <ModelFormFrame
      createFunction={createFunction}
      updateFunction={updateFunction}
      updateMode={updateMode}
      buttonDisabled={buttonDisabled}
    >
      <VStack spacing={2}>
        <HStack w="100%">
          <Box w="30%">
            <TextForm
              label="名前"
              require="require"
              value={name}
              onChange={onChangeName}
              onBlur={onBlurName}
              isInvalid={invalidName}
              errorText={errorTextName}
            />
          </Box>
          <Box w="10%" h="100%">
            <CheckboxButton isChecked={discounted} onChange={onChangeDiscounted}>
              割引品
            </CheckboxButton>
          </Box>
          <Box w="20%">
            <FormArea
              label="食事タイプ"
              require="require"
              isInvalid={invalidEatType}
              errorText={errorTextEatType}
            >
              <DefaultRadioGroup
                items={eatTypeArray}
                value={eatType}
                groupName="eatTypeRadio"
                onChange={setEatType}
                isGroupDisabled={eatTypeGroupDisabled}
              />
            </FormArea>
          </Box>
          <Box w="20%">
            <FormArea
              label="食料タイプ"
              require="require"
              isInvalid={invalidFoodType}
              errorText={errorTextFoodType}
            >
              <DefaultRadioGroup
                items={foodTypeArray}
                value={foodType}
                groupName="eatTypeRadio"
                className="defaultSecondRadioButton"
                onChange={setFoodType}
                isGroupDisabled={foodTypeGroupDisabled}
              />
            </FormArea>
          </Box>
          <Box w="20%">
            <FormArea
              label="カテゴリー"
              require="require"
            >
              <FoodCategoryPop
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                foodCategories={categories}
                setFoodCategories={setCategories}
                foodType={foodType}
                eatType={eatType}
              />
            </FormArea>
          </Box>
        </HStack>
        <HStack w="100%" gap={5}>
          { model === "eat" ? (
            <>
              <Box w="20%">
                <TextForm
                  label="食事日"
                  type="date"
                  require="require"
                  value={date}
                  onChange={onChangeDate}
                  onBlur={onBlurDate}
                  isInvalid={invalidDate}
                  errorText={errorTextDate}
                />
              </Box>
              <Box w="30%">
                <FormArea
                  label="食事タイミング"
                  require="require"
                  isInvalid={invalidEatTiming}
                  errorText={errorTextEatTiming}
                >
                  <EatTimingRadio eatTiming={eatTiming} onChange={setEatTiming} />
                </FormArea>
              </Box>
            </>
          ) : (
            <></>
          )}
          { model === "stock" ? (
            <>
              <Box w="20%">
                <TextForm
                  label="賞味期限"
                  type="date"
                  require="require"
                  value={expirationDate}
                  onChange={onChangeExpirationDate}
                />
              </Box>
              <Box w="15%">
                <TextForm
                  label="残量"
                  value={remain}
                  onChange={() => {}}
                  rightAddon="%"
                  isReadOnly
                />
              </Box>
            </>
          ) : (
            <></>
          )}
          { ["stock"].includes(model) ? (
            <>
              <Box w="25%">
                <FormArea label="保存場所" require="optional">
                  <LocationRadio
                    location={location}
                    onChange={setLocation}
                  />
                </FormArea>
              </Box>
              <Box w="15%">
                <NumberForm
                  label="個数"
                  value={quantity}
                  onChange={setQuantity}
                  unit="個"
                  require="optional"
                />
              </Box>
            </>
          ) : (
            <></>
          )}
          <Box w="25%">
            <TextForm
              label="店"
              require="optional"
              value={shop}
              onChange={onChangeShop}
              onBlur={onBlurShop}
              isInvalid={invalidShop}
              errorText={errorTextShop}
            />
          </Box>
        </HStack>
        <HStack w="100%">
          <NumberForm
            label="価格"
            value={price}
            onChange={setPrice}
            unit="円"
            require="optional"
          />
          <NumberForm
            label="カロリー"
            value={kcal}
            onChange={setKcal}
            unit="kcal"
            require="optional"
          />
          <NumberForm
            label="量"
            value={amount}
            onChange={setAmount}
            precision={1}
            require="optional"
          />
          <FormArea
            label="単位"
            require="optional"
          >
            <FoodUnitSelect value={unit} onChange={onChangeUnit} />
          </FormArea>
          <NumberForm
            label="タンパク質"
            value={protein}
            onChange={setProtein}
            precision={1}
            max={999.9}
            unit="g"
            require="optional"
          />
          <NumberForm
            label="脂質"
            value={lipid}
            onChange={setLipid}
            precision={1}
            max={999.9}
            unit="g"
            require="optional"
          />
          <NumberForm
            label="炭水化物"
            value={carbo}
            onChange={setCarbo}
            precision={1}
            max={999.9}
            unit="g"
            require="optional"
          />
        </HStack>
        <HStack w="100%">
          <TextareaForm
            label="メモ"
            value={note}
            require="optional"
            onChange={onChangeNote}
            onBlur={onBlurNote}
            isInvalid={invalidNote}
            errorText={errorTextNote}
            size="sm"
          />
        </HStack>
      </VStack>
    </ModelFormFrame>
  );
});
