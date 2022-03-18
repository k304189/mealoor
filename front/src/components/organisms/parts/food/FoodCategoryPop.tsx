import { Dispatch, memo, SetStateAction, useEffect, useState, VFC } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
} from "@chakra-ui/react";

import { FoodCategoryTable } from "./FoodCategoryTable";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";

type Props = {
  foodCategories: Array<TFoodCategory>;
  setFoodCategories: Dispatch<SetStateAction<Array<TFoodCategory>>>;
  foodType: "食材" | "料理";
  eatType?: "外食" | "中食" | "自炊" | "";
};

export const FoodCategoryPop: VFC<Props> = memo((props) => {
  const { foodCategories, setFoodCategories, foodType, eatType = "" } = props;
  const [allDisabled, setAllDisabled] = useState(false);
  const [categoryDisabled, setCategoryDisabled] = useState(false);
  const [editMessage, setEditMessage] = useState("");

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
    <Popover>
      <PopoverTrigger>
        <Button variant="link">ポップ</Button>
      </PopoverTrigger>
      <PopoverContent w="100%">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>カテゴリー選択</PopoverHeader>
        <PopoverBody>
          <Text fontSize="xs">{editMessage}</Text>
          <FoodCategoryTable
            foodCategories={foodCategories}
            setFoodCategories={setFoodCategories}
            allDisabled={allDisabled}
            categoryDisabled={categoryDisabled}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});
