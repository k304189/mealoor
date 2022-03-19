import { useCallback } from "react";

import { TValidateReturn } from "../../types/hooks/common/validate/TValidateReturn";
import { TFoodCategory } from "../../types/api/TFoodCategory";

type T = {
  validateFoodCategory: (
    foodCategory: TFoodCategory,
    allDisabled: boolean,
    categoryDisabled: boolean,
  ) => TValidateReturn;
};

export const useFoodCategoryValidate = (): T => {
  const isEmptyCategory = (category: string) => {
    return (!category || category === "");
  };

  const isEmptyUnit = (unit: string) => {
    return (!unit || unit === "");
  };

  const validateFoodCategory = useCallback((
    foodCategory: TFoodCategory,
    allDisabled: boolean,
    categoryDisabled: boolean,
  ) => {
    let invalid = false;
    let errorText = "";
    if (!(categoryDisabled && allDisabled)) { // カテゴリーが選択可能の場合
      invalid = isEmptyCategory(foodCategory.category);
      errorText = invalid ? "カテゴリーが選択されていないデータが存在します" : "";
    }
    if (!(invalid || allDisabled)) { // 全項目が選択可能の場合
      invalid = isEmptyUnit(foodCategory.unit);
      errorText = invalid ? "単位が選択されていないデータが存在します" : "";
    }
    return { invalid, errorText };
  }, []);

  return { validateFoodCategory };
};
