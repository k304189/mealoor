import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { RequireBadge } from "../../../../components/atoms/display/RequireBadge";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Normal Render", () => {
    render(
      <RequireBadge />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByText("必須") as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();
  });
});
