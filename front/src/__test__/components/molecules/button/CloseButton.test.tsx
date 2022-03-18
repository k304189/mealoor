import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { CloseButton } from "../../../../components/molecules/button/CloseButton";

afterEach(() => cleanup());

describe("Rendering", () => {
  const areaLabel = "メニュー"
  const elementTestId = "testId";
  const onClickFunction = jest.fn();

  it("Normal Render", () => {
    render(
      <CloseButton
        aria-label={areaLabel}
        onClick={onClickFunction}
        data-testid={elementTestId}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(elementTestId) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();
    expect(renderTestElement.getAttribute("aria-label")).toBe(areaLabel);

    // ボタンをクリックすると関数が呼び出されることを確認
    useEvent.click(renderTestElement);
    expect(onClickFunction).toHaveBeenCalledTimes(1);
  });
});
