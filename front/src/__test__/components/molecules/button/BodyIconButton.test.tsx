import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { BodyIconButton } from "../../../../components/molecules/button/BodyIconButton";

afterEach(() => cleanup());

describe("Rendering BodyIconButton", () => {
  it("Normal Render", () => {
    const elementText = "ボタン";
    const elementTestId = "buttonElement";
    const hoverText = "ホバー";
    const onClickFunction = jest.fn();

    render(
      <BodyIconButton
        onClick={onClickFunction}
        hoverText={hoverText}
        dataTestid={elementTestId}
      />
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
    const elementTestId = "buttonElement";
    const hoverText = "ホバー";
    const onClickFunction = jest.fn();

    render(
      <BodyIconButton
        onClick={onClickFunction}
        dataTestid={elementTestId}
      />
    );
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    // 子要素が表示されていることを確認
    expect(renderTestElement).not.toBeNull();

    // ホバーすると、ホバーテキストが表示されないことを確認
    useEvent.hover(renderTestElement);
    let hoverElement = screen.queryByText(hoverText);
    expect(hoverElement).toBeNull();
  });

  it("Render Disabled", () => {
    const elementTestId = "buttonElement";
    const onClickFunction = jest.fn();
    const disabled = true;

    render(
      <BodyIconButton
        onClick={onClickFunction}
        dataTestid={elementTestId}
        disabled={disabled}
      />
    );
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    // 子要素が表示されていることを確認
    expect(renderTestElement).not.toBeNull();

    // クリックすると関数が呼び出されないことを確認
    useEvent.click(renderTestElement);
    expect(onClickFunction).toHaveBeenCalledTimes(0);
  });

  it("Render Loading", () => {
    const elementTestId = "buttonElement";
    const onClickFunction = jest.fn();
    const loading = true;

    render(
      <BodyIconButton
        onClick={onClickFunction}
        dataTestid={elementTestId}
        loading={loading}
      />
    );
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    // 子要素が表示されていることを確認
    expect(renderTestElement).not.toBeNull();

    // クリックすると関数が呼び出されないことを確認
    useEvent.click(renderTestElement);
    expect(onClickFunction).toHaveBeenCalledTimes(0);
  });
});
