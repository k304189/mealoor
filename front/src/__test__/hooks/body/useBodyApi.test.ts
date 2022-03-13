import { renderHook, act } from "@testing-library/react-hooks";
import { rest } from "msw";

import { useBodyApi } from "../../../hooks/body/useBodyApi";
import { TBody } from "../../../types/api/TBody";
import {
  URL_BODY_GET,
  URL_BODY_CREATE,
  URL_BODY_UPDATE,
} from "../../../constants/urls";
import {
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST,
  HTTP_404_NOT_FOUND,
} from "../../../constants/httpStatus";

import { server } from "../../../mocks/server";
import { bodyResponse } from "../../../mocks/dummy/bodyResponse";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

describe("useBodyApi Test", () => {
  const testBody = bodyResponse;
  const callCheckFunction = jest.fn();
  const testToken = "testToken";

  it("call getBody, API Result is OK", async () => {
    const { result } = renderHook(() => useBodyApi());
    localStorage.setItem("auth_token", testToken);

    // 体調情報を取得
    await act(async () => {
      try {
        const httpStatus = (await result.current.getBody(bodyResponse.date));
        // 体調データが取得されていることを確認
        expect(result.current.body).not.toBeNull();
        expect(result.current.body).toEqual(bodyResponse);
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_200_OK);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  // 体調情報を取得時、エラー発生時
  it("call getBody, API Result is NG", async () => {
    const { result } = renderHook(() => useBodyApi());
    localStorage.setItem("auth_token", testToken);

    server.use(
      rest.get(`${URL_BODY_GET}${bodyResponse.date}`, (req, res, ctx) => {
        return res(ctx.status(HTTP_400_BAD_REQUEST))
      }),
    );

    // 体調情報を取得
    await act(async () => {
      try {
        const httpStatus = (await result.current.getBody(bodyResponse.date));
        callCheckFunction();
      } catch (e: any) {
        // 体調情報が取得できていないことを確認
        expect(result.current.body).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_400_BAD_REQUEST);
      }
      // エラーが発生して、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  // 体調情報を登録
  it("call createBody, API Result is OK", async () => {
    const { result } = renderHook(() => useBodyApi());
    localStorage.setItem("auth_token", testToken);

    // 体調情報を登録
    await act(async () => {
      try {
        const httpStatus = (await result.current.createBody(bodyResponse));
        // 登録した体調データが取得されていることを確認
        expect(result.current.body).not.toBeNull();
        expect(result.current.body).toEqual(bodyResponse);
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_201_CREATED);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  // 体調情報を登録時、エラーが発生
  it("call createBody, API Result is NG", async () => {
    const { result } = renderHook(() => useBodyApi());
    localStorage.setItem("auth_token", testToken);

    server.use(
      rest.post(URL_BODY_CREATE, (req, res, ctx) => {
        return res(ctx.status(HTTP_400_BAD_REQUEST))
      }),
    );

    // 体調情報を登録
    await act(async () => {
      try {
        const httpStatus = (await result.current.createBody(bodyResponse));
        callCheckFunction();
      } catch (e: any) {
        // 体調データがNULLになっていることを確認
        expect(result.current.body).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_400_BAD_REQUEST);
      }
      // エラーが発生して、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  // 体調情報を更新
  it("call updateBody, API Result is OK", async () => {
    const { result } = renderHook(() => useBodyApi());
    localStorage.setItem("auth_token", testToken);

    // 体調情報を更新
    await act(async () => {
      try {
        const httpStatus = (await result.current.updateBody(bodyResponse));
        // 更新した体調データが取得されていることを確認
        expect(result.current.body).not.toBeNull();
        expect(result.current.body).toEqual(bodyResponse);
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(httpStatus).toBe(HTTP_200_OK);
      } catch {
        callCheckFunction();
      }
      // エラーが発生していないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });

  // 体調情報を更新時、エラーが発生
  it("call updateBody, API Result is NG", async () => {
    const { result } = renderHook(() => useBodyApi());
    localStorage.setItem("auth_token", testToken);

    server.use(
      rest.patch(`${URL_BODY_UPDATE}${bodyResponse.date}`, (req, res, ctx) => {
        return res(ctx.status(HTTP_400_BAD_REQUEST))
      }),
    );

    // 体調情報を更新
    await act(async () => {
      try {
        const httpStatus = (await result.current.updateBody(bodyResponse));
        callCheckFunction();
      } catch (e: any) {
        // 体調データがNULLになっていることを確認
        expect(result.current.body).toBeNull();
        // 戻り値にHTTPステータスがセットされていることを確認
        expect(e.response.status).toBe(HTTP_400_BAD_REQUEST);
      }
      // エラーが発生して、後続処理が呼び出されないことを確認
      expect(callCheckFunction).toHaveBeenCalledTimes(0)
    });
  });
});
