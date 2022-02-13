import React from "react";
import { Box } from "@chakra-ui/react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultModal } from "../../../../components/molecules/layout/DefaultModal";

afterEach(() => cleanup());

describe("Rendering DefaultModal", () => {
  const onCloseFunction = jest.fn();
  const modalBodyText = "モーダルボディ";
  const modalHeaderText = "モーダルヘッダー";
  const modalFooterText = "モーダルフッター";

  it("Render Modal When isOpen is True", () => {
    render(
      <DefaultModal
        isOpen
        onClose={onCloseFunction}
        modalHeader={modalHeaderText}
        modalBody={(<p>{modalBodyText}</p>)}
        modalFooter={(<p>{modalFooterText}</p>)}
      />
    );
    // モーダルのヘッダーが表示されていることを確認
    const modalHeaderElement = screen.queryByText(modalHeaderText);
    expect(modalHeaderElement).not.toBeNull();

    // モーダルのボディが表示されていることを確認
    const modalBodyElement = screen.queryByText(modalBodyText);
    expect(modalBodyElement).not.toBeNull();

    // モーダルのフッターが表示されていることを確認
    const modalFooterElement = screen.queryByText(modalFooterText);
    expect(modalFooterElement).not.toBeNull();

    // モーダルのクローズボタンが表示されていることを確認
    const modalCloseButtonElement = screen.queryByTestId("modalCloseButton") as HTMLInputElement;
    expect(modalCloseButtonElement).not.toBeNull();

    // モーダルのクローズボタンをクリックするとonCloseが呼び出されることを確認
    useEvent.click(modalCloseButtonElement);
    expect(onCloseFunction).toHaveBeenCalledTimes(1);
  });

  it("Render Modal When isOpen is False", () => {
    render(
      <DefaultModal
        isOpen={false}
        onClose={onCloseFunction}
        modalHeader={modalHeaderText}
        modalBody={(<p>{modalBodyText}</p>)}
        modalFooter={(<p>{modalFooterText}</p>)}
      />
    );
    // モーダルのヘッダーが表示されていないことを確認
    const modalHeaderElement = screen.queryByText(modalHeaderText);
    expect(modalHeaderElement).toBeNull();

    // モーダルのボディが表示されていないことを確認
    const modalBodyElement = screen.queryByText(modalBodyText);
    expect(modalBodyElement).toBeNull();

    // モーダルのフッターが表示されていないことを確認
    const modalFooterElement = screen.queryByText(modalFooterText);
    expect(modalFooterElement).toBeNull();

    // モーダルのクローズボタンが表示されていないことを確認
    const modalCloseButtonElement = screen.queryByTestId("modalCloseButton") as HTMLInputElement;
    expect(modalCloseButtonElement).toBeNull();
  });

  it("Render Modal Only Require Attribute", () => {
    render(
      <DefaultModal
        isOpen
        onClose={onCloseFunction}
        modalBody={(<p>{modalBodyText}</p>)}
      />
    );
    // モーダルのヘッダーが表示されていないことを確認
    const modalHeaderElement = screen.queryByText(modalHeaderText);
    expect(modalHeaderElement).toBeNull();

    // モーダルのボディが表示されていることを確認
    const modalBodyElement = screen.queryByText(modalBodyText);
    expect(modalBodyElement).not.toBeNull();

    // モーダルのフッターが表示されていないことを確認
    const modalFooterElement = screen.queryByText(modalFooterText);
    expect(modalFooterElement).toBeNull();
  });
});
