import { Box } from "@chakra-ui/react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { DefaultDrawer } from "../../../../components/molecules/layout/DefaultDrawer";

afterEach(() => cleanup());

describe("Rendering DefaultDrawer", () => {
  const onCloseFunction = jest.fn();
  const bodyText = "ドロワーボディ";
  const headerText = "ドロワーヘッダー";
  const footerText = "ドロワーフッター";
  const drawerbodyElement = (<Box>{bodyText}</Box>);
  const drawerheaderElement = (<Box>{headerText}</Box>);
  const drawerfooterElement = (<Box>{footerText}</Box>);

  it("Render Drawer When isOpen is True Only Require Element", () => {
    render(
      <DefaultDrawer
        isOpen
        onClose={onCloseFunction}
        drawerBody={drawerbodyElement}
      />
    );
    // ドロワーのヘッダーが表示されていないことを確認
    const headerElement = screen.queryByText(headerText);
    expect(headerElement).toBeNull();

    // ドロワーのボディが表示されていることを確認
    const bodyElement = screen.queryByText(bodyText);
    expect(bodyElement).not.toBeNull();

    // ドロワーのフッターが表示されてないことを確認
    const footerElement = screen.queryByText(footerText);
    expect(footerElement).toBeNull();

    // ドロワーのクローズボタンが表示されていることを確認
    const closeButtonElement = screen.queryByTestId("drawerCloseButton") as HTMLInputElement;
    expect(closeButtonElement).not.toBeNull();

    // ドロワーのクローズボタンをクリックするとonCloseが呼び出されることを確認
    useEvent.click(closeButtonElement);
    expect(onCloseFunction).toHaveBeenCalledTimes(1);
  });

  it("Render Drawer When isOpen is True All Element", () => {
    render(
      <DefaultDrawer
        isOpen
        onClose={onCloseFunction}
        drawerBody={drawerbodyElement}
        drawerHeader={drawerheaderElement}
        drawerFooter={drawerfooterElement}
      />
    );
    // ドロワーのヘッダーが表示されていることを確認
    const headerElement = screen.queryByText(headerText);
    expect(headerElement).not.toBeNull();

    // ドロワーのボディが表示されていることを確認
    const bodyElement = screen.queryByText(bodyText);
    expect(bodyElement).not.toBeNull();

    // ドロワーのフッターが表示されていることを確認
    const footerElement = screen.queryByText(footerText);
    expect(footerElement).not.toBeNull();

    // ドロワーのクローズボタンが表示されていることを確認
    const closeButtonElement = screen.queryByTestId("drawerCloseButton") as HTMLInputElement;
    expect(closeButtonElement).not.toBeNull();
  });

  it("Render Drawer When isOpen is False", () => {
    render(
      <DefaultDrawer
        isOpen={false}
        onClose={onCloseFunction}
        drawerBody={drawerbodyElement}
        drawerHeader={drawerheaderElement}
        drawerFooter={drawerfooterElement}
      />
    );
    // ドロワーのヘッダーが表示されてないことを確認
    const headerElement = screen.queryByText(headerText);
    expect(headerElement).toBeNull();

    // ドロワーのボディが表示されてないことを確認
    const bodyElement = screen.queryByText(bodyText);
    expect(bodyElement).toBeNull();

    // ドロワーのフッターが表示されてないことを確認
    const footerElement = screen.queryByText(footerText);
    expect(footerElement).toBeNull();

    // ドロワーのクローズボタンが表示されてないことを確認
    const closeButtonElement = screen.queryByTestId("drawerCloseButton") as HTMLInputElement;
    expect(closeButtonElement).toBeNull();
  });
});
