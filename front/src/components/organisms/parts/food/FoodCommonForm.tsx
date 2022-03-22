import { ChangeEvent, memo, ReactNode, VFC, useEffect, useState } from "react";
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

type Props = {
  model: string;
  updateMode: "create" | "update";
  createFunction: () => Promise<void>;
  updateFunction: () => Promise<void>;
};

export const FoodCommonForm: VFC<Props> = memo((props) => {
  const { model, updateMode, createFunction, updateFunction } = props;
  const [name, setName] = useState("");
  const [eatType, setEatType] = useState("");
  const [foodType, setFoodType] = useState("");
  const [categories, setCategories] = useState<Array<TFoodCategory>>([]);
  const [expirationDate, setExpirationDate] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
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
  const [eatTiming, setEatTiming] = useState("");
  const [formArea, setFormArea] = useState<ReactNode>(<Box />);

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

  const stockForm = (
    <>
      <Box w="15%">
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
      <Box w="15%">
        <NumberForm
          label="個数"
          value={quantity}
          onChange={setQuantity}
          unit="個"
          require="optional"
        />
      </Box>
      <Box w="30%">
        <FormArea label="保存場所" require="optional">
          <LocationRadio
            location={location}
            onChange={setLocation}
          />
        </FormArea>
      </Box>
    </>
  );

  const foodForm = (
    <>
      <Box w="15%">
        <NumberForm
          label="個数"
          value={quantity}
          onChange={setQuantity}
          unit="個"
          require="optional"
        />
      </Box>
      <Box w="30%">
        <FormArea label="保存場所" require="optional">
          <LocationRadio
            location={location}
            onChange={setLocation}
          />
        </FormArea>
      </Box>
    </>
  );

  const eatForm = (
    <>
      <Box w="15%">
        <TextForm
          label="食事日"
          type="date"
          require="require"
          value={date}
          onChange={onChangeDate}
        />
      </Box>
      <Box w="30%">
        <FormArea
          label="食事タイミング"
          require="require"
        >
          <EatTimingRadio eatTiming={eatTiming} onChange={setEatTiming} />
        </FormArea>
      </Box>
    </>
  );

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
    let fa: ReactNode;
    if (model === "stock") {
      fa = stockForm;
    } else if (model === "eat") {
      fa = eatForm;
    } else if (model === "food") {
      fa = foodForm;
    } else {
      fa = (<Box />);
    }
    setFormArea(fa);
  }, [model]);

  return (
    <ModelFormFrame
      createFunction={createFunction}
      updateFunction={updateFunction}
      updateMode={updateMode}
    >
      <VStack spacing={2}>
        <HStack w="100%">
          <Box w="30%">
            <TextForm
              label="名前"
              require="require"
              value={name}
              onChange={onChangeName}
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
          {formArea}
          <Box w="25%">
            <TextForm
              label="店"
              require="optional"
              value={shop}
              onChange={onChangeShop}
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
            unit="g"
            require="optional"
          />
          <NumberForm
            label="脂質"
            value={lipid}
            onChange={setLipid}
            precision={1}
            unit="g"
            require="optional"
          />
          <NumberForm
            label="炭水化物"
            value={carbo}
            onChange={setCarbo}
            precision={1}
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
            size="sm"
          />
        </HStack>
      </VStack>
    </ModelFormFrame>
  );
});
