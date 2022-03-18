import { ChangeEvent, Dispatch, SetStateAction, memo, VFC, useEffect } from "react";
import { Table, Tbody, Thead, Tr, Th, Td } from "@chakra-ui/react";

import { DefaultTextInput } from "../../../atoms/form/DefaultTextInput";
import { FoodCategorySelect } from "../../../molecules/form/FoodCategorySelect";
import { FoodUnitSelect } from "../../../molecules/form/FoodUnitSelect";
import { CloseButton } from "../../../molecules/button/CloseButton";
import { TFoodCategory } from "../../../../types/api/TFoodCategory";

type Props = {
  foodCategories: Array<TFoodCategory>;
  setFoodCategories: Dispatch<SetStateAction<Array<TFoodCategory>>>;
};

export const FoodCategoryTable: VFC<Props> = memo((props) => {
  let trIndex = 0;
  const { foodCategories, setFoodCategories } = props;

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

  useEffect(() => {
    if (foodCategories.length <= 0) {
      setFoodCategories([{
        id: trIndex,
        category: "",
        amount: 0,
        unit: "",
      }]);
      trIndex += 1;
    }
  }, []);

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
                  size="xs"
                  onChange={(e) => { onChangeCategory(e, index); }}
                  value={fc.category}
                />
              </Td>
              <Td>
                <DefaultTextInput
                  size="xs"
                  type="number"
                  onChange={(e) => { onChangeAmount(e, index); }}
                  value={fc.amount}
                />
              </Td>
              <Td>
                <FoodUnitSelect
                  size="xs"
                  onChange={(e) => { onChangeUnit(e, index); }}
                  value={fc.unit}
                />
              </Td>
              <Td><CloseButton size="xs" aria-label="deleteCategory" /></Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
});
