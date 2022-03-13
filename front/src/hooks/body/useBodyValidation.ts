import { useCallback } from "react";

import { TValidateReturn } from "../../types/hooks/common/validate/TValidateReturn";

type T = {
  validateDate: (date: string) => TValidateReturn;
};

export const useBodyValidation = (): T => {
  const validateDate = useCallback((date: string) => {
    let invalid = false;
    let errorText = "";
    if (!date || date === "") {
      invalid = true;
      errorText = "日付が入力されていません";
    }
    return { invalid, errorText };
  }, []);

  return { validateDate };
};
