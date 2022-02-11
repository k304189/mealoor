import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { ReadOnlyInput } from "../../../../components/atoms/form/ReadOnlyInput";

afterEach(() => cleanup());

describe("Rendering", () => {
  const dataTestid = "readOnlyInput";

  it("Normal String Render", () => {
    const readOnlyString = "readOnly";
    render(
      <ReadOnlyInput value={readOnlyString} dataTestid={dataTestid} />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(renderTestElement.value).toBe(readOnlyString);

    // disabledになっていることを確認
    expect(renderTestElement.disabled).toBeTruthy();
  });

  it("Normal Numer Render", () => {
    const readOnlyNumber = 99;
    render(
      <ReadOnlyInput value={readOnlyNumber} dataTestid={dataTestid} />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認（文字列に変換されている）
    expect(renderTestElement.value).toBe(String(readOnlyNumber));
  });

});
