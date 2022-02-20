import { screen, cleanup } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import { useMessage } from "../../../../hooks/common/layout/useMessage";

beforeEach(() => cleanup());
afterEach(() => jest.useRealTimers());

describe("useMessage Test", () => {
  const { result } = renderHook(() => useMessage());

  it("Call showToast, Status is Success", () => {
    jest.useFakeTimers();
    const toastTitle = "showToastSuccess";

    // 初期画面ではトーストが表示されていないことを確認
    let toastElement = screen.queryByText(toastTitle);
    expect(toastElement).toBeNull();
    act(() => {
      result.current.showToast({
        title: toastTitle,
        status: "success",
      });
    });
    // トーストが表示されることを確認
    toastElement = screen.queryByText(toastTitle);
    expect(toastElement).not.toBeNull();
  });

  it("Call showToast, Status is Error", () => {
    jest.useFakeTimers();
    const toastTitle = "showToastError";

    // 初期画面ではトーストが表示されていないことを確認
    let toastElement = screen.queryByText(toastTitle);
    expect(toastElement).toBeNull();
    act(() => {
      result.current.showToast({
        title: toastTitle,
        status: "error",
      });
    });
    // トーストが表示されることを確認
    toastElement = screen.queryByText(toastTitle);
    expect(toastElement).not.toBeNull();
  });

  it("Call showToast, Status is Warning", () => {
    jest.useFakeTimers();
    const toastTitle = "showToastWarning";

    // 初期画面ではトーストが表示されていないことを確認
    let toastElement = screen.queryByText(toastTitle);
    expect(toastElement).toBeNull();
    act(() => {
      result.current.showToast({
        title: toastTitle,
        status: "warning",
      });
    });
    // トーストが表示されることを確認
    toastElement = screen.queryByText(toastTitle);
    expect(toastElement).not.toBeNull();
  });

  it("Call showToast, Status is Info", () => {
    jest.useFakeTimers();
    const toastTitle = "showToastInfo";

    // 初期画面ではトーストが表示されていないことを確認
    let toastElement = screen.queryByText(toastTitle);
    expect(toastElement).toBeNull();
    act(() => {
      result.current.showToast({
        title: toastTitle,
        status: "info",
      });
    });
    // トーストが表示されることを確認
    toastElement = screen.queryByText(toastTitle);
    expect(toastElement).not.toBeNull();
  });

  it("Call successToast", () => {
    jest.useFakeTimers();
    const toastTitle = "successToast";

    // 初期画面ではトーストが表示されていないことを確認
    let toastElement = screen.queryByText(toastTitle);
    expect(toastElement).toBeNull();
    act(() => {
      result.current.successToast(toastTitle);
    });
    // トーストが表示されることを確認
    toastElement = screen.queryByText(toastTitle);
    expect(toastElement).not.toBeNull();
  });

  it("Call errorToast", () => {
    jest.useFakeTimers();
    const toastTitle = "errorToast";

    // 初期画面ではトーストが表示されていないことを確認
    let toastElement = screen.queryByText(toastTitle);
    expect(toastElement).toBeNull();
    act(() => {
      result.current.errorToast(toastTitle);
    });
    // トーストが表示されることを確認
    toastElement = screen.queryByText(toastTitle);
    expect(toastElement).not.toBeNull();
  });

  it("Call warningToast", () => {
    jest.useFakeTimers();
    const toastTitle = "warningToast";

    // 初期画面ではトーストが表示されていないことを確認
    let toastElement = screen.queryByText(toastTitle);
    expect(toastElement).toBeNull();
    act(() => {
      result.current.warningToast(toastTitle);
    });
    // トーストが表示されることを確認
    toastElement = screen.queryByText(toastTitle);
    expect(toastElement).not.toBeNull();
  });

  it("Call infoToast", () => {
    jest.useFakeTimers();
    const toastTitle = "infoToast";

    // 初期画面ではトーストが表示されていないことを確認
    let toastElement = screen.queryByText(toastTitle);
    expect(toastElement).toBeNull();
    act(() => {
      result.current.infoToast(toastTitle);
    });
    // トーストが表示されることを確認
    toastElement = screen.queryByText(toastTitle);
    expect(toastElement).not.toBeNull();
  });
});
