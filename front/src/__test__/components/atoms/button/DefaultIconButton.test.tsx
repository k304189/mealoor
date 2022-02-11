import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";
import { ViewIcon } from "@chakra-ui/icons";

import { DefaultIconButton } from "../../../../components/atoms/button/DefaultIconButton";

afterEach(() => cleanup());

describe("Rendering", () => {
  const hoverText = "アイコンボタン";
  const ariaLabel = "iconButton";
  const elementTestId = "testInputId";
  const onClickFunction = jest.fn();

  it("Normal Render", () => {
    render(
      <DefaultIconButton
        hoverText={hoverText}
        aria-label={ariaLabel}
        onClick={onClickFunction}
        data-testid={elementTestId}
        icon={<ViewIcon />}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
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
    render(
      <DefaultIconButton
        aria-label={ariaLabel}
        onClick={onClickFunction}
        data-testid={elementTestId}
        icon={<ViewIcon />}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // ホバーすると、ホバーテキストが表示されないことを確認
    useEvent.hover(renderTestElement);
    let hoverElement = screen.queryByText(hoverText);
    expect(hoverElement).toBeNull();
  });

});
