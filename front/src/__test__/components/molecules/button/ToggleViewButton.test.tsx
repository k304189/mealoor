import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { ToggleViewButton } from "../../../../components/molecules/button/ToggleViewButton";

afterEach(() => cleanup());

describe("Rendering", () => {
  const elementTestId = "testInputId";
  const setTestIsViewMock = jest.fn(bool => {});

  it("Normal Render", () => {
    render(
      <ToggleViewButton
        isView={false}
        setIsView={setTestIsViewMock}
        dataTestid={elementTestId}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();
    expect(renderTestElement.getAttribute("aria-label")).toBe("表示");

    // ボタンをクリックすると関数が呼び出されることを確認
    useEvent.click(renderTestElement);
    expect(setTestIsViewMock).toHaveBeenCalledTimes(1);
  });

  it("Render isView True", () => {
    render(
      <ToggleViewButton
        isView={true}
        setIsView={setTestIsViewMock}
        dataTestid={elementTestId}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();
    expect(renderTestElement.getAttribute("aria-label")).toBe("非表示");

    // ボタンをクリックすると関数が呼び出されることを確認
    useEvent.click(renderTestElement);
    expect(setTestIsViewMock).toHaveBeenCalledTimes(1);
  });
});
