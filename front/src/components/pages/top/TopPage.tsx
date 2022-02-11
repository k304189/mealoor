import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { DefaultButton } from "../../atoms/button/DefaultButton";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { mainColor, textColor } from "../../../theme/systemTheme";

export const TopPage: VFC = memo(() => {
  const navigate = useNavigate();

  const onClickDashboardButton = () => {
    navigate("/dashboard");
  };

  return (
    <HeaderLayout>
      <Box my={2} py={1} bg={mainColor} color={textColor}>
        <p>Topページです</p>
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
