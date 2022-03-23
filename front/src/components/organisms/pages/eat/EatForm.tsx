import { ChangeEvent, memo, VFC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { FoodCommonForm } from "../../parts/food/FoodCommonForm";
import { EatTimingRadio } from "../../parts/food/EatTimingRadio";
import { TextForm } from "../../parts/form/TextForm";
import { FormArea } from "../../../molecules/form/FormArea";
import { useFoodValidate } from "../../../../hooks/food/useFoodValidate";
import { useEatApi } from "../../../../hooks/food/useEatApi";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";
import { TEat } from "../../../../types/api/TEat";

type Props = {
  eat?: TEat | null;
};

export const EatForm: VFC<Props> = memo((props) => {
  const [id, setId] = useState(0);
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

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEatType, setInvalidEatType] = useState(false);
  const [invalidFoodType, setInvalidFoodType] = useState(false);
  const [invalidShop, setInvalidShop] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidEatTiming, setInvalidEatTiming] = useState(false);

  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextEatType, setErrorTextEatType] = useState("");
  const [errorTextFoodType, setErrorTextFoodType] = useState("");
  const [errorTextShop, setErrorTextShop] = useState("");
  const [errorTextNote, setErrorTextNote] = useState("");
  const [errorTextDate, setErrorTextDate] = useState("");
  const [errorTextEatTiming, setErrorTextEatTiming] = useState("");

  const [updateMode, setUpdateMode] = useState<"create" | "update">("create");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { eat = null } = props;
  const {
    validateName,
    validateEatType,
    validateFoodType,
    validateDate,
    validateEatTiming,
    validateShop,
    validateNote,
  } = useFoodValidate();
  const { createEat, updateEat } = useEatApi();

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
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
    const { invalid: dateInv } = validateDate(date);
    const { invalid: eatTimingInv, errorText: eatTimingErrTxt } = validateEatTiming(eatTiming);

    const checkResult = nameInv || eatTypeInv || foodTypeInv || shopInv
      || noteInv || dateInv || eatTimingInv;

    if (checkResult) {
      onBlurName();
      onBlurShop();
      onBlurNote();
      setInvalidEatType(eatTypeInv);
      setErrorTextEatType(eatTypeErrTxt);
      setInvalidFoodType(foodTypeInv);
      setErrorTextFoodType(foodTypeErrTxt);
      onBlurDate();
      setInvalidEatTiming(eatTimingInv);
      setErrorTextEatTiming(eatTimingErrTxt);
    }
    return checkResult;
  };

  const getEatJson = (): TEat => {
    return {
      id,
      name,
      eat_type: eatType,
      food_type: foodType,
      categories,
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
      eat_timing: eatTiming,
      date,
    };
  };

  const createFunction = async () => {
    const checkResult = isInvalidAllValue();
    if (!checkResult) {
      await createEat(getEatJson());
    }
  };

  const updateFunction = async () => {
    const checkResult = isInvalidAllValue();
    if (!checkResult) {
      await updateEat(getEatJson());
    }
  };

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

  useEffect(() => {
    if (eat) {
      setId(eat.id);
      setName(eat.name);
      setEatType(eat.eat_type);
      setFoodType(eat.food_type);
      setCategories(eat.categories);
      setDate(eat.date);
      setEatTiming(eat.eat_timing);
      setShop(eat.shop);
      setPrice(eat.price);
      setKcal(eat.kcal);
      setAmount(eat.amount);
      setUnit(eat.unit);
      setProtein(eat.protein);
      setLipid(eat.lipid);
      setCarbo(eat.carbo);
      setDiscounted(eat.discounted);
      setNote(eat.note);

      setUpdateMode("update");
    }
  }, []);

  return (
    <FoodCommonForm
      updateMode={updateMode}
      createFunction={createFunction}
      updateFunction={updateFunction}
      buttonDisabled={buttonDisabled}
      name={name}
      setName={setName}
      invalidName={invalidName}
      errorTextName={errorTextName}
      onBlurName={onBlurName}
      eatType={eatType}
      setEatType={setEatType}
      invalidEatType={invalidEatType}
      errorTextEatType={errorTextEatType}
      foodType={foodType}
      setFoodType={setFoodType}
      invalidFoodType={invalidFoodType}
      errorTextFoodType={errorTextFoodType}
      shop={shop}
      setShop={setShop}
      invalidShop={invalidShop}
      errorTextShop={errorTextShop}
      onBlurShop={onBlurShop}
      note={note}
      setNote={setNote}
      invalidNote={invalidNote}
      errorTextNote={errorTextNote}
      onBlurNote={onBlurNote}
      unit={unit}
      setUnit={setUnit}
      price={price}
      setPrice={setPrice}
      kcal={kcal}
      setKcal={setKcal}
      amount={amount}
      setAmount={setAmount}
      protein={protein}
      setProtein={setProtein}
      lipid={lipid}
      setLipid={setLipid}
      carbo={carbo}
      setCarbo={setCarbo}
      discounted={discounted}
      setDiscounted={setDiscounted}
      foodCategories={categories}
      setFoodCategories={setCategories}
    >
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
    </FoodCommonForm>
  );
});
