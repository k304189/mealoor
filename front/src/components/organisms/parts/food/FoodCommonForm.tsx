import {
  ChangeEvent,
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  VFC,
} from "react";
import { Box, HStack, VStack, useDisclosure } from "@chakra-ui/react";

import { FoodCategoryPop } from "./FoodCategoryPop";
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

type Props = {
  updateMode: "create" | "update";
  createFunction: () => Promise<void>;
  updateFunction: () => Promise<void>;
  buttonDisabled: boolean;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  invalidName: boolean;
  errorTextName: string;
  onBlurName: () => void;
  eatType: string;
  setEatType: Dispatch<SetStateAction<string>>;
  invalidEatType: boolean;
  errorTextEatType: string;
  foodType: string;
  setFoodType: Dispatch<SetStateAction<string>>;
  invalidFoodType: boolean;
  errorTextFoodType: string;
  shop: string;
  setShop: Dispatch<SetStateAction<string>>;
  invalidShop: boolean;
  errorTextShop: string;
  onBlurShop: () => void;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
  invalidNote: boolean;
  errorTextNote: string;
  onBlurNote: () => void;
  unit: string;
  setUnit: Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  kcal: number;
  setKcal: Dispatch<SetStateAction<number>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  protein: number;
  setProtein: Dispatch<SetStateAction<number>>;
  lipid: number;
  setLipid: Dispatch<SetStateAction<number>>;
  carbo: number;
  setCarbo: Dispatch<SetStateAction<number>>;
  discounted?: boolean;
  setDiscounted?: Dispatch<SetStateAction<boolean>> | (() => void);
  foodCategories: Array<TFoodCategory>;
  setFoodCategories: Dispatch<SetStateAction<Array<TFoodCategory>>>;
  invalidFoodCategories: boolean;
  errorTextFoodCategories: string;
  children?: ReactNode;
};

export const FoodCommonForm: VFC<Props> = memo((props) => {
  const {
    updateMode,
    createFunction,
    updateFunction,
    buttonDisabled,
    name,
    setName,
    invalidName,
    errorTextName,
    onBlurName,
    eatType,
    setEatType,
    invalidEatType,
    errorTextEatType,
    foodType,
    setFoodType,
    invalidFoodType,
    errorTextFoodType,
    shop,
    setShop,
    invalidShop,
    errorTextShop,
    onBlurShop,
    note,
    setNote,
    invalidNote,
    errorTextNote,
    onBlurNote,
    unit,
    setUnit,
    price,
    setPrice,
    kcal,
    setKcal,
    amount,
    setAmount,
    protein,
    setProtein,
    lipid,
    setLipid,
    carbo,
    setCarbo,
    discounted = false,
    setDiscounted = () => {},
    foodCategories,
    setFoodCategories,
    invalidFoodCategories,
    errorTextFoodCategories,
    children = (<></>),
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const eatTypeArrayBase = [
    { value: "??????" },
    { value: "??????" },
    { value: "??????" },
  ];
  const [eatTypeArray, setEatTypeArray] = useState<Array<TFormAttribute>>(eatTypeArrayBase);
  const [eatTypeGroupDisabled, setEatTypeGroupDisabled] = useState(false);

  const foodTypeArrayBase = [
    { value: "??????" },
    { value: "??????" },
  ];
  const [foodTypeArray, setFoodTypeArray] = useState<Array<TFormAttribute>>(foodTypeArrayBase);
  const [foodTypeGroupDisabled, setFoodTypeGroupDisabled] = useState(false);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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

  useEffect(() => {
    const radioGroupDisabled = eatType === "??????" && foodType === "??????";
    setEatTypeGroupDisabled(radioGroupDisabled);
    setFoodTypeGroupDisabled(radioGroupDisabled);

    const tmpEatTypeArray: Array<TFormAttribute> = eatTypeArrayBase.map((et) => {
      let disabled = false;
      if (et.value === "??????") {
        disabled = foodType === "??????";
      }
      return {
        value: et.value,
        disabled,
      };
    });

    const tmpFoodTypeArray: Array<TFormAttribute> = foodTypeArrayBase.map((ft) => {
      let disabled = false;
      if (ft.value === "??????") {
        disabled = eatType === "??????";
      } else if (ft.value === "??????") {
        disabled = foodCategories.length > 1;
      }
      return {
        value: ft.value,
        disabled,
      };
    });

    setEatTypeArray(tmpEatTypeArray);
    setFoodTypeArray(tmpFoodTypeArray);
  }, [eatType, foodType, foodCategories]);

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
              label="??????"
              require="require"
              value={name}
              onChange={onChangeName}
              onBlur={onBlurName}
              isInvalid={invalidName}
              errorText={errorTextName}
            />
          </Box>
          { "discounted" in props ? (
            <Box w="10%" h="100%">
              <CheckboxButton isChecked={discounted} onChange={onChangeDiscounted}>
                ?????????
              </CheckboxButton>
            </Box>
          ) : (
            <></>
          )}
          <Box w="20%">
            <FormArea
              label="???????????????"
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
              label="???????????????"
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
              label="???????????????"
              require="require"
              isInvalid={invalidFoodCategories}
              errorText={errorTextFoodCategories}
            >
              <FoodCategoryPop
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                foodCategories={foodCategories}
                setFoodCategories={setFoodCategories}
                foodType={foodType}
                eatType={eatType}
              />
            </FormArea>
          </Box>
        </HStack>
        <HStack w="100%" gap={5}>
          {children}
          <Box w="25%">
            <TextForm
              label="???"
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
            label="??????"
            value={price}
            onChange={setPrice}
            unit="???"
            require="optional"
          />
          <NumberForm
            label="????????????"
            value={kcal}
            onChange={setKcal}
            unit="kcal"
            require="optional"
          />
          <NumberForm
            label="???"
            value={amount}
            onChange={setAmount}
            precision={1}
            require="optional"
          />
          <FormArea
            label="??????"
            require="optional"
          >
            <FoodUnitSelect value={unit} onChange={onChangeUnit} />
          </FormArea>
          <NumberForm
            label="???????????????"
            value={protein}
            onChange={setProtein}
            precision={1}
            max={999.9}
            unit="g"
            require="optional"
          />
          <NumberForm
            label="??????"
            value={lipid}
            onChange={setLipid}
            precision={1}
            max={999.9}
            unit="g"
            require="optional"
          />
          <NumberForm
            label="????????????"
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
            label="??????"
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
