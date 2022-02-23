import { renderHook, act } from "@testing-library/react-hooks";
import { rest } from "msw";

import { useAuthApi } from "../../../../hooks/common/auth/useAuthApi";
import {
  URL_SIGN_IN,
  URL_SIGN_UP,
  URL_SIGN_OUT,
} from "../../../../constants/urls";
import {
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
  HTTP_401_UNAUTHORIZED,
} from "../../../../constants/httpStatus";
import { server } from "../../../../mocks/server";
import { signInResponse } from "../../../../mocks/dummy/signInResponse";
import { signUpResponse } from "../../../../mocks/dummy/signUpResponse";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

describe("useAuthApi Test", () => {
  const testEmail = "email@test.com";
  const testPassword = "password";
  const testToken = "testToken";
  const testUsername = "testUsername";
  const signInUser = { email: testEmail, password: testPassword };
  const signUpUser = {
    email: testEmail,
    password: testPassword,
    username: signUpResponse.username,
    passwordConf: testPassword,
  };
  const callCheckFunction = jest.fn();

  it("call signIn, API Result is OK", async () => {
    const { result } = renderHook(() => useAuthApi());
    // 実行前はlocalStrageに値が存在しないことを確認
    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(localStorage.getItem("username")).toBeNull();

    // ログイン実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.signIn(signInUser));
        // localStorageに戻り値がセットされている
        expect(localStorage.getItem("auth_token")).toBe(signInResponse.token);
        expect(localStorage.getItem("username")).toBe(signInResponse.username);
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_200_OK);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call signIn, API Result is NG", async () => {
    const { result } = renderHook(() => useAuthApi());
    server.use(
      rest.post(URL_SIGN_IN, (req, res, ctx) => {
        return res(ctx.status(HTTP_401_UNAUTHORIZED))
      }),
    );
    // 実行前はlocalStrageに値が存在しないことを確認
    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(localStorage.getItem("username")).toBeNull();

    // ログイン実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.signIn(signInUser));
        callCheckFunction();
      } catch (e: any) {
        // localStorageに戻り値がセットされている
        expect(localStorage.getItem("auth_token")).toBeNull();
        expect(localStorage.getItem("username")).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_401_UNAUTHORIZED);
      }
      // エラーが発生せず、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call signUp, API Result is OK", async () => {
    const { result } = renderHook(() => useAuthApi());
    const signUpToken = signUpResponse.token;
    const signUpUsername = signUpResponse.username;

    // 実行前はlocalStrageに値が存在しないことを確認
    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(localStorage.getItem("username")).toBeNull();

    // ログイン実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.signUp(signUpUser));
        // localStorageに戻り値がセットされている
        expect(localStorage.getItem("auth_token")).toBe(signUpToken);
        expect(localStorage.getItem("username")).toBe(signUpUsername);
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_201_CREATED);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call signUp, API Result is NG", async () => {
    const { result } = renderHook(() => useAuthApi());
    server.use(
      rest.post(URL_SIGN_UP, (req, res, ctx) => {
        return res(ctx.status(HTTP_400_BAD_REQUEST))
      }),
    );
    // 実行前はlocalStrageに値が存在しないことを確認
    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(localStorage.getItem("username")).toBeNull();

    // ログイン実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.signUp(signUpUser));
        callCheckFunction();
      } catch (e: any) {
        // localStorageに戻り値がセットされている
        expect(localStorage.getItem("auth_token")).toBeNull();
        expect(localStorage.getItem("username")).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_400_BAD_REQUEST);
      }
      // エラーが発生せず、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call signOut, API Result is OK", async () => {
    const { result } = renderHook(() => useAuthApi());
    localStorage.setItem("auth_token", testToken);
    localStorage.setItem("username", testUsername);

    // サインアウト実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.signOut());
        // localStorageに戻り値がセットされている
        expect(localStorage.getItem("auth_token")).toBeNull();
        expect(localStorage.getItem("username")).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_204_NO_CONTENT);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call signOut, API Result is NG", async () => {
    const { result } = renderHook(() => useAuthApi());
    localStorage.setItem("auth_token", testToken);
    localStorage.setItem("username", testUsername);
    server.use(
      rest.delete(URL_SIGN_OUT, (req, res, ctx) => {
        return res(ctx.status(HTTP_400_BAD_REQUEST))
      }),
    );

    // ログイン実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.signOut());
        callCheckFunction();
      } catch (e: any) {
        // localStorageに戻り値がセットされている
        // 実行前はlocalStrageに値が削除されていないことを確認
        expect(localStorage.getItem("auth_token")).toBe(testToken);
        expect(localStorage.getItem("username")).toBe(testUsername);
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_400_BAD_REQUEST);
      }
      // エラーが発生せず、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });
});
