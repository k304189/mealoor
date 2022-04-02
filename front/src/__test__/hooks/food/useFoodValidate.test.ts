import { renderHook, act } from "@testing-library/react-hooks";

import { useFoodValidate } from "../../../hooks/food/useFoodValidate";
import { TValidateReturn } from "../../../types/hooks/common/validate/TValidateReturn";

describe("useAccountValidate Test", () => {
  const { result } = renderHook(() => useFoodValidate());
  let validateResult: TValidateReturn;
  it("validateName when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateName("テストネーム");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateName when name is empty", () => {
    act(() => {
      validateResult = result.current.validateName("");
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("名前が入力されていません");
  });

  it("validateName when name length is 60", () => {
    act(() => {
      validateResult = result.current.validateName("a".repeat(60));
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateName when name length is 61", () => {
    act(() => {
      validateResult = result.current.validateName("a".repeat(61));
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("名前は60文字以内にしてください");
  });

  it("validateEatType when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateEatType("外食");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateEatType when eat type is empty", () => {
    act(() => {
      validateResult = result.current.validateEatType("");
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("食事タイプを選択してください");
  });

  it("validateFoodType when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateFoodType("食材");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodType when food type is empty", () => {
    act(() => {
      validateResult = result.current.validateFoodType("");
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("食料タイプを選択してください");
  });

  it("validateDate when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateDate("2022-01-01");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateDate when date is empty and don't set dateName", () => {
    act(() => {
      validateResult = result.current.validateDate("");
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("日付を入力してください");
  });

  it("validateDate when date is empty and set dateName", () => {
    act(() => {
      validateResult = result.current.validateDate("", "チェック日付");
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("チェック日付を入力してください");
  });

  it("validateEatTiming when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateEatTiming("間食");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateEatTiming when eat timing is empty", () => {
    act(() => {
      validateResult = result.current.validateEatTiming("");
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("食事タイミングを選択してください");
  });

  it("validateShop when shop pattern", () => {
    act(() => {
      validateResult = result.current.validateShop("テストショップ");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateShop when shop length is 60", () => {
    act(() => {
      validateResult = result.current.validateShop("a".repeat(60));
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateShop when shop length is 61", () => {
    act(() => {
      validateResult = result.current.validateShop("a".repeat(61));
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("店は60文字以内にしてください");
  });

  it("validateNote when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateNote("メモ");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateNote when note is 100", () => {
    act(() => {
      validateResult = result.current.validateNote("a".repeat(100));
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateNote when note is 101", () => {
    act(() => {
      validateResult = result.current.validateNote("a".repeat(101));
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("メモは100文字以内にしてください");
  });

  it("validateRegisteredName when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateRegisteredName("登録名");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateRegisteredName when note is 60", () => {
    act(() => {
      validateResult = result.current.validateRegisteredName("a".repeat(60));
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateRegisteredName when note is 61", () => {
    act(() => {
      validateResult = result.current.validateRegisteredName("a".repeat(61));
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("60文字以内にしてください");
  });

  it("validateAmountNote when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateAmountNote("分量メモ");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateAmountNote when note is 10", () => {
    act(() => {
      validateResult = result.current.validateAmountNote("a".repeat(10));
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateAmountNote when note is 11", () => {
    act(() => {
      validateResult = result.current.validateAmountNote("a".repeat(11));
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("分量メモは10文字以内にしてください");
  });

  it("validateRate when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateRate(20);
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateRate when rate is zero and don't set rateName", () => {
    act(() => {
      validateResult = result.current.validateRate(0);
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("割合は0より大きい値を入力してください");
  });

  it("validateRate when rate is minus and set rateName", () => {
    act(() => {
      validateResult = result.current.validateRate(-1, "チェック率");
    });
    // invalidがtrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextがエラーメッセージである
    expect(validateResult.errorText).toBe("チェック率は0より大きい値を入力してください");
  });

});
