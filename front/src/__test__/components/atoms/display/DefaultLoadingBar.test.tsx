import { render, screen, cleanup } from "@testing-library/react";

import { DefaultLoadingBar } from "../../../../components/atoms/display/DefaultLoadingBar";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Normal Render", () => {
    render(
      <DefaultLoadingBar />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.getByRole("progressbar");
    expect(renderTestElement).not.toBeNull();
  });
});
