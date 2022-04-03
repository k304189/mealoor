import { ChangeEvent, memo, VFC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { FoodCommonForm } from "../../parts/food/FoodCommonForm";
import { LocationRadio } from "../../parts/food/LocationRadio";
import { TextForm } from "../../parts/form/TextForm";
import { NumberForm } from "../../parts/form/NumberForm";
import { FormArea } from "../../../molecules/form/FormArea";
import { useFoodValidate } from "../../../../hooks/food/useFoodValidate";
import { useFoodCategoryValidate } from "../../../../hooks/food/useFoodCategoryValidate";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";
import { TStock } from "../../../../types/api/TStock";

type Props = {
  stock?: TStock | null;
};

export const StockForm: VFC<Props> = memo((props) => {
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

  const [limit, setLimit] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [remain, setRemain] = useState(100);

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEatType, setInvalidEatType] = useState(false);
  const [invalidFoodType, setInvalidFoodType] = useState(false);
  const [invalidCategories, setInvalidCategories] = useState(false);
  const [invalidShop, setInvalidShop] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

  const [invalidLimit, setInvalidLimit] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);

  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextEatType, setErrorTextEatType] = useState("");
  const [errorTextFoodType, setErrorTextFoodType] = useState("");
  const [errorTextCategories, setErrorTextCategories] = useState("");
  const [errorTextShop, setErrorTextShop] = useState("");
  const [errorTextNote, setErrorTextNote] = useState("");

  const [errorTextLimit, setErrorTextLimit] = useState("");
  const [errorTextLocation, setErrorTextLocation] = useState("");

  const [updateMode, setUpdateMode] = useState<"create" | "update">("create");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { stock = null } = props;

  const {
    validateName,
    validateEatType,
    validateFoodType,
    validateShop,
    validateNote,
    validateDate,
    validateLocation,
  } = useFoodValidate();
  const { validateSelectedFoodCategories } = useFoodCategoryValidate();
  const { errorToast } = useMessage();

  const onChangeLimit = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(e.target.value);
  };

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

  const onBlurLimit = () => {
    const { invalid, errorText } = validateDate(limit, "賞味期限");
    setInvalidLimit(invalid);
    setErrorTextLimit(errorText);
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
    const { invalid: limitInv } = validateDate(limit);
    const { invalid: locationInv } = validateLocation(location);

    const checkResult = nameInv || eatTypeInv || foodTypeInv || shopInv
      || categoriesInv || noteInv || limitInv || locationInv;

    if (checkResult) {
      onBlurName();
      onBlurShop();
      onBlurNote();
      onBlurLimit();
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

  const getStockJson = (): TStock => {
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
      limit,
      location,
      quantity,
      remain,
    };
  };

  const createFunction = async () => {
    isInvalidAllValue();
    console.log(getStockJson());
  };

  const updateFunction = async () => {
    isInvalidAllValue();
    console.log(getStockJson());
  };

  useEffect(() => {
    const btnStatus = invalidName || invalidEatType || invalidFoodType
      || invalidCategories || invalidShop || invalidNote || invalidLimit
      || invalidLocation;
    setButtonDisabled(btnStatus);
  }, [
    invalidName,
    invalidEatType,
    invalidFoodType,
    invalidCategories,
    invalidShop,
    invalidNote,
    invalidLimit,
    invalidLocation,
  ]);

  useEffect(() => {
    if (stock) {
      setId(stock.id);
      setName(stock.name);
      setEatType(stock.eat_type);
      setFoodType(stock.food_type);
      setCategories(stock.categories);
      setShop(stock.shop);
      setPrice(stock.price);
      setKcal(stock.kcal);
      setAmount(stock.amount);
      setUnit(stock.unit);
      setProtein(stock.protein);
      setLipid(stock.lipid);
      setCarbo(stock.carbo);
      setNote(stock.note);

      setLimit(stock.limit);
      setLocation(stock.location);
      setQuantity(stock.quantity);
      setRemain(stock.remain);

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
        <Box w="20%">
          <TextForm
            label="賞味期限"
            type="date"
            require="require"
            value={limit}
            onChange={onChangeLimit}
            onBlur={onBlurLimit}
            isInvalid={invalidLimit}
            errorText={errorTextLimit}
          />
        </Box>
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
        <Box w="15%">
          <TextForm
            label="残量"
            type="number"
            value={remain}
            onChange={() => {}}
            rightAddon="%"
            isReadOnly
          />
        </Box>
      </>
    </FoodCommonForm>
  );
});
