import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderLayout } from "../../templates/HeaderLayout";

export const DashboardPage: VFC = memo(() => {
  const navigate = useNavigate();

  const onClickTopButton = () => {
    navigate("/");
  }

  return (
    <HeaderLayout>
      <div>
        <p>Dashboardページです</p>
        <button onClick={ onClickTopButton }>Top</button>
      </div>
    </HeaderLayout>
  )
});
