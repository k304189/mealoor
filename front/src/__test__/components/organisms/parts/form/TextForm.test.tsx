import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { TextForm } from "../../../../../components/organisms/parts/form/TextForm";

afterEach(() => cleanup());

describe("Rendering TextForm", () => {
  const testValue = "testValue";
  const onChangeFunction = jest.fn();
  const onBlurFunction = jest.fn();
  const leftAddonString = "leftAddonString";
  const rightAddonString = "rightAddonString";
  const testLabel = "testLabel";
  const testHelperText = "testHelperText";
  const testErrorText = "testErrorText";
  const typingString = "typingString";

  it("Render Only Require Element", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
      />
    );
    // 要素のプレースホルダーがラベルと同じであることを確認
    const renderTestElement = screen.queryByPlaceholderText(testLabel) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(renderTestElement.value).toBe(testValue);

    // typeがtextになっていることを確認
    expect(renderTestElement.type).toBe("text");

    // disabledになっていないことを確認
    expect(renderTestElement.disabled).toBeFalsy();

    // キーボード入力をしたときにonChange関数が呼び出されることを確認
    useEvent.type(renderTestElement, typingString);
    expect(onChangeFunction).toHaveBeenCalledTimes(typingString.length);

    // カーソルを外した時、onBlur関数が呼び出されないことを確認
    useEvent.click(renderTestElement);
    expect(onBlurFunction).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurFunction).toHaveBeenCalledTimes(0);

    // キストボックスの左に文字が表示されないことを確認
    const leftAddonElement = screen.queryByText(leftAddonString);
    expect(leftAddonElement).toBeNull();

    // キストボックスの右に文字が表示されないことを確認
    const rightAddonElement = screen.queryByText(rightAddonString);
    expect(rightAddonElement).toBeNull();

    // ラベルが表示されていることを確認
    const labelElement = screen.queryByText(testLabel);
    expect(labelElement).not.toBeNull();

    // 必須のバッヂが表示されないことを確認
    const requireBadgeElement = screen.queryByText("必須");
    expect(requireBadgeElement).toBeNull();

    // 任意のバッヂが表示されないことを確認
    const optionalBadgeElement = screen.queryByText("任意");
    expect(optionalBadgeElement).toBeNull();

    // ヘルパーテキストが表示されないことを確認
    const helperTextElement = screen.queryByText(testHelperText);
    expect(helperTextElement).toBeNull();

    // エラーテキストが表示されないことを確認
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).toBeNull();
  });

  it("Render Set Type Email", () => {
    render(
      <TextForm
        value={testValue}
        type="email"
        onChange={onChangeFunction}
        label={testLabel}
      />
    );
    // typeがemailになっていることを確認
    const renderTestElement = screen.queryByDisplayValue(testValue) as HTMLInputElement;
    expect(renderTestElement.type).toBe("email");
  });

  it("Render Set OnBlur", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        label={testLabel}
      />
    );
    // カーソルを外した時、onBlur関数が呼び出されないことを確認
    const renderTestElement = screen.queryByDisplayValue(testValue) as HTMLInputElement;
    useEvent.click(renderTestElement);
    expect(onBlurFunction).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurFunction).toHaveBeenCalledTimes(1);
  });

  it("Render Set Left Addon When IsReadOnly is False", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        leftAddon={leftAddonString}
      />
    );
    // テキストボックスの左に文字が表示されないことを確認
    const leftAddonElement = screen.queryByText(leftAddonString);
    expect(leftAddonElement).toBeNull();
  });

  it("Render Set Left Addon When IsReadOnly is True", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        leftAddon={leftAddonString}
        isReadOnly
      />
    );
    // テキストボックスの左に文字が表示されることを確認
    const leftAddonElement = screen.queryByText(leftAddonString);
    expect(leftAddonElement).not.toBeNull();
  });

  it("Render Set Right Addon When IsReadOnly is False", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        rightAddon={rightAddonString}
      />
    );
    // テキストボックスの右に文字が表示されないことを確認
    const rightAddonElement = screen.queryByText(rightAddonString);
    expect(rightAddonElement).toBeNull();
  });

  it("Render Set Right Addon When IsReadOnly is True", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        rightAddon={rightAddonString}
        isReadOnly
      />
    );
    // テキストボックスの右に文字が表示されることを確認
    const rightAddonElement = screen.queryByText(rightAddonString);
    expect(rightAddonElement).not.toBeNull();
  });

  it("Render Set Require Attribute is require", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        require="require"
      />
    );
    // 必須のバッヂが表示されることを確認
    const requireBadgeElement = screen.queryByText("必須");
    expect(requireBadgeElement).not.toBeNull();

    // 任意のバッヂが表示されないことを確認
    const optionalBadgeElement = screen.queryByText("任意");
    expect(optionalBadgeElement).toBeNull();
  });

  it("Render Set Require Attribute is optional", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        require="optional"
      />
    );
    // 必須のバッヂが表示されないことを確認
    const requireBadgeElement = screen.queryByText("必須");
    expect(requireBadgeElement).toBeNull();

    // 任意のバッヂが表示されることを確認
    const optionalBadgeElement = screen.queryByText("任意");
    expect(optionalBadgeElement).not.toBeNull();
  });

  it("Render Set Helper Text", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        helperText={testHelperText}
      />
    );
    // ヘルパーテキストが表示されないことを確認
    const helperTextElement = screen.queryByText(testHelperText);
    expect(helperTextElement).not.toBeNull();
  });

  it("Render Set Error Text When IsInvalid is False", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        errorText={testErrorText}
      />
    );
    // エラーテキストが表示されないことを確認
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).toBeNull();
  });

  it("Render Set Error Text When IsInvalid is True", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        label={testLabel}
        errorText={testErrorText}
        isInvalid
      />
    );
    // エラーテキストが表示されないことを確認
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).not.toBeNull();
  });

  it("Render IsDisabled is True", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        label={testLabel}
        errorText={testErrorText}
        isDisabled
      />
    );
    // 要素がdisabled
    const renderTestElement = screen.queryByDisplayValue(testValue) as HTMLInputElement;
    expect(renderTestElement.disabled).toBeTruthy();

    // 要素がreadonlyがfalse
    expect(renderTestElement.readOnly).toBeFalsy();

    // 文字を入力してもonChangeが動かない
    useEvent.type(renderTestElement, typingString);
    expect(onChangeFunction).toHaveBeenCalledTimes(0);

    // onBlurが動かない
    useEvent.click(renderTestElement);
    useEvent.tab();
    expect(onBlurFunction).toHaveBeenCalledTimes(0);

    // エラーテキストが表示されていない
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).toBeNull();
  });

  it("Render IsReadOnly is True", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        label={testLabel}
        errorText={testErrorText}
        isReadOnly
      />
    );
    // 要素がdisabled
    const renderTestElement = screen.queryByDisplayValue(testValue) as HTMLInputElement;
    expect(renderTestElement.disabled).toBeTruthy();

    // 要素がreadOnlyがTrue
    expect(renderTestElement.readOnly).toBeTruthy();

    // 文字を入力してもonChangeが動かない
    useEvent.type(renderTestElement, typingString);
    expect(onChangeFunction).toHaveBeenCalledTimes(0);

    // onBlurが動かない
    useEvent.click(renderTestElement);
    useEvent.tab();
    expect(onBlurFunction).toHaveBeenCalledTimes(0);

    // エラーテキストが表示されていない
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).toBeNull();
  });

  it("Render IsInvalid is True", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        label={testLabel}
        errorText={testErrorText}
        isInvalid
      />
    );
    // 文字を入力してもonChangeが動く
    const renderTestElement = screen.queryByDisplayValue(testValue) as HTMLInputElement;
    useEvent.type(renderTestElement, typingString);
    expect(onChangeFunction).toHaveBeenCalledTimes(typingString.length);

    // onBlurが動く
    useEvent.click(renderTestElement);
    useEvent.tab();
    expect(onBlurFunction).toHaveBeenCalledTimes(1);

    // エラーテキストが表示されている
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).not.toBeNull();
  });

  it("Render setPlaceholder is False", () => {
    render(
      <TextForm
        value={testValue}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        label={testLabel}
        errorText={testErrorText}
        setPlaceholder={false}
      />
    );
    // プレースホルダーが空白になっている
    const renderTestElement = screen.queryByDisplayValue(testValue) as HTMLInputElement;
    expect(renderTestElement.placeholder).toBe("");

    // エラーテキストが表示されていない
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).toBeNull();
  });
});
