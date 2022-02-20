import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { SignModal } from "../../../../../components/organisms/pages/account/SignModal";

afterEach(() => cleanup());

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => ({
    navigate: mockedNavigate,
  }),
}));

describe("Rendering SignModal", () => {
  const onCloseFunction = jest.fn();
  const typingText = "typingText";
  const usernameEmptyText = "名前が入力されていません";
  const emailEmptyText = "メールアドレスが入力されていません";
  const passwordEmptyText = "パスワードが入力されていません";
  it("Render SignModal when IsSignIn is false", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );

    // 各フォームの存在チェック
    const usernameElement = screen.queryByPlaceholderText("名前") as HTMLInputElement;
    expect(usernameElement).not.toBeNull();

    const emailElement = screen.queryByPlaceholderText("メールアドレス") as HTMLInputElement;
    expect(emailElement).not.toBeNull();

    const passwordElement = screen.queryByPlaceholderText("パスワード") as HTMLInputElement;
    expect(passwordElement).not.toBeNull();

    const passwordConfElement = screen.queryByPlaceholderText("パスワード確認") as HTMLInputElement;
    expect(passwordConfElement).not.toBeNull();

    // 各フォームのラベル存在チェック
    const usernameLabelElement = screen.queryByText("名前");
    expect(usernameLabelElement).not.toBeNull();

    const emailLabelElement = screen.queryByText("メールアドレス");
    expect(emailLabelElement).not.toBeNull();

    const passwordLabelElement = screen.queryByText("パスワード");
    expect(passwordLabelElement).not.toBeNull();

    const passwordConfLabelElement = screen.queryByText("パスワード確認");
    expect(passwordConfLabelElement).not.toBeNull();

    // ヘッダー・ボタンの文字確認
    const textSignUpElements = screen.queryAllByText("サインアップ");
    expect(textSignUpElements.length).toBe(2);
    expect(textSignUpElements[0].tagName.toLowerCase()).toBe("header");
    expect(textSignUpElements[1].tagName.toLowerCase()).toBe("button");

    const textSignInElements = screen.queryAllByText("サインイン");
    expect(textSignInElements.length).toBe(0);

    // 必須バッヂが4つ設定されていることを確認
    const requireBadgeElements = screen.queryAllByText("必須");
    expect(requireBadgeElements.length).toBe(4);

    // 任意バッヂが存在しないことを確認
    const optionalBadgeElements = screen.queryAllByText("任意");
    expect(optionalBadgeElements.length).toBe(0);
  });

  it("Render SignModal when IsSignIn is true", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
        isSignIn
      />
    );

    // 各フォームの存在チェック
    const usernameElement = screen.queryByPlaceholderText("名前") as HTMLInputElement;
    expect(usernameElement).toBeNull();

    const emailElement = screen.queryByPlaceholderText("メールアドレス") as HTMLInputElement;
    expect(emailElement).not.toBeNull();

    const passwordElement = screen.queryByPlaceholderText("パスワード") as HTMLInputElement;
    expect(passwordElement).not.toBeNull();

    const passwordConfElement = screen.queryByPlaceholderText("パスワード確認") as HTMLInputElement;
    expect(passwordConfElement).toBeNull();

    // 各フォームのラベル存在チェック
    const usernameLabelElement = screen.queryByText("名前");
    expect(usernameLabelElement).toBeNull();

    const emailLabelElement = screen.queryByText("メールアドレス");
    expect(emailLabelElement).not.toBeNull();

    const passwordLabelElement = screen.queryByText("パスワード");
    expect(passwordLabelElement).not.toBeNull();

    const passwordConfLabelElement = screen.queryByText("パスワード確認");
    expect(passwordConfLabelElement).toBeNull();

    // ヘッダー・ボタンの文字確認
    const textSignUpElements = screen.queryAllByText("サインアップ");
    expect(textSignUpElements.length).toBe(0);

    const textSignInElements = screen.queryAllByText("サインイン");
    expect(textSignInElements.length).toBe(2);
    expect(textSignInElements[0].tagName.toLowerCase()).toBe("header");
    expect(textSignInElements[1].tagName.toLowerCase()).toBe("button");

    // 必須バッヂが存在しないことを確認
    const requireBadgeElements = screen.queryAllByText("必須");
    expect(requireBadgeElements.length).toBe(0);

    // 任意バッヂが存在しないことを確認
    const optionalBadgeElements = screen.queryAllByText("任意");
    expect(optionalBadgeElements.length).toBe(0);
  });

  it("When Click Close Button, onClose Function is Called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
        isSignIn
      />
    );

    const closeButtonElement = screen.queryByTestId("modalCloseButton") as HTMLInputElement;
    expect(closeButtonElement).not.toBeNull();

    useEvent.click(closeButtonElement);
    expect(onCloseFunction).toHaveBeenCalledTimes(1);
  });

  it("When Type Username Form, onChange Function is called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const usernameElement = screen.queryByPlaceholderText("名前") as HTMLInputElement;
    useEvent.type(usernameElement, typingText);
    expect(usernameElement.value).toBe(typingText);
  });

  it("When onBlur Username Form, onBlur Function is called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const usernameElement = screen.queryByPlaceholderText("名前") as HTMLInputElement;
    const modalButton = screen.queryByTestId("SignModalButton") as HTMLInputElement;
    expect(modalButton.disabled).toBeFalsy();

    useEvent.click(usernameElement);
    useEvent.tab();
    const usernameErrorTextElement = screen.queryByText(usernameEmptyText);
    expect(usernameErrorTextElement).not.toBeNull();
    expect(modalButton.disabled).toBeTruthy();
  });

  it("When Type Email Form, onChange Function is called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const emailElement = screen.queryByPlaceholderText("メールアドレス") as HTMLInputElement;
    useEvent.type(emailElement, typingText);
    expect(emailElement.value).toBe(typingText);
  });

  it("When onBlur Email Form, onBlur Function is called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const emailElement = screen.queryByPlaceholderText("メールアドレス") as HTMLInputElement;
    const modalButton = screen.queryByTestId("SignModalButton") as HTMLInputElement;
    expect(modalButton.disabled).toBeFalsy();

    useEvent.click(emailElement);
    useEvent.tab();
    const emailElementErrorTextElement = screen.queryByText(emailEmptyText);
    expect(emailElementErrorTextElement).not.toBeNull();
    expect(modalButton.disabled).toBeTruthy();
  });

  it("When Type Password Form, onChange Function is called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const passwordElement = screen.queryByPlaceholderText("パスワード") as HTMLInputElement;
    useEvent.type(passwordElement, typingText);
    expect(passwordElement.value).toBe(typingText);
  });

  it("When onBlur Password Form, onBlur Function is called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const passwordElement = screen.queryByPlaceholderText("パスワード") as HTMLInputElement;
    const modalButton = screen.queryByTestId("SignModalButton") as HTMLInputElement;
    expect(modalButton.disabled).toBeFalsy();

    useEvent.click(passwordElement);
    useEvent.tab();
    const passwordElementErrorTextElement = screen.queryByText(passwordEmptyText);
    expect(passwordElementErrorTextElement).not.toBeNull();
    expect(modalButton.disabled).toBeTruthy();
  });

  it("When Type PasswordConf Form, onChange Function is called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const passwordConfElement = screen.queryByPlaceholderText("パスワード確認") as HTMLInputElement;
    useEvent.type(passwordConfElement, typingText);
    expect(passwordConfElement.value).toBe(typingText);
  });

  it("When onBlur PasswordConf Form, onBlur Function is called", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const passwordConfElement = screen.queryByPlaceholderText("パスワード確認") as HTMLInputElement;
    const modalButton = screen.queryByTestId("SignModalButton") as HTMLInputElement;
    expect(modalButton.disabled).toBeFalsy();

    useEvent.click(passwordConfElement);
    useEvent.tab();
    const passwordConfElementErrorTextElement = screen.queryByText(passwordEmptyText);
    expect(passwordConfElementErrorTextElement).not.toBeNull();
    expect(modalButton.disabled).toBeTruthy();
  });

  it("Modal Button is not disable when There aren't invalid Element", () => {
    render(
      <SignModal
        isOpen
        onClose={onCloseFunction}
      />
    );
    const usernameElement = screen.queryByPlaceholderText("名前") as HTMLInputElement;
    const emailElement = screen.queryByPlaceholderText("メールアドレス") as HTMLInputElement;
    const passwordElement = screen.queryByPlaceholderText("パスワード") as HTMLInputElement;
    const passwordConfElement = screen.queryByPlaceholderText("パスワード確認") as HTMLInputElement;
    const modalButton = screen.queryByTestId("SignModalButton") as HTMLInputElement;

    // 最初はdisabledでない
    expect(modalButton.disabled).toBeFalsy();

    /*
    * 各項目でエラーを発生
    */
    // ユーザー名の必須項目チェックでエラーが発生
    useEvent.click(usernameElement);
    useEvent.tab();
    expect(modalButton.disabled).toBeTruthy();

    // メールアドレスの必須項目チェックでエラーが発生
    useEvent.click(emailElement);
    useEvent.tab();
    expect(modalButton.disabled).toBeTruthy();

    // パスワードの必須項目チェックでエラーが発生
    useEvent.click(passwordElement);
    useEvent.tab();
    expect(modalButton.disabled).toBeTruthy();

    // パスワード確認の必須項目チェックでエラーが発生
    useEvent.click(passwordConfElement);
    useEvent.tab();
    expect(modalButton.disabled).toBeTruthy();

    /*
    * 各項目でエラーを解消
    */
    // ユーザー名の必須項目チェックでエラーが発生
    useEvent.type(usernameElement, typingText);
    useEvent.tab();
    expect(modalButton.disabled).toBeTruthy();

    // メールアドレスの必須項目チェックでエラーが発生
    useEvent.type(emailElement, typingText);
    useEvent.tab();
    expect(modalButton.disabled).toBeTruthy();

    // パスワードの必須項目チェックでエラーが発生
    useEvent.type(passwordElement, typingText);
    useEvent.tab();
    expect(modalButton.disabled).toBeTruthy();

    // パスワード確認の必須項目チェックでエラーが発生
    useEvent.type(passwordConfElement, typingText);
    useEvent.tab();
    expect(modalButton.disabled).toBeFalsy();
  });
});
