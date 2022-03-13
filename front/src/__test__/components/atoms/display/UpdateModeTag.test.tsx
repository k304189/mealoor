import { render, screen, cleanup } from "@testing-library/react";

import { UpdateModeTag } from "../../../../components/atoms/display/UpdateModeTag";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Normal Render", () => {
    render(
      <UpdateModeTag />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByText("更新モード");
    expect(renderTestElement).not.toBeNull();
  });
});
