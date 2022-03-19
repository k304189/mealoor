import { Box, Button } from "@chakra-ui/react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultPopover } from "../../../../components/molecules/layout/DefaultPopover";

afterEach(() => cleanup());

describe("Rendering DefaultPopover", () => {
  const onOpenFunction = jest.fn();
  const onCloseFunction = jest.fn();
  const bodyText = "ボディ";
  const headerText = "ヘッダー";
  const footerText = "フッター";
  const triggerText = "トリガー";

  it("Render Popover When isOpen is True", () => {
    render(
      <DefaultPopover
        isOpen
        onOpen={onOpenFunction}
        onClose={onCloseFunction}
        popTrigger={(<Button>{triggerText}</Button>)}
        popHeader={(<Button>{headerText}</Button>)}
        popBody={(<Button>{bodyText}</Button>)}
        popFooter={(<Button>{footerText}</Button>)}
      />
    );

    // Popのヘッダーが表示されていることを確認
    const popHeaderElement = screen.queryByText(headerText);
    expect(popHeaderElement).not.toBeNull();

    // Popのボディが表示されていることを確認
    const popBodyElement = screen.queryByText(bodyText);
    expect(popBodyElement).not.toBeNull();

    // Popのフッターが表示されていることを確認
    const popFooterElement = screen.queryByText(footerText);
    expect(popFooterElement).not.toBeNull();

    // Popのクローズボタンが表示されていることを確認
    const popCloseButtonElement = screen.queryByTestId("popoverCloseButton") as HTMLInputElement;
    expect(popCloseButtonElement).not.toBeNull();

    // PopのクローズボタンをクリックするとonCloseが呼び出されることを確認
    useEvent.click(popCloseButtonElement);
    expect(onCloseFunction).toHaveBeenCalledTimes(1);

    // Popのトリガーボタンが表示されていることを確認
    const popTriggerButtonElement = screen.queryByText(triggerText) as HTMLInputElement;
    expect(popTriggerButtonElement).not.toBeNull();

    // PopのトリガーボタンをクリックするとonCloseが呼び出されることを確認
    useEvent.click(popTriggerButtonElement);
    expect(onCloseFunction).toHaveBeenCalledTimes(2);
  });

  it("Render Popover When isOpen is False", () => {
    render(
      <DefaultPopover
        isOpen={false}
        onOpen={onOpenFunction}
        onClose={onCloseFunction}
        popTrigger={(<Button>{triggerText}</Button>)}
        popHeader={(<Button>{headerText}</Button>)}
        popBody={(<Button>{bodyText}</Button>)}
        popFooter={(<Button>{footerText}</Button>)}
      />
    );

    // Popのヘッダーが表示されていないことを確認
    const popHeaderElement = screen.queryByText(headerText);
    expect(popHeaderElement).not.toBeVisible();

    // Popのボディが表示されていないことを確認
    const popBodyElement = screen.queryByText(bodyText);
    expect(popBodyElement).not.toBeVisible();

    // Popのフッターが表示されていないことを確認
    const popFooterElement = screen.queryByText(footerText);
    expect(popFooterElement).not.toBeVisible();

    // Popのクローズボタンが表示されていないことを確認
    const popCloseButtonElement = screen.queryByTestId("popoverCloseButton") as HTMLInputElement;
    expect(popCloseButtonElement).not.toBeVisible();

    // Popのトリガーボタンが表示されていることを確認
    const popTriggerButtonElement = screen.queryByText(triggerText) as HTMLInputElement;
    expect(popTriggerButtonElement).not.toBeNull();

    // PopのトリガーボタンをクリックするとonOpenが呼び出されることを確認
    useEvent.click(popTriggerButtonElement);
    expect(onOpenFunction).toHaveBeenCalledTimes(1);
  });

  it("Render Popover Only Require Attribute", () => {
    render(
      <DefaultPopover
        isOpen
        onOpen={onOpenFunction}
        onClose={onCloseFunction}
        popTrigger={(<Button>{triggerText}</Button>)}
        popBody={(<Button>{bodyText}</Button>)}
      />
    );

    // Popのヘッダーが表示されていないことを確認
    const popHeaderElement = screen.queryByText(headerText);
    expect(popHeaderElement).toBeNull();

    // Popのボディが表示されていることを確認
    const popBodyElement = screen.queryByText(bodyText);
    expect(popBodyElement).not.toBeNull();

    // Popのフッターが表示されていないことを確認
    const popFooterElement = screen.queryByText(footerText);
    expect(popFooterElement).toBeNull();

    // Popのクローズボタンが表示されていることを確認
    const popCloseButtonElement = screen.queryByTestId("popoverCloseButton") as HTMLInputElement;
    expect(popCloseButtonElement).not.toBeNull();

    // Popのトリガーボタンが表示されていることを確認
    const popTriggerButtonElement = screen.queryByText(triggerText) as HTMLInputElement;
    expect(popTriggerButtonElement).not.toBeNull();
  });
});
