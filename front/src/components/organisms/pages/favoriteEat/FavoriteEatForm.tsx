import { ChangeEvent, memo, VFC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { FoodCommonForm } from "../../parts/food/FoodCommonForm";
import { TextForm } from "../../parts/form/TextForm";
import { useFavoriteEatApi } from "../../../../hooks/food/useFavoriteEatApi";
import { useFoodValidate } from "../../../../hooks/food/useFoodValidate";
import { useFoodCategoryValidate } from "../../../../hooks/food/useFoodCategoryValidate";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";
import { TFavoriteEat } from "../../../../types/api/TFavoriteEat";

type Props = {
  favoriteEat?: TFavoriteEat | null;
};

export const FavoriteEatForm: VFC<Props> = memo((props) => {
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

  const [registeredName, setRegisteredName] = useState("");
  const [amountNote, setAmountNote] = useState("");

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEatType, setInvalidEatType] = useState(false);
  const [invalidFoodType, setInvalidFoodType] = useState(false);
  const [invalidCategories, setInvalidCategories] = useState(false);
  const [invalidShop, setInvalidShop] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

  const [invalidRegisteredName, setInvalidRegisteredName] = useState(false);
  const [invalidAmountNote, setInvalidAmountNote] = useState(false);

  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextEatType, setErrorTextEatType] = useState("");
  const [errorTextFoodType, setErrorTextFoodType] = useState("");
  const [errorTextCategories, setErrorTextCategories] = useState("");
  const [errorTextShop, setErrorTextShop] = useState("");
  const [errorTextNote, setErrorTextNote] = useState("");

  const [errorTextRegisteredName, setErrorTextRegisteredName] = useState("");
  const [errorTextAmountNote, setErrorTextAmountNote] = useState("");

  const [updateMode, setUpdateMode] = useState<"create" | "update">("create");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { favoriteEat = null } = props;
  const {
    validateName,
    validateEatType,
    validateFoodType,
    validateShop,
    validateNote,
    validateRegisteredName,
    validateAmountNote,
  } = useFoodValidate();
  const { createFavoriteEat, updateFavoriteEat } = useFavoriteEatApi();
  const { validateSelectedFoodCategories } = useFoodCategoryValidate();
  const { errorToast } = useMessage();

  const onChangeRegisteredName = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisteredName(e.target.value);
  };

  const onChangeAmountNote = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountNote(e.target.value);
  };

  const onBlurName = () => {
    const { invalid, errorText } = validateName(name);
    setInvalidName(invalid);
    setErrorTextName(errorText);
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

  const onBlurRegisteredName = () => {
    const { invalid, errorText } = validateRegisteredName(registeredName);
    setInvalidRegisteredName(invalid);
    setErrorTextRegisteredName(errorText);
  };

  const onBlurAmountNote = () => {
    const { invalid, errorText } = validateAmountNote(amountNote);
    setInvalidAmountNote(invalid);
    setErrorTextAmountNote(errorText);
  };

  const isInvalidAllValue = () => {
    const { invalid: nameInv } = validateName(name);
    const { invalid: eatTypeInv, errorText: eatTypeErrTxt } = validateEatType(eatType);
    const { invalid: foodTypeInv, errorText: foodTypeErrTxt } = validateFoodType(foodType);
    const {
      invalid: categoriesInv,
      errorText: categoriesErrTxt,
    } = validateSelectedFoodCategories(categories);
    const { invalid: shopInv } = validateShop(shop);
    const { invalid: noteInv } = validateNote(note);
    const { invalid: registeredNameInv } = validateRegisteredName(registeredName);
    const { invalid: amountNoteInv } = validateAmountNote(amountNote);

    const checkResult = nameInv || eatTypeInv || foodTypeInv || shopInv
      || categoriesInv || noteInv || registeredNameInv || amountNoteInv;

    if (checkResult) {
      onBlurName();
      onBlurShop();
      onBlurNote();
      onBlurRegisteredName();
      onBlurAmountNote();
      setInvalidEatType(eatTypeInv);
      setErrorTextEatType(eatTypeErrTxt);
      setInvalidFoodType(foodTypeInv);
      setErrorTextFoodType(foodTypeErrTxt);
      setInvalidCategories(categoriesInv);
      setErrorTextCategories(categoriesErrTxt);

      errorToast("入力値に不備があります");
      throw new Error();
    }
  };

  const getFavoriteEatJson = (): TFavoriteEat => {
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
      note,
      registered_name: registeredName,
      amount_note: amountNote,
    };
  };

  const createFunction = async () => {
    isInvalidAllValue();
    await createFavoriteEat(getFavoriteEatJson());
  };

  const updateFunction = async () => {
    isInvalidAllValue();
    await updateFavoriteEat(getFavoriteEatJson());
  };

  useEffect(() => {
    const btnStatus = invalidName || invalidEatType || invalidFoodType
      || invalidCategories || invalidRegisteredName || invalidAmountNote
      || invalidShop || invalidNote;
    setButtonDisabled(btnStatus);
  }, [
    invalidName,
    invalidEatType,
    invalidFoodType,
    invalidCategories,
    invalidRegisteredName,
    invalidAmountNote,
    invalidShop,
    invalidNote,
  ]);

  useEffect(() => {
    if (favoriteEat) {
      setId(favoriteEat.id);
      setName(favoriteEat.name);
      setEatType(favoriteEat.eat_type);
      setFoodType(favoriteEat.food_type);
      setCategories(favoriteEat.categories);
      setRegisteredName(favoriteEat.registered_name);
      setAmountNote(favoriteEat.amount_note);
      setShop(favoriteEat.shop);
      setPrice(favoriteEat.price);
      setKcal(favoriteEat.kcal);
      setAmount(favoriteEat.amount);
      setUnit(favoriteEat.unit);
      setProtein(favoriteEat.protein);
      setLipid(favoriteEat.lipid);
      setCarbo(favoriteEat.carbo);
      setNote(favoriteEat.note);

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
      foodCategories={categories}
      setFoodCategories={setCategories}
      invalidFoodCategories={invalidCategories}
      errorTextFoodCategories={errorTextCategories}
    >
      <>
        <Box w="30%">
          <TextForm
            label="食事登録名"
            require="optional"
            value={registeredName}
            onChange={onChangeRegisteredName}
            onBlur={onBlurRegisteredName}
            isInvalid={invalidRegisteredName}
            errorText={errorTextRegisteredName}
          />
        </Box>
        <Box w="15%">
          <TextForm
            label="分量メモ"
            require="optional"
            value={amountNote}
            onChange={onChangeAmountNote}
            onBlur={onBlurAmountNote}
            isInvalid={invalidAmountNote}
            errorText={errorTextAmountNote}
          />
        </Box>
      </>
    </FoodCommonForm>
  );
});
