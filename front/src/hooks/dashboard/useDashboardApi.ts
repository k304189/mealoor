import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TDashboard } from "../../types/api/TDashboard";
import {
  URL_DASHBOARD_LIST,
} from "../../constants/urls";

type T = {
  getDashboard: (date: string) => Promise<TDashboard>;
};

export const useDashboardApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const getDashboard = useCallback(async (date: string) => {
    const headers = getRequestHeader();
    const url = `${URL_DASHBOARD_LIST}${date}/`;
    const response = await axios.get(url, { headers });

    return response.data;
  }, []);

  return { getDashboard };
};
