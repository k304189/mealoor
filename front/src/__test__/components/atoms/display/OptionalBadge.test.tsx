import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { OptionalBadge } from "../../../../components/atoms/display/OptionalBadge";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Normal Render", () => {
    render(
      <OptionalBadge />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByText("任意");
    expect(renderTestElement).not.toBeNull();
  });
});
