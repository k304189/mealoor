import { renderHook, act } from "@testing-library/react-hooks";
import { useBodyValidation } from "../../../hooks/body/useBodyValidation";
import { TValidateReturn } from "../../../types/hooks/common/validate/TValidateReturn";

describe("useBodyValidation Test", () => {
  const { result } = renderHook(() => useBodyValidation());
  let validateResult: TValidateReturn;
  it("validateDate when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateDate("2022-01-01");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateDate when Date is Empty", () => {
    act(() => {
      validateResult = result.current.validateDate("");
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字のエラーメッセージである
    expect(validateResult.errorText).toBe("日付が入力されていません");
  });
});
