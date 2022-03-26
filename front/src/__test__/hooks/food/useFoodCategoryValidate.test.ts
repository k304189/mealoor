import { renderHook, act } from "@testing-library/react-hooks";
import { useFoodCategoryValidate } from "../../../hooks/food/useFoodCategoryValidate";
import { TValidateReturn } from "../../../types/hooks/common/validate/TValidateReturn";

describe("useFoodCategoryValidate Test", () => {
  const { result } = renderHook(() => useFoodCategoryValidate());
  let validateResult: TValidateReturn;
  const okTestData = {
    id: 1,
    category: "test",
    amount: 0,
    unit: "g",
  };
  const ngCategoryTestData = {
    id: 1,
    category: "",
    amount: 0,
    unit: "g",
  };
  const ngUnitTestData = {
    id: 1,
    category: "test",
    amount: 0,
    unit: "",
  };
  const ngCategoryAndUnitTestData = {
    id: 1,
    category: "",
    amount: 0,
    unit: "",
  }
  it("validateFoodCategory safe pattern when allDisabled is True and categoryDisabled is True ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(okTestData, true, true);
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodCategory safe pattern when allDisabled is True and categoryDisabled is False ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(okTestData, true, false);
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodCategory safe pattern when allDisabled is False and categoryDisabled is True ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(okTestData, false, true);
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodCategory safe pattern when allDisabled is False and categoryDisabled is False ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(okTestData, false, false);
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodCategory category error when allDisabled is True and categoryDisabled is True ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngCategoryTestData, true, true);
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodCategory category error when allDisabled is True and categoryDisabled is False ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngCategoryTestData, true, false);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("カテゴリーが選択されていないデータが存在します");
  });

  it("validateFoodCategory category error when allDisabled is False and categoryDisabled is True ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngCategoryTestData, false, true);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("カテゴリーが選択されていないデータが存在します");
  });

  it("validateFoodCategory category error when allDisabled is False and categoryDisabled is False ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngCategoryTestData, false, false);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("カテゴリーが選択されていないデータが存在します");
  });

  it("validateFoodCategory unit error when allDisabled is True and categoryDisabled is True ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngUnitTestData, true, true);
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodCategory unit error when allDisabled is True and categoryDisabled is False ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngUnitTestData, true, false);
    });
    // invalidがFalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodCategory category and unit error when allDisabled is True and categoryDisabled is True ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngCategoryAndUnitTestData, true, true);
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateFoodCategory category and unit error when allDisabled is True and categoryDisabled is False ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngCategoryAndUnitTestData, true, false);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("カテゴリーが選択されていないデータが存在します");
  });

  it("validateFoodCategory category and unit error when allDisabled is False and categoryDisabled is True ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngCategoryAndUnitTestData, false, true);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("カテゴリーが選択されていないデータが存在します");
  });

  it("validateFoodCategory category and unit error when allDisabled is False and categoryDisabled is False ", () => {
    act(() => {
      validateResult = result.current.validateFoodCategory(ngCategoryAndUnitTestData, false, false);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("カテゴリーが選択されていないデータが存在します");
  });

  it("validateSelectedFoodCategories When Safe Pattern", () => {
    act(() => {
      validateResult = result.current.validateSelectedFoodCategories([
        { id: 1, category: "米", amount: 0, unit: "g" },
        { id: 2, category: "卵", amount: 10, unit: "ml" },
        { id: 3, category: "肉", amount: 20, unit: "g" },
      ]);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateSelectedFoodCategories When Empty Array", () => {
    act(() => {
      validateResult = result.current.validateSelectedFoodCategories([]);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("カテゴリーが選択されていません");
  });

  it("validateSelectedFoodCategories When Exists Same Category", () => {
    act(() => {
      validateResult = result.current.validateSelectedFoodCategories([
        { id: 1, category: "米", amount: 0, unit: "g" },
        { id: 2, category: "卵", amount: 10, unit: "ml" },
        { id: 3, category: "米", amount: 20, unit: "g" },
      ]);
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("同じカテゴリーが複数選択されています");
  });
});
