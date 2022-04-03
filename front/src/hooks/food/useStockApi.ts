import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TStock } from "../../types/api/TStock";
import { TStockPaginate } from "../../types/api/TStockPaginate";
import {
  URL_STOCK_LIST,
  URL_STOCK_CREATE,
  URL_STOCK_UPDATE,
  URL_STOCK_DELETE,
} from "../../constants/urls";

type T = {
  getStock: (page?: number) => Promise<TStockPaginate>;
  createStock: (createJson: TStock) => Promise<TStock>;
  updateStock: (updateJson: TStock) => Promise<TStock>;
  deleteStock: (deleteId: number) => Promise<number>;
};

export const useStockApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const getStock = useCallback(async (page?: number) => {
    const headers = getRequestHeader();
    let url = URL_STOCK_LIST;
    if (page) {
      url = `${url}?page=${page}`;
    }
    const response = await axios.get(url, { headers });

    return response.data;
  }, []);

  const createStock = useCallback(async (createJson: TStock) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_STOCK_CREATE, createJson, { headers });

    return response.data;
  }, []);

  const updateStock = useCallback(async (updateJson: TStock) => {
    const headers = getRequestHeader();
    const url = `${URL_STOCK_UPDATE}${updateJson.id}/`;

    const response = await axios.patch(url, updateJson, { headers });

    return response.data;
  }, []);

  const deleteStock = useCallback(async (deleteId: number) => {
    const headers = getRequestHeader();
    const url = `${URL_STOCK_DELETE}${deleteId}/`;

    const response = await axios.delete(url, { headers });

    return response.data;
  }, []);

  return { getStock, createStock, updateStock, deleteStock };
};
