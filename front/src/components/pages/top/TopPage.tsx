import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultButton } from "../../atoms/button/DefaultButton";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const TopPage: VFC = memo(() => {
  const navigate = useNavigate();

  const onClickDashboardButton = () => {
    navigate("/dashboard");
  };

  return (
    <HeaderLayout>
      <div>
        <p>Topページです</p>
      </div>
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
