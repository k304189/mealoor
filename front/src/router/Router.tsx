import { memo, VFC } from "react";
import { Route, Routes } from "react-router-dom";

import { TopPage } from "../components/pages/top/TopPage";
import { DashboardPage } from "../components/pages/dashboard/DashboardPage";

export const Router: VFC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  );
});
