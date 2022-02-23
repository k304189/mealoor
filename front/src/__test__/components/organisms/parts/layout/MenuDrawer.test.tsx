import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { MenuDrawer } from "../../../../../components/organisms/parts/layout/MenuDrawer";

beforeEach(() => localStorage.clear());
afterEach(() => cleanup());

const mockedNavigate = jest.fn().mockImplementation(() => ({}));
jest.mock("react-router-dom", () => ({
  useNavigate: () => ({
    navigate: mockedNavigate,
  }),
}));

describe("Rendering MenuDrawer", () => {
  const signInUsername = "signInUsername";
  const signInToken = "signInToken";
  const onCloseFunction = jest.fn();
  const menuSectionTestId = "menuSection";
  const menuButtonTestId = "menuButton";

  const menuSections = [
    { secName: "データ", isSignIn: true },
    { secName: "mealoor", isSignIn: false },
  ];
  const menuButtons = [
    { btnName: signInUsername, link: "/account", isSignIn: true },
    { btnName: "ダッシュボード", link: "/dashboard", isSignIn: true },
    { btnName: "Top", link: "/", isSignIn: false },
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

  it("Check Display MenuSection in MenuDrawer When signIn", () => {
    localStorage.setItem("auth_token", signInToken);
    localStorage.setItem("username", signInUsername);
    render(
      <MenuDrawer
        isOpen
        onClose={onCloseFunction}
      />
    );

    // メニューセクションの数をチェック
    const menuSectionElements = screen.queryAllByTestId(menuSectionTestId);
    expect(menuSectionElements.length).toBe(menuSections.length);

    // メニューセクションの項目名チェック
    menuSections.forEach(sec => {
      const secName = sec.secName;
      const checkSectionElement = screen.queryByText(secName);
      let innerHtml = "";
      if (checkSectionElement) {
        innerHtml = checkSectionElement.innerHTML;
      }
      expect(innerHtml).toBe(secName);
    });
  });

  it("Check Display MenuButton in MenuDrawer When signIn", () => {
    localStorage.setItem("auth_token", signInToken);
    localStorage.setItem("username", signInUsername);
    render(
      <MenuDrawer
        isOpen
        onClose={onCloseFunction}
      />
    );

    // メニューボタンの数をチェック
    const menuButtonElements = screen.queryAllByTestId(menuButtonTestId);
    expect(menuButtonElements.length).toBe(menuButtons.length);

    // メニューボタンの項目名チェック
    menuButtons.forEach(btn => {
      const btnName = btn.btnName;
      const menuButton = screen.queryByText(btnName) as HTMLInputElement;
      let innerHtml = "";
      if (menuButton) {
        innerHtml = menuButton.innerHTML
      }
      expect(innerHtml).toBe(btnName);
    });
  });

  it("Check Display MenuSection in MenuDrawer When Not signIn", () => {
    render(
      <MenuDrawer
        isOpen
        onClose={onCloseFunction}
      />
    );

    // サインインしていない時に表示されるセクション一覧を取得
    const noSigninMenuSections = menuSections.filter(sec => {
      return !sec.isSignIn;
    });

    // メニューセクションの数をチェック
    const menuSectionElements = screen.queryAllByTestId(menuSectionTestId);
    expect(menuSectionElements.length).toBe(noSigninMenuSections.length);

    // メニューセクションの項目名チェック
    noSigninMenuSections.forEach(sec => {
      const secName = sec.secName;
      const checkSectionElement = screen.queryByText(secName);
      let innerHtml = "";
      if (checkSectionElement) {
        innerHtml = checkSectionElement.innerHTML;
      }
      expect(innerHtml).toBe(secName);
    });
  });

  it("Check Display MenuButton in MenuDrawer When Not signIn", () => {
    render(
      <MenuDrawer
        isOpen
        onClose={onCloseFunction}
      />
    );

    // サインインしていない時に表示されるセクション一覧を取得
    const noSigninMenuButtons = menuButtons.filter(sec => {
      return !sec.isSignIn;
    });

    // メニューボタンの数をチェック
    const menuButtonElements = screen.queryAllByTestId(menuButtonTestId);
    expect(menuButtonElements.length).toBe(noSigninMenuButtons.length);

    // メニューボタンの項目名チェック
    noSigninMenuButtons.forEach(btn => {
      const btnName = btn.btnName;
      const menuButton = screen.queryByText(btnName) as HTMLInputElement;
      let innerHtml = "";
      if (menuButton) {
        innerHtml = menuButton.innerHTML
      }
      expect(innerHtml).toBe(btnName);
    });
  });
});
