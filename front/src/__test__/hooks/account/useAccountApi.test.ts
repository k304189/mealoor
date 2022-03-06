import { renderHook, act } from "@testing-library/react-hooks";
import { rest } from "msw";

import { useAccountApi } from "../../../hooks/account/useAccountApi";
import { TAccount } from "../../../types/api/TAccount";
import {
  URL_ACCOUNT_GET,
  URL_ACCOUNT_UPDATE,
  URL_ACCOUNT_WITHDRAW,
} from "../../../constants/urls";
import {
  HTTP_200_OK,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
} from "../../../constants/httpStatus";

import { server } from "../../../mocks/server";
import { accountResponse } from "../../../mocks/dummy/accountResponse";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

describe("useAccountApi Test", () => {
  const testAccount = accountResponse[0];
  const callCheckFunction = jest.fn();
  const testToken = "testToken";

  it("call getAccount, API Result is OK", async () => {
    const { result } = renderHook(() => useAccountApi());
    localStorage.setItem("auth_token", testToken);

    // アカウント情報を取得
    await act(async () => {
      try {
        const httpStatus = (await result.current.getAccount());
        // Accountにアカウント情報が取得されていることを確認
        expect(result.current.account).not.toBeNull();
        expect(result.current.account).toEqual(testAccount);
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_200_OK);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call getAccount, API Result is NG", async () => {
    const { result } = renderHook(() => useAccountApi());
    localStorage.setItem("auth_token", testToken);

    server.use(
      rest.get(URL_ACCOUNT_GET, (req, res, ctx) => {
        return res(ctx.status(HTTP_400_BAD_REQUEST))
      }),
    );

    // ログイン実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.getAccount());
        callCheckFunction();
      } catch (e: any) {
        // Accountにアカウント情報が取得されていることを確認
        expect(result.current.account).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_400_BAD_REQUEST);
      }
      // エラーが発生して、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call updateAccount, API Result is OK", async () => {
    const { result } = renderHook(() => useAccountApi());
    localStorage.setItem("auth_token", testToken);

    // アカウント情報を取得
    await act(async () => {
      try {
        const httpStatus = (await result.current.updateAccount(testAccount));
        // Accountにアカウント情報がセットされていないことを確認
        expect(result.current.account).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_200_OK);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call updateAccount, API Result is NG", async () => {
    const { result } = renderHook(() => useAccountApi());
    localStorage.setItem("auth_token", testToken);

    server.use(
      rest.patch(URL_ACCOUNT_UPDATE, (req, res, ctx) => {
        return res(ctx.status(HTTP_400_BAD_REQUEST))
      }),
    );

    // ログイン実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.updateAccount(testAccount));
        callCheckFunction();
      } catch (e: any) {
        // Accountにアカウント情報が取得されていないことを確認
        expect(result.current.account).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_400_BAD_REQUEST);
      }
      // エラーが発生して、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call withdrawAccount, API Result is OK", async () => {
    const { result } = renderHook(() => useAccountApi());
    localStorage.setItem("auth_token", testToken);

    // アカウント情報を取得
    await act(async () => {
      try {
        const httpStatus = (await result.current.withdrawAccount());
        // 認証情報が削除されていることを確認
        expect(localStorage.getItem("auth_token")).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_204_NO_CONTENT);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  it("call withdrawAccount, API Result is NG", async () => {
    const { result } = renderHook(() => useAccountApi());
    localStorage.setItem("auth_token", testToken);

    server.use(
      rest.delete(URL_ACCOUNT_WITHDRAW, (req, res, ctx) => {
        return res(ctx.status(HTTP_400_BAD_REQUEST))
      }),
    );

    // ログイン実行
    await act(async () => {
      try {
        const httpStatus = (await result.current.withdrawAccount());
        callCheckFunction();
      } catch (e: any) {
        // 認証情報が削除されていないことを確認
        expect(localStorage.getItem("auth_token")).toBe(testToken);
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_400_BAD_REQUEST);
      }
      // エラーが発生して、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });
});
