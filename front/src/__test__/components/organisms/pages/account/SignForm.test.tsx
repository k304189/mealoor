import React from "react";
import useEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

import { SignForm } from "../../../../../components/organisms/pages/account/SignForm";

afterEach(() => cleanup());

describe("Rendering SignForm", () => {
  // メール関連定数
  const testEmail = "test_email@test.com";
  const onChangeEmail = jest.fn();
  const onBlurEmail = jest.fn();
  const errorTextEmail = "email Error!";
  // パスワード関連定数
  const testPassword = "testPassword";
  const onChangePassword = jest.fn();
  const onBlurPassword = jest.fn();
  const errorTextPassword = "password Error!";
  // ユーザー名関連定数
  const testUsername = "testUsername";
  const onChangeUsername = jest.fn();
  const onBlurUsername = jest.fn();
  const errorTextUsername = "username Error!";
  // パスワード（確認用）関連定数
  const testPasswordConf = "testPasswordConf";
  const onChangePasswordConf = jest.fn();
  const onBlurPasswordConf = jest.fn();
  const errorTextPasswordConf = "passwordConf Error!";

  const typeString = "typeString";

  it("Render Sign Up", () => {
    render(
      <SignForm
        email={testEmail}
        onChangeEmail={onChangeEmail}
        onBlurEmail={onBlurEmail}
        errorTextEmail={errorTextEmail}
        invalidEmail={false}
        password={testPassword}
        onChangePassword={onChangePassword}
        onBlurPassword={onBlurPassword}
        errorTextPassword={errorTextPassword}
        invalidPassword={false}
        username={testUsername}
        onChangeUsername={onChangeUsername}
        onBlurUsername={onBlurUsername}
        errorTextUsername={errorTextUsername}
        invalidUsername={false}
        passwordConf={testPasswordConf}
        onChangePasswordConf={onChangePasswordConf}
        onBlurPasswordConf={onBlurPasswordConf}
        errorTextPasswordConf={errorTextPasswordConf}
        invalidPasswordConf={false}
      />
    );

    /*
    * 「メールアドレス」フォームのチェック
    */
    // メールアドレスの入力フォームが存在することを確認
    const emailElement = screen.queryByDisplayValue(testEmail) as HTMLInputElement;
    expect(emailElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(emailElement.value).toBe(testEmail);

    // typeがemailになっていることを確認
    expect(emailElement.type).toBe("email");

    // キーボード入力をしたときにonChange関数が呼び出されることを確認
    useEvent.type(emailElement, typeString);
    expect(onChangeEmail).toHaveBeenCalledTimes(typeString.length);

    // カーソルを外した時、onBlur関数が呼び出されることを確認
    useEvent.click(emailElement);
    expect(onBlurEmail).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurEmail).toHaveBeenCalledTimes(1);

    // ラベル「メールアドレス」が表示されていることを確認
    const emailLabelElement = screen.queryByText("メールアドレス");
    expect(emailLabelElement).not.toBeNull();

    // エラーテキストが表示されないことを確認
    const errorTextEmailElement = screen.queryByText(errorTextEmail);
    expect(errorTextEmailElement).toBeNull();

    /*
    * 「パスワード」フォームのチェック
    */
    // パスワードの入力フォームが存在することを確認
    const passwordElement = screen.queryByTestId("passwordTestId") as HTMLInputElement;
    expect(passwordElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(passwordElement.value).toBe(testPassword);

    // typeがtextになっていることを確認
    expect(passwordElement.type).toBe("password");

    // キーボード入力をしたときにonChange関数が呼び出されることを確認
    useEvent.type(passwordElement, typeString);
    expect(onChangePassword).toHaveBeenCalledTimes(typeString.length);

    // カーソルを外した時、onBlur関数が呼び出されることを確認
    useEvent.click(passwordElement);
    expect(onBlurPassword).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurPassword).toHaveBeenCalledTimes(1);

    // ラベル「パスワード」が表示されていることを確認
    const passwordLabelElement = screen.queryByText("パスワード");
    expect(passwordLabelElement).not.toBeNull();

    // エラーテキストが表示されないことを確認
    const errorTextPasswordElement = screen.queryByText(errorTextPassword);
    expect(errorTextPasswordElement).toBeNull();

    /*
    * 「名前」フォームのチェック
    */
    // 名前の入力フォームが存在することを確認
    const usernameElement = screen.queryByDisplayValue(testUsername) as HTMLInputElement;
    expect(usernameElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(usernameElement.value).toBe(testUsername);

    // typeがtextになっていることを確認
    expect(usernameElement.type).toBe("text");

    // キーボード入力をしたときにonChange関数が呼び出されることを確認
    useEvent.type(usernameElement, typeString);
    expect(onChangeUsername).toHaveBeenCalledTimes(typeString.length);

    // カーソルを外した時、onBlur関数が呼び出されることを確認
    useEvent.click(usernameElement);
    expect(onBlurUsername).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurUsername).toHaveBeenCalledTimes(1);

    // ラベル「名前」が表示されていることを確認
    const usernameLabelElement = screen.queryByText("名前");
    expect(usernameLabelElement).not.toBeNull();

    // エラーテキストが表示されないことを確認
    const errorTextUsernameElement = screen.queryByText(errorTextUsername);
    expect(errorTextUsernameElement).toBeNull();

    /*
    * 「パスワード確認」フォームのチェック
    */
    // パスワード確認の入力フォームが存在することを確認
    const passwordConfElement = screen.queryByTestId("passwordConfirmTestId") as HTMLInputElement;
    expect(passwordConfElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(passwordConfElement.value).toBe(testPasswordConf);

    // typeがtextになっていることを確認
    expect(passwordConfElement.type).toBe("password");

    // キーボード入力をしたときにonChange関数が呼び出されることを確認
    useEvent.type(passwordConfElement, typeString);
    expect(onChangePasswordConf).toHaveBeenCalledTimes(typeString.length);

    // カーソルを外した時、onBlur関数が呼び出されることを確認
    useEvent.click(passwordConfElement);
    expect(onBlurPasswordConf).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurPasswordConf).toHaveBeenCalledTimes(1);

    // ラベル「パスワード」が表示されていることを確認
    const passwordConfLabelElement = screen.queryByText("パスワード確認");
    expect(passwordConfLabelElement).not.toBeNull();

    // エラーテキストが表示されないことを確認
    const errorTextPasswordConfElement = screen.queryByText(errorTextPasswordConf);
    expect(errorTextPasswordConfElement).toBeNull();

    // 必須バッヂが4つ設定されていることを確認
    const requireBadgeElements = screen.queryAllByText("必須");
    expect(requireBadgeElements.length).toBe(4);

    // 任意バッヂが存在しないことを確認
    const optionalBadgeElements = screen.queryAllByText("任意");
    expect(optionalBadgeElements.length).toBe(0);
  });

  it("Render Sign In", () => {
    render(
      <SignForm
        email={testEmail}
        onChangeEmail={onChangeEmail}
        onBlurEmail={onBlurEmail}
        errorTextEmail={errorTextEmail}
        invalidEmail={false}
        password={testPassword}
        onChangePassword={onChangePassword}
        onBlurPassword={onBlurPassword}
        errorTextPassword={errorTextPassword}
        invalidPassword={false}
        isSignIn
      />
    );

    /*
    * 「メールアドレス」フォームのチェック
    */
    // メールアドレスの入力フォームが存在することを確認
    const emailElement = screen.queryByDisplayValue(testEmail) as HTMLInputElement;
    expect(emailElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(emailElement.value).toBe(testEmail);

    // typeがemailになっていることを確認
    expect(emailElement.type).toBe("email");

    // キーボード入力をしたときにonChange関数が呼び出されることを確認
    useEvent.type(emailElement, typeString);
    expect(onChangeEmail).toHaveBeenCalledTimes(typeString.length);

    // カーソルを外した時、onBlur関数が呼び出されることを確認
    useEvent.click(emailElement);
    expect(onBlurEmail).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurEmail).toHaveBeenCalledTimes(1);

    // ラベル「メールアドレス」が表示されていることを確認
    const emailLabelElement = screen.queryByText("メールアドレス");
    expect(emailLabelElement).not.toBeNull();

    // エラーテキストが表示されないことを確認
    const errorTextEmailElement = screen.queryByText(errorTextEmail);
    expect(errorTextEmailElement).toBeNull();

    /*
    * 「パスワード」フォームのチェック
    */
    // パスワードの入力フォームが存在することを確認
    const passwordElement = screen.queryByTestId("passwordTestId") as HTMLInputElement;
    expect(passwordElement).not.toBeNull();

    // 要素の値が渡した値になっていることを確認
    expect(passwordElement.value).toBe(testPassword);

    // typeがtextになっていることを確認
    expect(passwordElement.type).toBe("password");

    // キーボード入力をしたときにonChange関数が呼び出されることを確認
    useEvent.type(passwordElement, typeString);
    expect(onChangePassword).toHaveBeenCalledTimes(typeString.length);

    // カーソルを外した時、onBlur関数が呼び出されることを確認
    useEvent.click(passwordElement);
    expect(onBlurPassword).toHaveBeenCalledTimes(0);
    useEvent.tab();
    expect(onBlurPassword).toHaveBeenCalledTimes(1);

    // ラベル「パスワード」が表示されていることを確認
    const passwordLabelElement = screen.queryByText("パスワード");
    expect(passwordLabelElement).not.toBeNull();

    // エラーテキストが表示されないことを確認
    const errorTextPasswordElement = screen.queryByText(errorTextPassword);
    expect(errorTextPasswordElement).toBeNull();

    /*
    * 「名前」フォームのチェック
    */
    // 名前の入力フォームが存在しないことを確認
    const usernameElement = screen.queryByDisplayValue(testUsername) as HTMLInputElement;
    expect(usernameElement).toBeNull();

    // ラベル「名前」が表示されていないことを確認
    const usernameLabelElement = screen.queryByText("名前");
    expect(usernameLabelElement).toBeNull();

    /*
    * 「パスワード確認」フォームのチェック
    */
    // パスワード確認の入力フォームが存在することを確認
    const passwordConfElement = screen.queryByTestId("passwordConfirmTestId") as HTMLInputElement;
    expect(passwordConfElement).toBeNull();

    // ラベル「パスワード」が表示されていることを確認
    const passwordConfLabelElement = screen.queryByText("パスワード確認");
    expect(passwordConfLabelElement).toBeNull();

    // 必須バッヂが存在しないことを確認
    const requireBadgeElements = screen.queryAllByText("必須");
    expect(requireBadgeElements.length).toBe(0);

    // 任意バッヂが存在しないことを確認
    const optionalBadgeElements = screen.queryAllByText("任意");
    expect(optionalBadgeElements.length).toBe(0);
  });

  it("Render ErrorTextEmail When InvalidEmail Is True", () => {
    render(
      <SignForm
        email={testEmail}
        onChangeEmail={onChangeEmail}
        onBlurEmail={onBlurEmail}
        errorTextEmail={errorTextEmail}
        invalidEmail
        password={testPassword}
        onChangePassword={onChangePassword}
        onBlurPassword={onBlurPassword}
        errorTextPassword={errorTextPassword}
        invalidPassword={false}
        isSignIn
      />
    );

    // メールアドレスのエラーテキストが表示されることを確認
    const errorTextEmailElement = screen.queryByText(errorTextEmail);
    expect(errorTextEmailElement).not.toBeNull();

    // パスワードのエラーテキストが表示されないことを確認
    const errorTextPasswordElement = screen.queryByText(errorTextPassword);
    expect(errorTextPasswordElement).toBeNull();
  });

  it("Render ErrorTextPassword When InvalidPassword Is True", () => {
    render(
      <SignForm
        email={testEmail}
        onChangeEmail={onChangeEmail}
        onBlurEmail={onBlurEmail}
        errorTextEmail={errorTextEmail}
        invalidEmail={false}
        password={testPassword}
        onChangePassword={onChangePassword}
        onBlurPassword={onBlurPassword}
        errorTextPassword={errorTextPassword}
        invalidPassword
        isSignIn
      />
    );

    // メールアドレスのエラーテキストが表示されないことを確認
    const errorTextEmailElement = screen.queryByText(errorTextEmail);
    expect(errorTextEmailElement).toBeNull();

    // パスワードのエラーテキストが表示されることを確認
    const errorTextPasswordElement = screen.queryByText(errorTextPassword);
    expect(errorTextPasswordElement).not.toBeNull();
  });

  it("Render ErrorUsernameEmail When InvalidUsername Is True", () => {
    render(
      <SignForm
        email={testEmail}
        onChangeEmail={onChangeEmail}
        onBlurEmail={onBlurEmail}
        errorTextEmail={errorTextEmail}
        invalidEmail={false}
        password={testPassword}
        onChangePassword={onChangePassword}
        onBlurPassword={onBlurPassword}
        errorTextPassword={errorTextPassword}
        invalidPassword={false}
        username={testUsername}
        onChangeUsername={onChangeUsername}
        onBlurUsername={onBlurUsername}
        errorTextUsername={errorTextUsername}
        invalidUsername
        passwordConf={testPasswordConf}
        onChangePasswordConf={onChangePasswordConf}
        onBlurPasswordConf={onBlurPasswordConf}
        errorTextPasswordConf={errorTextPasswordConf}
        invalidPasswordConf={false}
      />
    );

    // メールアドレスのエラーテキストが表示されないことを確認
    const errorTextEmailElement = screen.queryByText(errorTextEmail);
    expect(errorTextEmailElement).toBeNull();

    // パスワードのエラーテキストが表示されないことを確認
    const errorTextPasswordElement = screen.queryByText(errorTextPassword);
    expect(errorTextPasswordElement).toBeNull();

    // 名前のエラーテキストが表示されることを確認
    const errorTextUsernameElement = screen.queryByText(errorTextUsername);
    expect(errorTextUsernameElement).not.toBeNull();

    // パスワードのエラーテキストが表示されないことを確認
    const errorTextPasswordConfElement = screen.queryByText(errorTextPasswordConf);
    expect(errorTextPasswordConfElement).toBeNull();
  });

  it("Render ErrorTextPasswordConf When InvalidPasswordConf Is True", () => {
    render(
      <SignForm
        email={testEmail}
        onChangeEmail={onChangeEmail}
        onBlurEmail={onBlurEmail}
        errorTextEmail={errorTextEmail}
        invalidEmail={false}
        password={testPassword}
        onChangePassword={onChangePassword}
        onBlurPassword={onBlurPassword}
        errorTextPassword={errorTextPassword}
        invalidPassword={false}
        username={testUsername}
        onChangeUsername={onChangeUsername}
        onBlurUsername={onBlurUsername}
        errorTextUsername={errorTextUsername}
        invalidUsername={false}
        passwordConf={testPasswordConf}
        onChangePasswordConf={onChangePasswordConf}
        onBlurPasswordConf={onBlurPasswordConf}
        errorTextPasswordConf={errorTextPasswordConf}
        invalidPasswordConf
      />
    );

    // メールアドレスのエラーテキストが表示されないことを確認
    const errorTextEmailElement = screen.queryByText(errorTextEmail);
    expect(errorTextEmailElement).toBeNull();

    // パスワードのエラーテキストが表示されないことを確認
    const errorTextPasswordElement = screen.queryByText(errorTextPassword);
    expect(errorTextPasswordElement).toBeNull();

    // 名前のエラーテキストが表示されないことを確認
    const errorTextUsernameElement = screen.queryByText(errorTextUsername);
    expect(errorTextUsernameElement).toBeNull();

    // パスワードのエラーテキストが表示されることを確認
    const errorTextPasswordConfElement = screen.queryByText(errorTextPasswordConf);
    expect(errorTextPasswordConfElement).not.toBeNull();
  });
});
