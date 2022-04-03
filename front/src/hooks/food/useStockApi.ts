import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TStock } from "../../types/api/TStock";
import {
  URL_STOCK_CREATE,
} from "../../constants/urls";

type T = {
  createStock: (createJson: TStock) => Promise<TStock>;
};

export const useStockApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const createStock = useCallback(async (createJson: TStock) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_STOCK_CREATE, createJson, { headers });

    return response.data;
  }, []);

  return { createStock };
};
