import { ChangeEvent, memo, ReactNode, VFC } from "react";
import { Box, VStack } from "@chakra-ui/react";

import { TextForm } from "../../parts/form/TextForm";
import { PasswordForm } from "../../parts/form/PasswordForm";

type Props = {
  email: string;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurEmail: () => void;
  errorTextEmail: string;
  invalidEmail: boolean;
  password: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurPassword: () => void;
  errorTextPassword: string;
  invalidPassword: boolean;
  username?: string;
  onChangeUsername?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurUsername?: () => void;
  errorTextUsername?: string;
  invalidUsername?: boolean;
  passwordConf?: string;
  onChangePasswordConf?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurPasswordConf?: () => void;
  errorTextPasswordConf?: string;
  invalidPasswordConf?: boolean;
  isSignIn?: boolean;
};

const dummyFunction = () => {};

export const SignForm: VFC<Props> = memo((props) => {
  const {
    email,
    onChangeEmail,
    onBlurEmail,
    errorTextEmail,
    invalidEmail,
    password,
    onChangePassword,
    onBlurPassword,
    errorTextPassword,
    invalidPassword,
    isSignIn = false,
    username = "",
    onChangeUsername = dummyFunction,
    onBlurUsername = dummyFunction,
    errorTextUsername = "",
    invalidUsername = false,
    passwordConf = "",
    onChangePasswordConf = dummyFunction,
    onBlurPasswordConf = dummyFunction,
    errorTextPasswordConf = "",
    invalidPasswordConf = false,
  } = props;

  let usernameForm: ReactNode;
  let passwordConfForm: ReactNode;
  let requireStatus : "require" | "" = "";
  if (isSignIn) {
    usernameForm = <Box />;
    passwordConfForm = <Box />;
  } else {
    requireStatus = "require";
    usernameForm = (
      <TextForm
        label="名前"
        require={requireStatus}
        value={username}
        onChange={onChangeUsername}
        onBlur={onBlurUsername}
        errorText={errorTextUsername}
        isInvalid={invalidUsername}
      />
    );
    passwordConfForm = (
      <PasswordForm
        label="パスワード確認"
        require={requireStatus}
        password={passwordConf}
        onChange={onChangePasswordConf}
        onBlur={onBlurPasswordConf}
        errorText={errorTextPasswordConf}
        isInvalid={invalidPasswordConf}
        dataTestid="passwordConfirmTestId"
      />
    );
  }

  return (
    <VStack>
      {usernameForm}
      <TextForm
        label="メールアドレス"
        require={requireStatus}
        value={email}
        type="email"
        onChange={onChangeEmail}
        onBlur={onBlurEmail}
        errorText={errorTextEmail}
        isInvalid={invalidEmail}
      />
      <PasswordForm
        label="パスワード"
        require={requireStatus}
        password={password}
        onChange={onChangePassword}
        onBlur={onBlurPassword}
        errorText={errorTextPassword}
        isInvalid={invalidPassword}
        dataTestid="passwordTestId"
      />
      {passwordConfForm}
    </VStack>
  );
});
