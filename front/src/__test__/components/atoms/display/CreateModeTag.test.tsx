import { render, screen, cleanup } from "@testing-library/react";

import { CreateModeTag } from "../../../../components/atoms/display/CreateModeTag";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Normal Render", () => {
    render(
      <CreateModeTag />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByText("登録モード");
    expect(renderTestElement).not.toBeNull();
  });
});
