import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { ReadOnlyInput } from "../../../../components/molecules/form/ReadOnlyInput";

afterEach(() => cleanup());

describe("Rendering", () => {
  const dataTestid = "readOnlyInput";
  const leftAddonString = "leftAddon";
  const rightAddonString = "rightAddon";

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

    // テキストボックスの左に文字が表示されていないことを確認
    const leftAddonElement = screen.queryByText(leftAddonString);
    expect(leftAddonElement).toBeNull();

    // テキストボックスの右に文字が表示されていないことを確認
    const rightAddonElement = screen.queryByText(rightAddonString);
    expect(rightAddonElement).toBeNull();
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

  it("Normal String Render Add LeftAddon", () => {
    const readOnlyString = "readOnly";
    render(
      <ReadOnlyInput
        value={readOnlyString}
        dataTestid={dataTestid}
        leftAddon={leftAddonString}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認（文字列に変換されている）
    expect(renderTestElement.value).toBe(readOnlyString);

    // テキストボックスの左に文字が表示されていないことを確認
    const leftAddonElement = screen.queryByText(leftAddonString);
    expect(leftAddonElement).not.toBeNull();

    // テキストボックスの右に文字が表示されていないことを確認
    const rightAddonElement = screen.queryByText(rightAddonString);
    expect(rightAddonElement).toBeNull();
  });

  it("Normal String Render Add RightAddon", () => {
    const readOnlyString = "readOnly";
    render(
      <ReadOnlyInput
        value={readOnlyString}
        dataTestid={dataTestid}
        rightAddon={rightAddonString}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認（文字列に変換されている）
    expect(renderTestElement.value).toBe(readOnlyString);

    // テキストボックスの左に文字が表示されていないことを確認
    const leftAddonElement = screen.queryByText(leftAddonString);
    expect(leftAddonElement).toBeNull();

    // テキストボックスの右に文字が表示されていないことを確認
    const rightAddonElement = screen.queryByText(rightAddonString);
    expect(rightAddonElement).not.toBeNull();
  });

  it("Normal String Render Add LeftAddon and RightAddon", () => {
    const readOnlyString = "readOnly";
    render(
      <ReadOnlyInput
        value={readOnlyString}
        dataTestid={dataTestid}
        leftAddon={leftAddonString}
        rightAddon={rightAddonString}
      />
    );
    // 要素が表示されていることを確認
    const renderTestElement = screen.queryByTestId(dataTestid) as HTMLInputElement;
    expect(renderTestElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認（文字列に変換されている）
    expect(renderTestElement.value).toBe(readOnlyString);

    // テキストボックスの左に文字が表示されていないことを確認
    const leftAddonElement = screen.queryByText(leftAddonString);
    expect(leftAddonElement).not.toBeNull();

    // テキストボックスの右に文字が表示されていないことを確認
    const rightAddonElement = screen.queryByText(rightAddonString);
    expect(rightAddonElement).not.toBeNull();
  });

});
