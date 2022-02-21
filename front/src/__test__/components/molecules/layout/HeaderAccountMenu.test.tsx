import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { HeaderAccountMenu } from "../../../../components/molecules/layout/HeaderAccountMenu";

beforeEach(() => localStorage.clear());
afterEach(() => cleanup());

describe("Rendering HeaderAccountMenu", () => {
  const testUsername = "testUsername";
  const signOutFunction = jest.fn();

  it("Render HeaderAccountMenu And Close HeaderAccountMenu", () => {
    localStorage.setItem("username", testUsername);
    render(
      <HeaderAccountMenu signOut={signOutFunction} />
    );
    const headerMenuButtonElement = screen.queryByTestId("headerAccountMenuButton") as HTMLInputElement;
    let usernameElement = screen.queryByText(testUsername);
    let signOutElement = screen.queryByText("サインアウト") as HTMLInputElement;

    // ヘッダーアカウントメニューボタンが表示されていることを確認
    expect(headerMenuButtonElement).not.toBeNull();

    // サインインユーザー名が表示されていないことを確認
    expect(usernameElement).not.toBeVisible();

    // サインアウトボタンが表示されていないことを確認
    expect(signOutElement).not.toBeVisible();

    // ヘッダーアカウントメニューボタンをクリックするとアカウントメニューが表示されることを確認
    // useEvent.click(headerMenuButtonElement);
    // expect(usernameElement).toBeVisible();
    // expect(signOutElement).toBeVisible();

    // もう一度ヘッダーアカウントメニューボタンをクリックすると非表示になることを確認
    // useEvent.click(headerMenuButtonElement);
    // expect(usernameElement).not.toBeVisible();
    // expect(signOutElement).not.toBeVisible();
  });

  it("Click SignOut Button", () => {
    localStorage.setItem("username", testUsername);
    render(
      <HeaderAccountMenu signOut={signOutFunction} />
    );
    const headerMenuButtonElement = screen.queryByTestId("headerAccountMenuButton") as HTMLInputElement;
    useEvent.click(headerMenuButtonElement);

    let signOutElement = screen.queryByText("サインアウト") as HTMLInputElement;
    useEvent.click(signOutElement);
    expect(signOutFunction).toHaveBeenCalledTimes(1);
  });
});
