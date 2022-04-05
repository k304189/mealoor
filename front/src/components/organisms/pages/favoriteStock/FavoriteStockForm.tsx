import { memo, VFC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { FoodCommonForm } from "../../parts/food/FoodCommonForm";
import { LocationRadio } from "../../parts/food/LocationRadio";
import { NumberForm } from "../../parts/form/NumberForm";
import { FormArea } from "../../../molecules/form/FormArea";
// import { useStockApi } from "../../../../hooks/food/useStockApi";
import { useFoodValidate } from "../../../../hooks/food/useFoodValidate";
import { useFoodCategoryValidate } from "../../../../hooks/food/useFoodCategoryValidate";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";
import { TFavoriteStock } from "../../../../types/api/TFavoriteStock";

type Props = {
  favoriteStock?: TFavoriteStock | null;
};

export const FavoriteStockForm: VFC<Props> = memo((props) => {
  // const [id, setId] = useState(0);
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

  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEatType, setInvalidEatType] = useState(false);
  const [invalidFoodType, setInvalidFoodType] = useState(false);
  const [invalidCategories, setInvalidCategories] = useState(false);
  const [invalidShop, setInvalidShop] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

  const [invalidLocation, setInvalidLocation] = useState(false);

  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextEatType, setErrorTextEatType] = useState("");
  const [errorTextFoodType, setErrorTextFoodType] = useState("");
  const [errorTextCategories, setErrorTextCategories] = useState("");
  const [errorTextShop, setErrorTextShop] = useState("");
  const [errorTextNote, setErrorTextNote] = useState("");

  const [errorTextLocation, setErrorTextLocation] = useState("");

  const [updateMode, setUpdateMode] = useState<"create" | "update">("create");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { favoriteStock = null } = props;

  const {
    validateName,
    validateEatType,
    validateFoodType,
    validateShop,
    validateNote,
    validateLocation,
  } = useFoodValidate();
  const { validateSelectedFoodCategories } = useFoodCategoryValidate();
  // const { createStock, updateStock } = useStockApi();
  const { errorToast } = useMessage();

  const onChangeLocation = (loc: string) => {
    const { invalid, errorText } = validateLocation(loc);
    setInvalidLocation(invalid);
    setErrorTextLocation(errorText);
    setLocation(loc);
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

  const onBlurLocation = () => {
    const { invalid, errorText } = validateLocation(location);
    setInvalidLocation(invalid);
    setErrorTextLocation(errorText);
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
    const { invalid: locationInv } = validateLocation(location);

    const checkResult = nameInv || eatTypeInv || foodTypeInv || shopInv
      || categoriesInv || noteInv || locationInv;

    if (checkResult) {
      onBlurName();
      onBlurShop();
      onBlurNote();
      onBlurLocation();
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

  // const getFavoriteStockJson = (): TFavoriteStock => {
  //   return {
  //     id,
  //     name,
  //     eat_type: eatType,
  //     food_type: foodType,
  //     categories,
  //     shop,
  //     price,
  //     kcal,
  //     amount,
  //     unit,
  //     protein,
  //     lipid,
  //     carbo,
  //     note,
  //     location,
  //     quantity,
  //   };
  // };

  const createFunction = async () => {
    isInvalidAllValue();
    console.log("createFunction Called");
  };

  const updateFunction = async () => {
    isInvalidAllValue();
    console.log("updateFunction Called");
  };

  useEffect(() => {
    const btnStatus = invalidName || invalidEatType || invalidFoodType
      || invalidCategories || invalidShop || invalidNote || invalidLocation;
    setButtonDisabled(btnStatus);
  }, [
    invalidName,
    invalidEatType,
    invalidFoodType,
    invalidCategories,
    invalidShop,
    invalidNote,
    invalidLocation,
  ]);

  useEffect(() => {
    if (favoriteStock) {
      // setId(favoriteStock.id);
      setName(favoriteStock.name);
      setEatType(favoriteStock.eat_type);
      setFoodType(favoriteStock.food_type);
      setCategories(favoriteStock.categories);
      setShop(favoriteStock.shop);
      setPrice(favoriteStock.price);
      setKcal(favoriteStock.kcal);
      setAmount(favoriteStock.amount);
      setUnit(favoriteStock.unit);
      setProtein(favoriteStock.protein);
      setLipid(favoriteStock.lipid);
      setCarbo(favoriteStock.carbo);
      setNote(favoriteStock.note);

      setLocation(favoriteStock.location);
      setQuantity(favoriteStock.quantity);

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
        <Box w="25%">
          <FormArea
            label="保管場所"
            require="require"
            isInvalid={invalidLocation}
            errorText={errorTextLocation}
          >
            <LocationRadio location={location} onChange={onChangeLocation} />
          </FormArea>
        </Box>
        <Box w="15%">
          <NumberForm
            label="個数"
            value={quantity}
            onChange={setQuantity}
            min={1}
            unit="個"
            require="optional"
          />
        </Box>
      </>
    </FoodCommonForm>
  );
});
