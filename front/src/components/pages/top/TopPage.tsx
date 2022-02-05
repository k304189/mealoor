import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";

export const TopPage: VFC = memo(() => {
  const navigate = useNavigate();

  const onClickDashboardButton = () => {
    navigate("/dashboard");
  }

  return (
    <>
      <p>Topページです</p>
      <button onClick={ onClickDashboardButton }>ダッシュボード</button>
    </>
  )
});
