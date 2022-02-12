import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { PasswordForm } from "../../../../../components/organisms/parts/form/PasswordForm";

afterEach(() => cleanup());

describe("PasswordForm Test", () => {
  const testPassword = "testPassword";
  const onChangeFunction = jest.fn();
  const onBlurFunction = jest.fn();
  const testLabel = "testLabel";
  const testHelperText = "testHelperText";
  const testErrorText = "testErrorText";
  const dataTestid = "dataTestid";
  const typingString = "typingString";

  it("Render Only Require Element", () => {
    render(
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
      />
    );
    // 要素が存在することを確認
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(renderTestElement.value).toBe(testPassword);

    // typeがpasswordになっていることを確認
    expect(renderTestElement.type).toBe("password");

    // disabledになっていないことを確認
    expect(renderTestElement.disabled).toBeFalsy();

    // キーボード入力をしたときにonChange関数が呼び出されることを確認
    useEvent.type(renderTestElement, typingString);
    expect(onChangeFunction).toHaveBeenCalledTimes(typingString.length);

    // カーソルを外した時、onBlur関数が呼び出されることを確認
    useEvent.click(renderTestElement);
    expect(onBlurFunction).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurFunction).toHaveBeenCalledTimes(1);

    // ラベルが「パスワード」で表示されていることを確認
    const labelElement = screen.queryByText("パスワード");
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

  it("Render Defalut Placeholder", () => {
    render(
      <PasswordForm
        password=""
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
      />
    );
    // プレースホルダーが指定したものになっていることを確認
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement.placeholder).toBe("パスワード");
  });

  it("Render Set Label", () => {
    render(
      <PasswordForm
        label={testLabel}
        password=""
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
      />
    );
    // ラベルが指定したものになっていることを確認
    const labelElement = screen.queryByText(testLabel);
    expect(labelElement).not.toBeNull();

    // プレースホルダーが指定したものになっていることを確認
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement.placeholder).toBe(testLabel);
  });

  it("Render Set Require Attribute is require", () => {
    render(
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
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
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
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
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
        helperText={testHelperText}
      />
    );
    // ヘルパーテキストが表示されることを確認
    const helperTextElement = screen.queryByText(testHelperText);
    expect(helperTextElement).not.toBeNull();
  });

  it("Render Set Error Text When IsInvalid is False", () => {
    render(
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
        errorText={testErrorText}
      />
    );
    // エラーテキストが表示されないことを確認
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).toBeNull();
  });

  it("Render Set Error Text When IsInvalid is True", () => {
    render(
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
        errorText={testErrorText}
        isInvalid
      />
    );
    // エラーテキストが表示されることを確認
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).not.toBeNull();
  });

  it("Render IsDisabled is True", () => {
    render(
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
        errorText={testErrorText}
        isDisabled
      />
    );
    // disabledがTrue
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement.disabled).toBeTruthy();

    // readonlyがFalse
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
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
        errorText={testErrorText}
        isReadOnly
      />
    );
    // disabledがFalse
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement.disabled).toBeFalsy();

    // readOnlyがTrue
    expect(renderTestElement.readOnly).toBeTruthy();

    // 文字を入力してもonChangeが動かない
    useEvent.type(renderTestElement, typingString);
    expect(onChangeFunction).toHaveBeenCalledTimes(0);

    // onBlurが動く
    useEvent.click(renderTestElement);
    useEvent.tab();
    expect(onBlurFunction).toHaveBeenCalledTimes(1);

    // エラーテキストが表示されていない
    const errorTextElement = screen.queryByText(testErrorText);
    expect(errorTextElement).toBeNull();
  });

  it("Render IsInvalid is True", () => {
    render(
      <PasswordForm
        password={testPassword}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
        dataTestid={dataTestid}
        errorText={testErrorText}
        isInvalid
      />
    );
    // 文字を入力してもonChangeが動く
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
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
});
