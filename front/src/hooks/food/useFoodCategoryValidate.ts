import { useCallback } from "react";

import { TValidateReturn } from "../../types/hooks/common/validate/TValidateReturn";
import { TFoodCategory } from "../../types/api/TFoodCategory";

type T = {
  validateFoodCategory: (
    foodCategory: TFoodCategory,
    allDisabled: boolean,
    categoryDisabled: boolean,
  ) => TValidateReturn;
  validateSelectedFoodCategories: (
    foodCategories: Array<TFoodCategory>,
  ) => TValidateReturn;
};

export const useFoodCategoryValidate = (): T => {
  const isEmptyCategory = (category: string) => {
    return (!category || category === "");
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
    return { invalid, errorText };
  }, []);

  const validateSelectedFoodCategories = useCallback((
    foodCategories: Array<TFoodCategory>,
  ) => {
    let invalid = false;
    let errorText = "";
    if (!foodCategories || foodCategories.length <= 0) {
      invalid = true;
      errorText = "カテゴリーが選択されていません";
    } else {
      const selectedCategoryNames = foodCategories.map((fc) => {
        return fc.category;
      });
      const distinctSelectedCategoryNames = new Set(selectedCategoryNames);
      if (selectedCategoryNames.length !== distinctSelectedCategoryNames.size) {
        invalid = true;
        errorText = "同じカテゴリーが複数選択されています";
      }
    }
    return { invalid, errorText };
  }, []);

  return { validateFoodCategory, validateSelectedFoodCategories };
};
