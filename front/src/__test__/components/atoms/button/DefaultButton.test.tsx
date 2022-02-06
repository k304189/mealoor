import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultButton } from "../../../../components/atoms/button/DefaultButton";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Normal Render", () => {
    const elementText = "ボタン";
    const elementTestId = "buttonElement";
    const hoverText = "ホバー";
    const onClickFunction = jest.fn();

    render(
      <DefaultButton onClick={onClickFunction} hoverText={hoverText}>
        <p data-testid={elementTestId}>{elementText}</p>
      </DefaultButton>
    );
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    // 子要素が表示されていることを確認
    expect(renderTestElement).not.toBeNull();

    // クリックすると関数が呼び出されることを確認
    useEvent.click(renderTestElement);
    expect(onClickFunction).toHaveBeenCalledTimes(1);

    // ホバーすると、ホバーテキストが表示されることを確認
    useEvent.hover(renderTestElement);
    let hoverElement = screen.queryByText(hoverText);
    expect(hoverText).not.toBeNull();

    // ホバー解除すると、ホバーテキストが表示されないことを確認
    useEvent.unhover(renderTestElement);
    hoverElement = screen.queryByText(hoverText);
    expect(hoverElement).toBeNull();
  });

  it("Render No Hover Text", () => {
    const elementText = "ヘッダーボタン";
    const elementTestId = "buttonElement";
    const hoverText = "ホバー";
    const onClickFunction = jest.fn();

    render(
      <DefaultButton onClick={onClickFunction}>
        <p data-testid={elementTestId}>{elementText}</p>
      </DefaultButton>
    );
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    // 子要素が表示されていることを確認
    expect(renderTestElement).not.toBeNull();

    // ホバーすると、ホバーテキストが表示されることを確認
    useEvent.hover(renderTestElement);
    let hoverElement = screen.queryByText(hoverText);
    expect(hoverElement).toBeNull();
  });

  it("Render Disabled", () => {
    const elementText = "ボタン";
    const elementTestId = "buttonElement";
    const onClickFunction = jest.fn();
    const disabled = true;

    render(
      <DefaultButton onClick={onClickFunction} disabled={disabled}>
        <p data-testid={elementTestId}>{elementText}</p>
      </DefaultButton>
    );
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    // 子要素が表示されていることを確認
    expect(renderTestElement).not.toBeNull();

    // クリックすると関数が呼び出されないことを確認
    useEvent.click(renderTestElement);
    expect(onClickFunction).toHaveBeenCalledTimes(0);
  });

  it("Render Loading", () => {
    const elementText = "ボタン";
    const elementTestId = "buttonElement";
    const onClickFunction = jest.fn();
    const loading = true;

    render(
      <DefaultButton onClick={onClickFunction} loading={loading}>
        <p data-testid={elementTestId}>{elementText}</p>
      </DefaultButton>
    );
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    // 子要素が表示されていることを確認
    expect(renderTestElement).not.toBeNull();

    // クリックすると関数が呼び出されないことを確認
    useEvent.click(renderTestElement);
    expect(onClickFunction).toHaveBeenCalledTimes(0);
  });
});
