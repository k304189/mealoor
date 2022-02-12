import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { PasswordInput } from "../../../../components/molecules/form/PasswordInput";

afterEach(() => cleanup());

describe("Rendering", () => {
  const placeholderText = "プレースホルダーテキスト";
  const elementTestId = "testInputId";
  const password = "password";
  const onChangeFunction = jest.fn();
  const onBlurFunction = jest.fn();

  it("Normal Render", () => {
    const inputValue = "input";
    render(
      <PasswordInput
        password={password}
        onBlur={onBlurFunction}
        onChange={onChangeFunction}
        placeholder={placeholderText}
        dataTestid={elementTestId}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 表示切り替えボタンが表示されていることを確認
    const toggleButtonElement = screen.queryByTestId(`${elementTestId}ViewButton`) as HTMLInputElement;
    expect(toggleButtonElement).not.toBeNull();

    // テキストボックスのValueが設定したものであることを確認
    expect(renderTestElement.value).toBe(password);

    // テキストボックスのタイプがpasswordであることを確認
    expect(renderTestElement.type).toBe("password");

    // プレースホルダーの設定が正しいことを確認
    expect(renderTestElement.placeholder).toBe(placeholderText);

    // 文字入力するとonChange関数が呼び出されることを確認
    useEvent.type(renderTestElement, inputValue);
    expect(onChangeFunction).toHaveBeenCalledTimes(inputValue.length);

    // クリックするとonBlur関数が呼び出されないことを確認
    useEvent.click(renderTestElement);
    expect(onBlurFunction).toHaveBeenCalledTimes(0);

    // タブボタンをクリックすると、onBlur関数が呼び出されることを確認
    useEvent.tab();
    expect(onBlurFunction).toHaveBeenCalledTimes(1);
  });

  it("Render No Placeholder", () => {
    render(
      <PasswordInput
        password={password}
        onBlur={onBlurFunction}
        onChange={onChangeFunction}
        dataTestid={elementTestId}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // プレースホルダーの設定が正しいことを確認
    expect(renderTestElement.placeholder).toBe("");
  });

  it("Render No data-testid", () => {
    render(
      <PasswordInput
        password={password}
        onBlur={onBlurFunction}
        onChange={onChangeFunction}
        placeholder={placeholderText}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByPlaceholderText(placeholderText) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // テストIDが空白のものが2つ存在することを確認（テキスト・切り替えボタン）
    const toggleButtonElement = screen.queryAllByTestId("");
    expect(toggleButtonElement.length).toBe(2);

    // プレースホルダーの設定が正しいことを確認
    expect(renderTestElement.placeholder).toBe(placeholderText);
  });

  it("Click Toggle Button", () => {
    render(
      <PasswordInput
        password={password}
        onBlur={onBlurFunction}
        onChange={onChangeFunction}
        placeholder={placeholderText}
        dataTestid={elementTestId}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 切り替えボタンが表示されていることを確認
    const toggleButtonElement = screen.queryByTestId(`${elementTestId}ViewButton`) as HTMLInputElement;
    expect(toggleButtonElement).not.toBeNull();

    // 描画時の各ステータスを確認
    expect(renderTestElement.type).toBe("password");
    expect(toggleButtonElement.getAttribute("aria-label")).toBe("表示");

    // 切り替えボタンクリック（1回目）
    useEvent.click(toggleButtonElement);
    expect(renderTestElement.type).toBe("text");
    expect(toggleButtonElement.getAttribute("aria-label")).toBe("非表示");

    // 切り替えボタンクリック（2回目）
    useEvent.click(toggleButtonElement);
    expect(renderTestElement.type).toBe("password");
    expect(toggleButtonElement.getAttribute("aria-label")).toBe("表示");

    // 切り替えボタンクリック（3回目）
    useEvent.click(toggleButtonElement);
    expect(renderTestElement.type).toBe("text");
    expect(toggleButtonElement.getAttribute("aria-label")).toBe("非表示");

    // 切り替えボタンクリック（4回目）
    useEvent.click(toggleButtonElement);
    expect(renderTestElement.type).toBe("password");
    expect(toggleButtonElement.getAttribute("aria-label")).toBe("表示");

  });
});
