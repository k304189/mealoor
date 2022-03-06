import { render, screen, cleanup } from "@testing-library/react";

import { AdminAccountBadge } from "../../../../components/atoms/display/AdminAccountBadge";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Normal Render", () => {
    render(
      <AdminAccountBadge />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByText("管理者");
    expect(renderTestElement).not.toBeNull();
  });
});
