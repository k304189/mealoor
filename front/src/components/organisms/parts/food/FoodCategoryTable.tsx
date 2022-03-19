import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  VFC,
  useEffect,
  useState,
} from "react";
import {
  Table,
  Tbody,
  Tfoot,
  Thead,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import { DefaultTextInput } from "../../../atoms/form/DefaultTextInput";
import { FoodCategorySelect } from "../../../molecules/form/FoodCategorySelect";
import { FoodUnitSelect } from "../../../molecules/form/FoodUnitSelect";
import { CloseButton } from "../../../molecules/button/CloseButton";
import { AddButton } from "../../../molecules/button/AddButton";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";

type Props = {
  foodCategories: Array<TFoodCategory>;
  setFoodCategories: Dispatch<SetStateAction<Array<TFoodCategory>>>;
  allDisabled: boolean;
  categoryDisabled: boolean;
};

export const FoodCategoryTable: VFC<Props> = memo((props) => {
  const {
    foodCategories,
    setFoodCategories,
    allDisabled,
    categoryDisabled,
  } = props;
  const [categoryId, setCategoryId] = useState(0);
  const [categoryClassName, setCategoryClassName] = useState("");
  const [commonClassName, setCommonClassName] = useState("");

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const tmpFoodCategories = [...foodCategories];
    const target = tmpFoodCategories[index];
    target.category = e.target.value;

    setFoodCategories(tmpFoodCategories);
  };

  const onChangeAmount = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const tmpFoodCategories = [...foodCategories];
    const target = tmpFoodCategories[index];
    target.amount = Number(e.target.value);

    setFoodCategories(tmpFoodCategories);
  };

  const onChangeUnit = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const tmpFoodCategories = [...foodCategories];
    const target = tmpFoodCategories[index];
    target.unit = e.target.value;

    setFoodCategories(tmpFoodCategories);
  };

  const getNewFoodCategory = (id: number) => {
    return {
      id,
      category: "",
      amount: 0,
      unit: "",
    };
  };

  const addNewFoodCategory = () => {
    setFoodCategories([...foodCategories, getNewFoodCategory(categoryId)]);
    setCategoryId(categoryId + 1);
  };

  const deleteFoodCategory = (index: number) => {
    if (foodCategories.length > 1) {
      foodCategories.splice(index, 1);
      setFoodCategories([...foodCategories]);
    } else {
      setFoodCategories([getNewFoodCategory(categoryId)]);
    }
  };

  useEffect(() => {
    if (foodCategories.length <= 0) {
      addNewFoodCategory();
    }
  }, [foodCategories]);

  useEffect(() => {
    let categoryClass = "";
    let commonClass = "";
    if (categoryDisabled && allDisabled) {
      categoryClass = "readOnly";
    }
    if (allDisabled) {
      commonClass = "readOnly";
    }
    setCategoryClassName(categoryClass);
    setCommonClassName(commonClass);
  }, [allDisabled, categoryDisabled]);

  return (
    <Table size="sm" w="100%">
      <Thead>
        <Tr>
          <Th w="50%">カテゴリ</Th>
          <Th w="20%">量</Th>
          <Th w="20%">単位</Th>
          <Th w="10%" />
        </Tr>
      </Thead>
      <Tbody>
        { foodCategories.map((fc, index) => {
          return (
            <Tr key={fc.id}>
              <Td>
                <FoodCategorySelect
                  className={categoryClassName}
                  size="xs"
                  onChange={(e) => { onChangeCategory(e, index); }}
                  value={fc.category}
                  isDisabled={categoryDisabled && allDisabled}
                />
              </Td>
              <Td>
                <DefaultTextInput
                  className={commonClassName}
                  size="xs"
                  type="number"
                  onChange={(e) => { onChangeAmount(e, index); }}
                  value={fc.amount}
                  isDisabled={allDisabled}
                />
              </Td>
              <Td>
                <FoodUnitSelect
                  className={commonClassName}
                  size="xs"
                  onChange={(e) => { onChangeUnit(e, index); }}
                  value={fc.unit}
                  isDisabled={allDisabled}
                />
              </Td>
              <Td>
                <CloseButton
                  size="xs"
                  className="transparent"
                  aria-label="deleteCategory"
                  onClick={() => { deleteFoodCategory(index); }}
                  hoverText="カテゴリ削除"
                  disabled={allDisabled}
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td alignItems="center" colSpan={4}>
            <AddButton
              aria-label="addCategory"
              className="transparent"
              size="sm"
              onClick={addNewFoodCategory}
              disabled={allDisabled}
            />
            カテゴリー追加
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  );
});
