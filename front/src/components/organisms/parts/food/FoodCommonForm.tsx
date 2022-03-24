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
  discounted: boolean;
  setDiscounted: Dispatch<SetStateAction<boolean>>;
  foodCategories: Array<TFoodCategory>;
  setFoodCategories: Dispatch<SetStateAction<Array<TFoodCategory>>>;
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
    discounted,
    setDiscounted,
    foodCategories,
    setFoodCategories,
    children = (<></>),
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    const radioGroupDisabled = eatType === "自炊" && foodType === "料理";
    setEatTypeGroupDisabled(radioGroupDisabled);
    setFoodTypeGroupDisabled(radioGroupDisabled);

    const tmpEatTypeArray: Array<TFormAttribute> = eatTypeArrayBase.map((et) => {
      let disabled = false;
      if (et.value === "自炊") {
        disabled = foodType === "料理";
      }
      return {
        value: et.value,
        disabled,
      };
    });

    const tmpFoodTypeArray: Array<TFormAttribute> = foodTypeArrayBase.map((ft) => {
      let disabled = false;
      if (ft.value === "料理") {
        disabled = eatType === "自炊";
      } else if (ft.value === "食材") {
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
