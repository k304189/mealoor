import { ChangeEvent, memo, VFC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

import { DefaultButton } from "../../atoms/button/DefaultButton";
import { DefaultTextInput } from "../../atoms/form/DefaultTextInput";
import { ReadOnlyInput } from "../../atoms/form/ReadOnlyInput";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { mainColor, textColor } from "../../../theme/systemTheme";

export const TopPage: VFC = memo(() => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
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
      </Box>
      <DefaultButton
        onClick={onClickDashboardButton}
        className="primary"
        hoverText="ダッシュボードへ"
      >
        <p>ダッシュボード</p>
      </DefaultButton>
    </HeaderLayout>
  );
});
