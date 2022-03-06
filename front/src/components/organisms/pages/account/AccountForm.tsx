import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { DefaultButton } from "../../../atoms/button/DefaultButton";
import { DefaultAvatar } from "../../../atoms/display/DefaultAvatar";
import { AdminAccountBadge } from "../../../atoms/display/AdminAccountBadge";
import { DefaultAlertDialog } from "../../../molecules/layout/DefaultAlertDialog";
import { TextForm } from "../../parts/form/TextForm";
import { TextareaForm } from "../../parts/form/TextareaForm";
import { TAccount } from "../../../../types/api/TAccount";
import { useAccountApi } from "../../../../hooks/account/useAccountApi";
import { useAccountValidate } from "../../../../hooks/account/useAccountValidate";
import { useMessage } from "../../../../hooks/common/layout/useMessage";

export const AccountForm: VFC = memo(() => {
  const {
    account,
    getAccount,
    updateAccount,
    withdrawAccount,
  } = useAccountApi();
  const {
    validateUsername,
    validateFirstName,
    validateLastName,
    validateProfile,
  } = useAccountValidate();
  const navigate = useNavigate();
  const { successToast, errorToast } = useMessage();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profile, setProfile] = useState("");
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidProfile, setInvalidProfile] = useState(false);

  const [errorTextUsername, setErrorTextUsername] = useState("");
  const [errorTextFirstName, setErrorTextFirstName] = useState("");
  const [errorTextLastName, setErrorTextLastName] = useState("");
  const [errorTextProfile, setErrorTextProfile] = useState("");

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const onChangeProfile = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProfile(e.target.value);
  };

  const onBlurUsername = () => {
    const { invalid, errorText } = validateUsername(username);
    setInvalidUsername(invalid);
    setErrorTextUsername(errorText);
  };

  const onBlurFirstName = () => {
    const { invalid, errorText } = validateFirstName(firstName);
    setInvalidFirstName(invalid);
    setErrorTextFirstName(errorText);
  };

  const onBlurLastName = () => {
    const { invalid, errorText } = validateLastName(lastName);
    setInvalidLastName(invalid);
    setErrorTextLastName(errorText);
  };

  const onBlurProfile = () => {
    const { invalid, errorText } = validateProfile(profile);
    setInvalidProfile(invalid);
    setErrorTextProfile(errorText);
  };

  const setAccountInfo = () => {
    if (account) {
      setEmail(account.email ?? "");
      setUsername(account.username);
      setFirstName(account["first_name"] ?? "");
      setLastName(account["last_name"] ?? "");
      setProfile(account.profile ?? "");
      setIsSuperuser(account.is_superuser ?? false);
    }
  };

  const onClickUpdateAccount = () => {
    setButtonLoading(true);
    let json: TAccount;
    const { invalid: usernameFlg } = validateUsername(username);
    const { invalid: firstNameFlg } = validateFirstName(firstName);
    const { invalid: lastNameFlg } = validateLastName(lastName);
    const { invalid: profileFlg } = validateProfile(profile);
    if (!(usernameFlg || firstNameFlg || lastNameFlg || profileFlg)) {
      json = {
        username,
        first_name: firstName,
        last_name: lastName,
        profile,
      };
      updateAccount(json)
        .then(() => {
          successToast("更新に成功しました");
        })
        .catch(() => {
          errorToast("更新に失敗しました");
        });
    } else {
      onBlurUsername();
      onBlurFirstName();
      onBlurLastName();
      onBlurProfile();
      errorToast("入力値に問題があります");
    }
    setButtonLoading(false);
  };

  const onClickWithdrawAccount = () => {
    withdrawAccount()
      .then(() => {
        successToast("退会処理が完了しました");
        navigate("/withdraw");
      })
      .catch((e) => {
        errorToast("退会処理が失敗しました");
        throw e;
      });
  };

  useEffect(() => {
    getAccount()
      .catch(() => {
        errorToast("アカウント情報取得に失敗しました");
      });
  }, []);

  useEffect(() => {
    setAccountInfo();
  }, [account]);

  useEffect(() => {
    const disabled = invalidUsername || invalidFirstName || invalidLastName || invalidProfile;
    setButtonDisabled(disabled);
  }, [invalidUsername, invalidFirstName, invalidLastName, invalidProfile]);

  return (
    <>
      <Grid
        h="100%"
        templateColumns="repeat(5, 1fr)"
        gap={3}
        py={5}
      >
        <GridItem h="100%" colSpan={1}>
          <Center h="100%">
            <VStack spacing={2}>
              <DefaultAvatar size="2xl" />
              {isSuperuser ? (<AdminAccountBadge fontSize="xl" />) : (<Box />)}
            </VStack>
          </Center>
        </GridItem>
        <GridItem h="100%" colSpan={2}>
          <VStack w="100%" spacing={8}>
            <TextForm
              label="アドレス"
              value={email}
              onChange={() => {}}
              isReadOnly
            />
            <TextForm
              label="ユーザー名"
              require="require"
              value={username}
              onChange={onChangeUsername}
              onBlur={onBlurUsername}
              isInvalid={invalidUsername}
              errorText={errorTextUsername}
            />
            <Flex w="100%">
              <TextForm
                label="名前（姓）"
                require="optional"
                value={firstName}
                onChange={onChangeFirstName}
                onBlur={onBlurFirstName}
                isInvalid={invalidFirstName}
                errorText={errorTextFirstName}
              />
              <TextForm
                label="名前（名）"
                require="optional"
                value={lastName}
                onChange={onChangeLastName}
                onBlur={onBlurLastName}
                isInvalid={invalidLastName}
                errorText={errorTextLastName}
              />
            </Flex>
          </VStack>
        </GridItem>
        <GridItem h="100%" colSpan={2}>
          <TextareaForm
            label="プロフィール"
            require="optional"
            value={profile}
            onChange={onChangeProfile}
            onBlur={onBlurProfile}
            isInvalid={invalidProfile}
            errorText={errorTextProfile}
          />
          <Flex justify="end" px={2}>
            <HStack spacing="10px">
              <DefaultButton
                onClick={onOpen}
                className="withdraw"
              >
                退会
              </DefaultButton>
              <DefaultButton
                onClick={onClickUpdateAccount}
                className="primary"
                disabled={buttonDisabled}
                loading={buttonLoading}
              >
                更新
              </DefaultButton>
            </HStack>
          </Flex>
        </GridItem>
      </Grid>
      <DefaultAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onClickYes={onClickWithdrawAccount}
        dialogBody={(<Box>アカウントを削除しますが。よろしいですか？</Box>)}
      />
    </>
  );
});
