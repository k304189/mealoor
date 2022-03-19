import { Dispatch, memo, SetStateAction, useEffect, useState, VFC } from "react";
import {
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

import { FoodCategoryTable } from "./FoodCategoryTable";
import { DefaultPopover } from "../../../molecules/layout/DefaultPopover";
import { useFoodCategoryValidate } from "../../../../hooks/food/useFoodCategoryValidate";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  foodCategories: Array<TFoodCategory>;
  setFoodCategories: Dispatch<SetStateAction<Array<TFoodCategory>>>;
  foodType: "食材" | "料理";
  eatType?: "外食" | "中食" | "自炊" | "";
};

export const FoodCategoryPop: VFC<Props> = memo((props) => {
  const defaultTrrigerMsg = "カテゴリー";
  const { isOpen, onOpen, onClose, foodCategories, setFoodCategories, foodType, eatType = "" } = props;
  const { validateFoodCategory } = useFoodCategoryValidate();
  const [allDisabled, setAllDisabled] = useState(false);
  const [categoryDisabled, setCategoryDisabled] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [categoryErrorText, setcategoryErrorText] = useState("");
  const [triggerMsg, setTriggerMsg] = useState(defaultTrrigerMsg);

  const onClosePop = () => {
    let outputMsg = "";
    const existInvalid = foodCategories.some((fc) => {
      const { invalid, errorText } = validateFoodCategory(fc, allDisabled, categoryDisabled);
      outputMsg = errorText;
      return invalid;
    });
    setcategoryErrorText(outputMsg);
    if (!existInvalid) {
      onClose();
    }
  };

  const changeTriggerMsg = () => {
    const selectedFoodCategoryNum = foodCategories.length;
    let trgMsg = defaultTrrigerMsg;
    if (selectedFoodCategoryNum === 1 && foodCategories[0].category !== "") {
      trgMsg = foodCategories[0].category;
    } else if (selectedFoodCategoryNum >= 2) {
      trgMsg = `${selectedFoodCategoryNum}カテゴリー選択中`;
    }
    setTriggerMsg(trgMsg);
  };

  useEffect(() => {
    changeTriggerMsg();
  }, [foodCategories]);

  useEffect(() => {
    const adflg = !(foodType === "料理" && ["外食", "中食"].includes(eatType));
    const cdflg = foodType !== "食材";
    let editMsg = "";

    if (!adflg) {
      editMsg = "複数カテゴリーの登録が可能です";
    } else if (!cdflg) {
      editMsg = "1カテゴリーのみの登録が可能です";
    } else {
      editMsg = "カテゴリー情報の参照のみで更新できません";
    }

    setAllDisabled(adflg);
    setCategoryDisabled(cdflg);
    setEditMessage(editMsg);
  }, [foodType, eatType]);

  return (
    <DefaultPopover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClosePop}
      popTrigger={(<Button variant="link">{triggerMsg}</Button>)}
      popHeader={(<Box>カテゴリー選択</Box>)}
      popBody={(
        <>
          <Text fontSize="sm" color="red">{categoryErrorText}</Text>
          <Text fontSize="xs">{editMessage}</Text>
          <FoodCategoryTable
            foodCategories={foodCategories}
            setFoodCategories={setFoodCategories}
            allDisabled={allDisabled}
            categoryDisabled={categoryDisabled}
          />
        </>
      )}
    />
  );
});
