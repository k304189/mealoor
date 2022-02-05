import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardPage: VFC = memo(() => {
  const navigate = useNavigate();

  const onClickTopButton = () => {
    navigate("/");
  }

  return (
    <>
      <p>Dashboardページです</p>
      <button onClick={ onClickTopButton }>Top</button>
    </>
  )
});
