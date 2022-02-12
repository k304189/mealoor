import { ChangeEvent, memo, VFC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { RequireBadge } from "../../atoms/display/RequireBadge";
import { OptionalBadge } from "../../atoms/display/OptionalBadge";
import { DefaultButton } from "../../atoms/button/DefaultButton";
import { DefaultIconButton } from "../../atoms/button/DefaultIconButton";
import { DefaultTextInput } from "../../atoms/form/DefaultTextInput";
import { ReadOnlyInput } from "../../atoms/form/ReadOnlyInput";
import { ToggleViewButton } from "../../molecules/button/ToggleViewButton";
import { PasswordInput } from "../../molecules/form/PasswordInput";
import { FormArea } from "../../molecules/form/FormArea";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { mainColor, textColor } from "../../../theme/systemTheme";

export const TopPage: VFC = memo(() => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [password, setPassword] = useState("");
  const [isView, setIsView] = useState(false);

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
      <Box my={2} py={1} bg={mainColor} color={textColor}>
        <p>Topページです</p>
      </Box>
      <Box py={5} my={6} bg={mainColor} color={textColor}>
        <DefaultTextInput
          type="text"
          placeholder="テスト用テキストボックス"
          value={inputText}
          onChange={onChangeInputText}
        />
        <ReadOnlyInput value={100} />
        <ReadOnlyInput value="読み取り専用" />
        <Button color="#FFFFFF" bg="gray.500">無効ボタン</Button>
        <PasswordInput
          password={password}
          placeholder="パスワード"
          onChange={onChangePassword}
          onBlur={onBlurPassword}
        />
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
      </Box>
      <DefaultButton
        onClick={onClickDashboardButton}
        className="primary"
        hoverText="ダッシュボードへ"
      >
        <p>ダッシュボード</p>
      </DefaultButton>
      <DefaultButton
        onClick={() => { setIsView(!isView); }}
        className="primary"
        hoverText="アイコンテスト"
      >
        { (isView ? <ViewOffIcon /> : <ViewIcon />) }
      </DefaultButton>
      <DefaultIconButton hoverText="アイコンボタン" aria-label="View Icon" icon={<ViewIcon />} />
      <ToggleViewButton isView={isView} setIsView={setIsView} />
    </HeaderLayout>
  );
});
