import { render, screen, cleanup } from "@testing-library/react";

import { DefaultAvatar } from "../../../../components/atoms/display/DefaultAvatar";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Normal Render", () => {
    render(
      <DefaultAvatar />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.getByRole("img");
    const ariaLabelValue = renderTestElement.getAttribute("aria-label") ?? "";
    expect(renderTestElement).not.toBeNull();
    expect(ariaLabelValue.trim()).toBe("avatar");
  });
});
