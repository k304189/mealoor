import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultTextInput } from "../../../../components/atoms/form/DefaultTextInput";

afterEach(() => cleanup());

describe("Rendering", () => {
  const placeholderText = "プレースホルダーテキスト";
  const elementTestId = "testInputId";
  const onChangeFunction = jest.fn();
  const onBlurFunction = jest.fn();

  it("Normal Render", () => {
    const inputValue = "input";
    render(
      <DefaultTextInput
        onBlur={onBlurFunction}
        onChange={onChangeFunction}
        placeholder={placeholderText}
        data-testid={elementTestId}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // テキストボックスのタイプがtextであることを確認
    expect(renderTestElement.type).toBe("text");

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

  it("No Placeholder Render", () => {
    render(
      <DefaultTextInput data-testid={elementTestId} />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // プレースホルダーが表示されていないことを確認
    const placeholderElement = screen.queryByPlaceholderText(placeholderText);
    expect(placeholderElement).toBeNull();
    expect(renderTestElement.placeholder).toBe("");
  });

  it("Type Password Render", () => {
    render(
      <DefaultTextInput data-testid={elementTestId} type="password" />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();
    expect(renderTestElement.type).toBe("password");
  });

  it("Type Email Render", () => {
    render(
      <DefaultTextInput data-testid={elementTestId} type="email" />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();
    expect(renderTestElement.type).toBe("email");
  });
});
