import { useCallback } from "react";

import { TValidateReturn } from "../../types/hooks/common/validate/TValidateReturn";

type T = {
  validateName: (name: string) => TValidateReturn;
  validateEatType: (eatType: string) => TValidateReturn;
  validateFoodType: (foodType: string) => TValidateReturn;
  validateDate: (date: string) => TValidateReturn;
  validateEatTiming: (eatTiming: string) => TValidateReturn;
  validateShop: (shop: string) => TValidateReturn;
  validateNote: (note: string) => TValidateReturn;
  validateRegisteredName: (registeredName: string) => TValidateReturn;
  validateAmountNote: (amountNote: string) => TValidateReturn;
};

export const useFoodValidate = (): T => {
  const validateName = useCallback((name: string) => {
    const maxLength = 60;
    let invalid = false;
    let errorText = "";
    if (!name || name === "") {
      invalid = true;
      errorText = "名前が入力されていません";
    } else if (name.length > maxLength) {
      invalid = true;
      errorText = `名前は${maxLength}文字以内にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validateEatType = useCallback((eatType: string) => {
    let invalid = false;
    let errorText = "";
    if (!eatType || eatType === "") {
      invalid = true;
      errorText = "食事タイプを選択してください";
    }
    return { invalid, errorText };
  }, []);

  const validateFoodType = useCallback((foodType: string) => {
    let invalid = false;
    let errorText = "";
    if (!foodType || foodType === "") {
      invalid = true;
      errorText = "食料タイプを選択してください";
    }
    return { invalid, errorText };
  }, []);

  const validateDate = useCallback((date: string) => {
    let invalid = false;
    let errorText = "";
    if (!date || date === "") {
      invalid = true;
      errorText = "食事日を入力してください";
    }
    return { invalid, errorText };
  }, []);

  const validateEatTiming = useCallback((eatTiming: string) => {
    let invalid = false;
    let errorText = "";
    if (!eatTiming || eatTiming === "") {
      invalid = true;
      errorText = "食事タイミングを選択してください";
    }
    return { invalid, errorText };
  }, []);

  const validateShop = useCallback((shop: string) => {
    const maxLength = 60;
    let invalid = false;
    let errorText = "";
    if (shop.length > maxLength) {
      invalid = true;
      errorText = `店は${maxLength}文字以内にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validateNote = useCallback((note: string) => {
    const maxLength = 100;
    let invalid = false;
    let errorText = "";
    if (note.length > maxLength) {
      invalid = true;
      errorText = `メモは${maxLength}文字以内にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validateRegisteredName = useCallback((registeredName: string) => {
    const maxLength = 60;
    let invalid = false;
    let errorText = "";
    if (registeredName.length > maxLength) {
      invalid = true;
      errorText = `${maxLength}文字以内にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validateAmountNote = useCallback((amountNote: string) => {
    const maxLength = 10;
    let invalid = false;
    let errorText = "";
    if (amountNote.length > maxLength) {
      invalid = true;
      errorText = `分量メモは${maxLength}文字以内にしてください`;
    }
    return { invalid, errorText };
  }, []);

  return {
    validateName,
    validateEatType,
    validateFoodType,
    validateDate,
    validateEatTiming,
    validateShop,
    validateNote,
    validateRegisteredName,
    validateAmountNote,
  };
};
