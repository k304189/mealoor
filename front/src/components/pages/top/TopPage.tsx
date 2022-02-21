import { ChangeEvent, memo, VFC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

import { DefaultAvatar } from "../../atoms/display/DefaultAvatar";
import { RequireBadge } from "../../atoms/display/RequireBadge";
import { OptionalBadge } from "../../atoms/display/OptionalBadge";
import { DefaultButton } from "../../atoms/button/DefaultButton";
import { DefaultIconButton } from "../../atoms/button/DefaultIconButton";
import { DefaultTextInput } from "../../atoms/form/DefaultTextInput";
import { ToggleViewButton } from "../../molecules/button/ToggleViewButton";
import { PasswordInput } from "../../molecules/form/PasswordInput";
import { ReadOnlyInput } from "../../molecules/form/ReadOnlyInput";
import { FormArea } from "../../molecules/form/FormArea";
import { AvatarUsername } from "../../molecules/layout/AvatarUsername";
import { TextForm } from "../../organisms/parts/form/TextForm";
import { SignModal } from "../../organisms/pages/account/SignModal";
import { PasswordForm } from "../../organisms/parts/form/PasswordForm";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { mainColor, textColor } from "../../../theme/systemTheme";

export const TopPage: VFC = memo(() => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [password, setPassword] = useState("");
  const [isView, setIsView] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onBlurPassword = () => {
    console.log("onBlurPassword Called!");
  };

  const onClickDashboardButton = () => {
    navigate("/dashboard");
  };

  return (
    <HeaderLayout>
      <Box align="left" my={2} py={1} bg={mainColor} color={textColor}>
        <DefaultAvatar />
        Topページです
      </Box>
      <Box py={5} my={6} bg={mainColor} color={textColor}>
        <DefaultTextInput
          type="text"
          placeholder="テスト用テキストボックス"
          value={inputText}
          onChange={onChangeInputText}
        />
        <Button color="#FFFFFF" bg="gray.500">無効ボタン</Button>
        <PasswordInput
          password={password}
          placeholder="パスワード"
          onChange={onChangePassword}
          onBlur={onBlurPassword}
        />
        <ReadOnlyInput value={100} leftAddon="https://" rightAddon="%" />
        <Box>
          <RequireBadge />
          <RequireBadge fontSize="xs" />
          <RequireBadge fontSize="sm" />
          <RequireBadge fontSize="lg" />
          <OptionalBadge />
          <OptionalBadge fontSize="xs" />
          <OptionalBadge fontSize="sm" />
          <OptionalBadge fontSize="lg" />
        </Box>
        <FormArea
          label="テスト用フォームエリア"
          helperText="ヘルパーテキスト"
          errorText="エラーテキスト"
          isReadOnly
        >
          <DefaultTextInput
            type="text"
            placeholder="テスト用フォームエリア"
            value={inputText}
            onChange={onChangeInputText}
          />
        </FormArea>
        <TextForm
          label="TextForm"
          value={inputText}
          onChange={onChangeInputText}
          helperText="ヘルパーTextForm"
          leftAddon="+81"
          rightAddon="%"
          errorText="エラーTextForm"
          isReadOnly
        />
        <PasswordForm
          label="パスワード確認用"
          require="optional"
          password={inputText}
          onChange={onChangeInputText}
          onBlur={onBlurPassword}
          helperText="PasswordFormヘルパー"
          errorText="PasswordFormエラーテキスト"
          isReadOnly
        />
        <SignModal
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
      <DefaultButton
        onClick={onClickDashboardButton}
        className="primary"
        hoverText="ダッシュボードへ"
      >
        <p>ダッシュボード</p>
      </DefaultButton>
      <DefaultButton
        onClick={onOpen}
        className="primary"
        hoverText="モーダルオープン"
      >
        モーダルオープン
      </DefaultButton>
      <AvatarUsername />
      <DefaultIconButton hoverText="アイコンボタン" aria-label="View Icon" icon={<ViewIcon />} />
      <ToggleViewButton isView={isView} setIsView={setIsView} />
      <p>文字確認</p>
    </HeaderLayout>
  );
});
