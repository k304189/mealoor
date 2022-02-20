import { renderHook, act } from "@testing-library/react-hooks";
import { useAccountValidate } from "../../../hooks/account/useAccountValidate";
import { TValidateReturn } from "../../../types/hooks/common/validate/TValidateReturn";

describe("useAccountValidate Test", () => {
  const { result } = renderHook(() => useAccountValidate());
  let validateResult: TValidateReturn;
  it("validateEmail when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateEmail("test@test.com");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateEmail when Email is Empty", () => {
    act(() => {
      validateResult = result.current.validateEmail("");
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字のエラーメッセージである
    expect(validateResult.errorText).toBe("メールアドレスが入力されていません");
  });

  it("validateEmail when Email Length is 255", () => {
    act(() => {
      validateResult = result.current.validateEmail("a".repeat(255));
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateEmail when Email Length is 256", () => {
    act(() => {
      validateResult = result.current.validateEmail("a".repeat(256));
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが長さチェックエラーのメッセージである
    expect(validateResult.errorText).toBe("メールアドレスは255文字以下にしてください");
  });

  it("validatePassword when safe pattern", () => {
    act(() => {
      validateResult = result.current.validatePassword("password");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validatePassword when Password is Empty", () => {
    act(() => {
      validateResult = result.current.validatePassword("");
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字のエラーメッセージである
    expect(validateResult.errorText).toBe("パスワードが入力されていません");
  });

  it("validatePassword when Password Length is 30", () => {
    act(() => {
      validateResult = result.current.validatePassword("a".repeat(30));
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validatePassword when Password Length is 31", () => {
    act(() => {
      validateResult = result.current.validatePassword("a".repeat(31));
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが長さチェックエラーのメッセージである
    expect(validateResult.errorText).toBe("パスワードは30文字以下にしてください");
  });

  it("validateUsername when safe pattern", () => {
    act(() => {
      validateResult = result.current.validateUsername("testUser");
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateUsername when Username is Empty", () => {
    act(() => {
      validateResult = result.current.validateUsername("");
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが空文字のエラーメッセージである
    expect(validateResult.errorText).toBe("名前が入力されていません");
  });

  it("validateUsername when Username Length is 60", () => {
    act(() => {
      validateResult = result.current.validateUsername("a".repeat(60));
    });
    // invalidがfalseである
    expect(validateResult.invalid).toBeFalsy();
    // errorTextが空文字である
    expect(validateResult.errorText).toBe("");
  });

  it("validateUsername when Username Length is 61", () => {
    act(() => {
      validateResult = result.current.validateUsername("a".repeat(61));
    });
    // invalidがTrueである
    expect(validateResult.invalid).toBeTruthy();
    // errorTextが長さチェックエラーのメッセージである
    expect(validateResult.errorText).toBe("名前は60文字以下にしてください");
  });
});
