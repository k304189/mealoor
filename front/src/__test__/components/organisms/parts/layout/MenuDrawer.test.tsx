import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { MenuDrawer } from "../../../../../components/organisms/parts/layout/MenuDrawer";

afterEach(() => cleanup());

const mockedNavigate = jest.fn().mockImplementation(() => ({}));
jest.mock("react-router-dom", () => ({
  useNavigate: () => ({
    navigate: mockedNavigate,
  }),
}));

describe("Rendering MenuDrawer", () => {
  const onCloseFunction = jest.fn();
  const menuSectionTestId = "menuSection";
  const menuButtonTestId = "menuButton";

  const menuSectionNames = ["データ", "mealoor"];
  const menuButtonConfig = [
    { btnName: "ダッシュボード", link: "/dashboard" },
    { btnName: "Top", link: "/" },
  ];

  it("Render MenuDrawer When isOpen is True", () => {
    render(
      <MenuDrawer
        isOpen
        onClose={onCloseFunction}
      />
    );
    // メニュータイトルが表示されていることを確認
    const menuHeaderElement = screen.queryByText("メニュー");
    expect(menuHeaderElement).not.toBeNull();

    // ドロワーのクローズボタンが表示されていることを確認
    const closeButtonElement = screen.queryByTestId("drawerCloseButton") as HTMLInputElement;
    expect(closeButtonElement).not.toBeNull();

    // ドロワーのクローズボタンをクリックするとonCloseが呼び出されることを確認
    useEvent.click(closeButtonElement);
    expect(onCloseFunction).toHaveBeenCalledTimes(1);

    // メニューセクションの数をチェック
    const menuSectionElements = screen.queryAllByTestId(menuSectionTestId);
    expect(menuSectionElements.length).toBe(menuSectionNames.length);

    // メニューボタンの数をチェック
    const menuButtonElements = screen.queryAllByTestId(menuButtonTestId);
    expect(menuButtonElements.length).toBe(menuButtonConfig.length);
  });

  it("Render MenuDrawer When isOpen is False", () => {
    render(
      <MenuDrawer
        isOpen={false}
        onClose={onCloseFunction}
      />
    );
    // メニュータイトルが表示されていないことを確認
    const menuHeaderElement = screen.queryByText("メニュー");
    expect(menuHeaderElement).toBeNull();

    // ドロワーのクローズボタンが表示されていないことを確認
    const closeButtonElement = screen.queryByTestId("drawerCloseButton") as HTMLInputElement;
    expect(closeButtonElement).toBeNull();

    // メニューセクションの数をチェック
    const menuSectionElements = screen.queryAllByTestId(menuSectionTestId);
    expect(menuSectionElements.length).toBe(0);

    // メニューボタンの数をチェック
    const menuButtonElements = screen.queryAllByTestId(menuButtonTestId);
    expect(menuButtonElements.length).toBe(0);
  });

  it("Check Display MenuSection in MenuDrawer", () => {
    render(
      <MenuDrawer
        isOpen
        onClose={onCloseFunction}
      />
    );
    // メニューセクションの項目名チェック
    menuSectionNames.forEach(sec => {
      const checkSectionElement = screen.queryByText(sec);
      let innerHtml = "";
      if (checkSectionElement) {
        innerHtml = checkSectionElement.innerHTML;
      }
      expect(innerHtml).toBe(sec);
    });
  });

  it("Check Display MenuButton in MenuDrawer", () => {
    render(
      <MenuDrawer
        isOpen
        onClose={onCloseFunction}
      />
    );
    // メニューボタンの項目名チェック
    menuButtonConfig.forEach(btn => {
      const menuButton = screen.queryByText(btn.btnName) as HTMLInputElement;
      let innerHtml = "";
      if (menuButton) {
        innerHtml = menuButton.innerHTML
      }
      expect(innerHtml).toBe(btn.btnName);
    });
  });
});
