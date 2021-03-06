import { useCallback } from "react";

import { TValidateReturn } from "../../types/hooks/common/validate/TValidateReturn";

export type T = {
  validateEmail: (email: string) => TValidateReturn;
  validatePassword: (password: string) => TValidateReturn;
  validateUsername: (username: string) => TValidateReturn;
  validateFirstName: (firstName: string) => TValidateReturn;
  validateLastName: (lastName: string) => TValidateReturn;
  validateProfile: (profile: string) => TValidateReturn;
};

export const useAccountValidate = (): T => {
  const validateEmail = useCallback((email) => {
    const maxLength = 255;
    let invalid = false;
    let errorText = "";
    // パスワード空白チェック
    if (!email || email === "") {
      invalid = true;
      errorText = "メールアドレスが入力されていません";
    } else if (email.length > maxLength) {
      invalid = true;
      errorText = `メールアドレスは${maxLength}文字以下にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validatePassword = useCallback((password) => {
    const maxLength = 30;
    let invalid = false;
    let errorText = "";
    // パスワードの空白チェック
    if (!password || password === "") {
      invalid = true;
      errorText = "パスワードが入力されていません";
    } else if (password.length > 30) {
      invalid = true;
      errorText = `パスワードは${maxLength}文字以下にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validateUsername = useCallback((username) => {
    const maxLength = 60;
    let invalid = false;
    let errorText = "";
    // 名前の空白チェック
    if (!username || username === "") {
      invalid = true;
      errorText = "名前が入力されていません";
    } else if (username.length > 60) {
      invalid = true;
      errorText = `名前は${maxLength}文字以下にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validateFirstName = useCallback((firstName) => {
    const maxLength = 30;
    let invalid = false;
    let errorText = "";
    if (firstName.length > maxLength) {
      invalid = true;
      errorText = `名前（姓）は${maxLength}文字以下にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validateLastName = useCallback((lastName) => {
    const maxLength = 30;
    let invalid = false;
    let errorText = "";
    if (lastName.length > maxLength) {
      invalid = true;
      errorText = `名前（名）は${maxLength}文字以下にしてください`;
    }
    return { invalid, errorText };
  }, []);

  const validateProfile = useCallback((profile) => {
    const maxLength = 500;
    let invalid = false;
    let errorText = "";
    if (profile.length > maxLength) {
      invalid = true;
      errorText = `プロフィールは${maxLength}文字以下にしてください`;
    }
    return { invalid, errorText };
  }, []);

  return {
    validateEmail,
    validatePassword,
    validateUsername,
    validateFirstName,
    validateLastName,
    validateProfile,
  };
};
