import { renderHook, act } from "@testing-library/react-hooks";

import { useRequestHeader } from "../../../../hooks/common/auth/useRequestHeader";
import { TRequestHeader } from "../../../../types/hooks/common/auth/TRequestHeader";
import { TResponseHeader } from "../../../../types/hooks/common/auth/TResponseHeader";

afterEach(() => {
  localStorage.clear();
});

describe("useRequestHeader Test", () => {
  const { result } = renderHook(() => useRequestHeader());
  const dummyAuthorization: TRequestHeader = { Authorization: "" };
  const response: TResponseHeader = {
    token: "token_test",
    username: "username_test",
  };

  it("setRequestHeader Called", () => {
    act(() => {
      result.current.setRequestHeader(response);
    });
    // localStorageのキーauth_tokenがセットされている
    expect(localStorage.getItem("auth_token")).toBe(response.token);
    // localStorageのキーusernameがセットされている
    expect(localStorage.getItem("username")).toBe(response.username);
  });

  it("getRequestHeader Called when requestHeader exists", () => {
    let requestHeader: TRequestHeader = dummyAuthorization;
    let requestHeaderKeys: Array<string> = [];
    let isError = false;
    act(() => {
      result.current.setRequestHeader(response);
      try {
        requestHeader = result.current.getRequestHeader();
      } catch(e) {
        isError = true;
      }
    });
    requestHeaderKeys = Object.keys(requestHeader);
    // リクエストヘッダーのキーの数が1つ
    expect(requestHeaderKeys.length).toBe(1);
    // リクエストヘッダーのキーAuthorizationにtokenが返されることを確認
    expect(requestHeader["Authorization"]).toBe(`token ${response.token}`);
    // エラーが発生していないことを確認
    expect(isError).toBeFalsy();
  });

  it("getRequestHeader Called when requestHeader doesn't exist", () => {
    let requestHeader: TRequestHeader = dummyAuthorization;
    act(() => {
      try {
        requestHeader = result.current.getRequestHeader();
      } catch(e) {
        // エラーが発生していることを確認
        expect(e).toStrictEqual(Error("認証情報がありません"));
      }
    });
    // リクエストヘッダーが更新されていないことを確認
    expect(requestHeader).toBe(dummyAuthorization);
  });

  it("hasRequestHeader Called when requestHeader exists", () => {
    let hasRequest = false;
    act(() => {
      result.current.setRequestHeader(response);
      hasRequest = result.current.hasRequestHeader();
    });
    // 結果がTrueになることを確認
    expect(hasRequest).toBeTruthy();
  });

  it("hasRequestHeader Called when requestHeader doesn't exist", () => {
    let hasRequest = true;
    act(() => {
      hasRequest = result.current.hasRequestHeader();
    });
    // 結果がFalseになることを確認
    expect(hasRequest).toBeFalsy();
  });

  it("clearRequestHeader Called", () => {
    act(() => {
      result.current.setRequestHeader(response);
    });
    // localStorageのキーauth_tokenがセットされている
    expect(localStorage.getItem("auth_token")).toBe(response.token);
    // localStorageのキーusernameがセットされている
    expect(localStorage.getItem("username")).toBe(response.username);

    act(() => {
      result.current.clearRequestHeader();
    });
    // localStorageのキーauth_tokenが削除されている
    expect(localStorage.getItem("auth_token")).toBeNull();
    // localStorageのキーusernameが削除されている
    expect(localStorage.getItem("username")).toBeNull();
  });
});
