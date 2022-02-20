import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { DefaultModal } from "../../../molecules/layout/DefaultModal";
import { SignForm } from "./SignForm";
import { useAuthApi } from "../../../../hooks/common/auth/useAuthApi";
import { useMessage } from "../../../../hooks/common/layout/useMessage";
import { useAccountValidate } from "../../../../hooks/account/useAccountValidate";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isSignIn?: boolean;
};

export const SignModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, isSignIn = false } = props;
  const { validateEmail, validatePassword, validateUsername } = useAccountValidate();
  const { signIn, signUp } = useAuthApi();
  const { successToast, errorToast } = useMessage();
  const navigate = useNavigate();
  let modalTitle: string;
  let callFunction: () => void;
  // リクエスト変数
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  // エラーチェック変数
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPasswordConf, setInvalidPasswordConf] = useState(false);
  // エラーメッセージ変数
  const [errorTextEmail, setErrorTextEmail] = useState("");
  const [errorTextPassword, setErrorTextPassword] = useState("");
  const [errorTextUsername, setErrorTextUsername] = useState("");
  const [errorTextPasswordConf, setErrorTextPasswordConf] = useState("");
  // ボタン関連変数
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  // マウント状況確認
  const [isMount, setIsMount] = useState(true);

  // 各変数更新関数
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onChangePasswordConf = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConf(e.target.value);
  };

  // 各変数バリデーション
  const onBlurEmail = () => {
    const validateResult = validateEmail(email);
    setInvalidEmail(validateResult.invalid);
    setErrorTextEmail(validateResult.errorText);
  };
  const onBlurPassword = () => {
    const validateResult = validatePassword(password);
    setInvalidPassword(validateResult.invalid);
    setErrorTextPassword(validateResult.errorText);
  };
  const onBlurUsername = () => {
    const validateResult = validateUsername(username);
    setInvalidUsername(validateResult.invalid);
    setErrorTextUsername(validateResult.errorText);
  };
  const onBlurPasswordConf = () => {
    const validateResult = validatePassword(passwordConf);
    setInvalidPasswordConf(validateResult.invalid);
    setErrorTextPasswordConf(validateResult.errorText);
  };

  // 呼び出し関数
  const callSignIn = () => {
    const signInUser = { email, password };
    const { invalid: emailFlg } = validateEmail(signInUser.email);
    const { invalid: passwordFlg } = validatePassword(signInUser.password);
    if (isMount) {
      if (!(emailFlg || passwordFlg)) {
        setButtonLoading(true);
        signIn(signInUser)
          .then(() => {
            successToast("サインインに成功しました");
            navigate("/dashboard");
          })
          .catch(() => {
            errorToast("サインインに失敗しました");
          })
          .finally(() => {
            setButtonLoading(false);
          });
      } else {
        onBlurEmail();
        onBlurPassword();
        errorToast("入力値が不正です");
      }
    }
  };

  const callSignUp = () => {
    const signUpUser = { email, password, username, passwordConf };
    const { invalid: emailFlg } = validateEmail(signUpUser.email);
    const { invalid: passwordFlg } = validatePassword(signUpUser.password);
    const { invalid: usernameFlg } = validateEmail(signUpUser.username);
    const { invalid: passwordConfFlg } = validatePassword(signUpUser.passwordConf);
    if (isMount) {
      if (!(emailFlg || passwordFlg || usernameFlg || passwordConfFlg)) {
        if (password === passwordConf) {
          setButtonLoading(true);
          signUp(signUpUser)
            .then(() => {
              successToast("サインアップに成功しました");
              navigate("/dashboard");
            })
            .catch(() => {
              errorToast("サインアップに失敗しました");
            })
            .finally(() => {
              setButtonLoading(false);
            });
        } else {
          errorToast("パスワードと確認用が一致しません");
        }
      } else {
        onBlurUsername();
        onBlurEmail();
        onBlurPassword();
        onBlurPasswordConf();
        errorToast("入力値が不正です");
      }
    }
  };

  if (isSignIn) {
    modalTitle = "サインイン";
    callFunction = callSignIn;
  } else {
    modalTitle = "サインアップ";
    callFunction = callSignUp;
  }

  useEffect(() => {
    const disabled = (
      invalidEmail || invalidPassword || invalidUsername || invalidPasswordConf
    );
    setButtonDisabled(disabled);
  }, [invalidEmail, invalidPassword, invalidUsername, invalidPasswordConf]);

  useEffect(() => {
    return () => {
      setIsMount(false);
    };
  }, []);

  const signFormComponent = (
    <SignForm
      email={email}
      onChangeEmail={onChangeEmail}
      onBlurEmail={onBlurEmail}
      errorTextEmail={errorTextEmail}
      invalidEmail={invalidEmail}
      password={password}
      onChangePassword={onChangePassword}
      onBlurPassword={onBlurPassword}
      errorTextPassword={errorTextPassword}
      invalidPassword={invalidPassword}
      username={username}
      onChangeUsername={onChangeUsername}
      onBlurUsername={onBlurUsername}
      errorTextUsername={errorTextUsername}
      invalidUsername={invalidUsername}
      passwordConf={passwordConf}
      onChangePasswordConf={onChangePasswordConf}
      onBlurPasswordConf={onBlurPasswordConf}
      errorTextPasswordConf={errorTextPasswordConf}
      invalidPasswordConf={invalidPasswordConf}
      isSignIn={isSignIn}
    />
  );

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader={modalTitle}
      modalBody={signFormComponent}
      modalFooter={(
        <DefaultButton
          onClick={callFunction}
          className="primary"
          disabled={buttonDisabled}
          loading={buttonLoading}
          dataTestid="SignModalButton"
        >
          {modalTitle}
        </DefaultButton>
      )}
    />
  );
});
