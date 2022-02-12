import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultTextInput } from "../../../../components/atoms/form/DefaultTextInput";
import { FormArea } from "../../../../components/molecules/form/FormArea";

describe("Rendering", () => {
  const formLabel = "ラベル";
  const helperText = "ヘルパーテキスト";
  const errorText = "エラーテキスト";
  const placeholderText = "プレースホルダーテキスト";
  const elementTestId = "testInputId";
  const onChangeTextFunction = jest.fn();
  const typeText = "type";

  it("Normal Render", () => {
    render(
      <FormArea label={formLabel}>
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByText(formLabel);
    expect(renderTestElement).not.toBeNull();

    // 「必須」バッヂが表示されていないことを確認
    const requireBadgeElement = screen.queryByText("必須");
    expect(requireBadgeElement).toBeNull();

    // 「任意」バッヂが表示されていないことを確認
    const optionalBadgeElement = screen.queryByText("任意");
    expect(optionalBadgeElement).toBeNull();

    // ヘルパーテキストが表示されていないことを確認
    const heplerTextElement = screen.queryByText(helperText);
    expect(heplerTextElement).toBeNull();

    // エラーテキストが表示されていないことを確認
    const errorTextElement = screen.queryByText(errorText);
    expect(errorTextElement).toBeNull();

    // テキストボックスが表示されていることを確認
    const textElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(textElement).not.toBeNull();

    // エラーテキストが表示されていないことを確認
    useEvent.type(textElement, typeText);
    expect(onChangeTextFunction).toHaveBeenCalledTimes(typeText.length);
  });

  it("Render Add RequireBadge", () => {
    render(
      <FormArea label={formLabel} require="require">
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );

    // 「必須」バッヂが表示されていることを確認
    const requireBadgeElement = screen.queryByText("必須");
    expect(requireBadgeElement).not.toBeNull();

    // 「任意」バッヂが表示されていないことを確認
    const optionalBadgeElement = screen.queryByText("任意");
    expect(optionalBadgeElement).toBeNull();
  });

  it("Render Add OptionalBadge", () => {
    render(
      <FormArea label={formLabel} require="optional">
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );

    // 「必須」バッヂが表示されていないことを確認
    const requireBadgeElement = screen.queryByText("必須");
    expect(requireBadgeElement).toBeNull();

    // 「任意」バッヂが表示されていることを確認
    const optionalBadgeElement = screen.queryByText("任意");
    expect(optionalBadgeElement).not.toBeNull();
  });

  it("Render Add HelperText", () => {
    render(
      <FormArea label={formLabel} helperText={helperText}>
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );

    // ヘルパーテキストが表示されていることを確認
    const heplerTextElement = screen.queryByText(helperText);
    expect(heplerTextElement).not.toBeNull();
  });

  it("Render Add ErrorText In isInvalid False", () => {
    render(
      <FormArea label={formLabel} errorText={errorText} isInvalid={false}>
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByText(formLabel);
    expect(renderTestElement).not.toBeNull();

    // エラーテキストが表示されていないことを確認
    const errorTextElement = screen.queryByText(errorText);
    expect(errorTextElement).toBeNull();
  });

  it("Render Add ErrorText In isInvalid True", () => {
    render(
      <FormArea label={formLabel} errorText={errorText} isInvalid>
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );

    // エラーテキストが表示されていなることを確認
    const errorTextElement = screen.queryByText(errorText);
    expect(errorTextElement).not.toBeNull();
  });

  it("Render Add ErrorText And HelperText In isInvalid True", () => {
    render(
      <FormArea
        label={formLabel}
        helperText={helperText}
        errorText={errorText}
        isInvalid
      >
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );

    // ヘルパーテキストが表示されていることを確認
    const heplerTextElement = screen.queryByText(helperText);
    expect(heplerTextElement).not.toBeNull();

    // エラーテキストが表示されていなることを確認
    const errorTextElement = screen.queryByText(errorText);
    expect(errorTextElement).not.toBeNull();
  });

  it("Render isDisabled True", () => {
    render(
      <FormArea
        label={formLabel}
        isDisabled
      >
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );

    // テキストボックスが表示されていることを確認
    const textElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(textElement).not.toBeNull();

    // テキストボックスがDisabledになっていることを確認
    expect(textElement.disabled).toBeTruthy();

    // onChange関数が呼び出されないことを確認
    useEvent.type(textElement, typeText);
    expect(onChangeTextFunction).toHaveBeenCalledTimes(0);
  });

  it("Render isReadOnly True", () => {
    render(
      <FormArea
        label={formLabel}
        isDisabled
      >
        <DefaultTextInput
          data-testid={elementTestId}
          onChange={onChangeTextFunction}
        />
      </FormArea>
    );

    // テキストボックスが表示されていることを確認
    const textElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(textElement).not.toBeNull();

    // onChange関数が呼び出されないことを確認
    useEvent.type(textElement, typeText);
    expect(onChangeTextFunction).toHaveBeenCalledTimes(0);
  });
});
