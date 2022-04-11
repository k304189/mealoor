import { memo, VFC } from "react";
import { Route, Routes } from "react-router-dom";

import { TopPage } from "../components/pages/static/TopPage";
import { WithdrawPage } from "../components/pages/static/WithdrawPage";
import { Http404Page } from "../components/pages/static/Http404Page";
import { DashboardPage } from "../components/pages/dashboard/DashboardPage";
import { AccountEditPage } from "../components/pages/account/AccountEditPage";
import { FavoriteEatListPage } from "../components/pages/favoriteEat/FavoriteEatListPage";
import { HavingStockListPage } from "../components/pages/stock/HavingStockListPage";
import { CookingStockPage } from "../components/pages/cook/CookingStockPage";
import { FavoriteStockListPage } from "../components/pages/favoriteStock/FavoriteStockListPage";

export const Router: VFC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="account" element={<AccountEditPage />} />
      <Route path="favoriteEat" element={<FavoriteEatListPage />} />
      <Route path="stock" element={<HavingStockListPage />} />
      <Route path="cook" element={<CookingStockPage />} />
      <Route path="favoriteStock" element={<FavoriteStockListPage />} />
      <Route path="withdraw" element={<WithdrawPage />} />
      <Route path="*" element={<Http404Page />} />
    </Routes>
  );
});
