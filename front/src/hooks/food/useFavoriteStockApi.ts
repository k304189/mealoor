import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TFavoriteStock } from "../../types/api/TFavoriteStock";
import { TSendUse } from "../../types/api/TSendUse";
import { TFavoriteStockPaginate } from "../../types/api/TFavoriteStockPaginate";
import {
  URL_FAVORITE_STOCK_LIST,
  URL_FAVORITE_STOCK_CREATE,
  URL_FAVORITE_STOCK_UPDATE,
  URL_FAVORITE_STOCK_DELETE,
  URL_FAVORITE_STOCK_STOCK,
} from "../../constants/urls";

type T = {
  getFavoriteStock: (page?: number) => Promise<TFavoriteStockPaginate>;
  createFavoriteStock: (createJson: TFavoriteStock) => Promise<TFavoriteStock>;
  updateFavoriteStock: (updateJson: TFavoriteStock) => Promise<TFavoriteStock>;
  deleteFavoriteStock: (deleteId: number) => Promise<number>;
  stockFavoriteStock: (useJson: TSendUse) => Promise<number>;
};

export const useFavoriteStockApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const getFavoriteStock = useCallback(async (page?: number) => {
    const headers = getRequestHeader();
    let url = URL_FAVORITE_STOCK_LIST;
    if (page) {
      url = `${url}?page=${page}`;
    }
    const response = await axios.get(url, { headers });

    return response.data;
  }, []);

  const createFavoriteStock = useCallback(async (createJson: TFavoriteStock) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_FAVORITE_STOCK_CREATE, createJson, { headers });

    return response.data;
  }, []);

  const updateFavoriteStock = useCallback(async (updateJson: TFavoriteStock) => {
    const headers = getRequestHeader();
    const url = `${URL_FAVORITE_STOCK_UPDATE}${updateJson.id}/`;

    const response = await axios.patch(url, updateJson, { headers });

    return response.data;
  }, []);

  const deleteFavoriteStock = useCallback(async (deleteId: number) => {
    const headers = getRequestHeader();
    const url = `${URL_FAVORITE_STOCK_DELETE}${deleteId}/`;

    const response = await axios.delete(url, { headers });

    return response.status;
  }, []);

  const stockFavoriteStock = useCallback(async (useJson: TSendUse) => {
    const headers = getRequestHeader();
    const url = `${URL_FAVORITE_STOCK_STOCK}${useJson.id}/`;

    const response = await axios.post(url, useJson, { headers });

    return response.status;
  }, []);

  return {
    getFavoriteStock,
    createFavoriteStock,
    updateFavoriteStock,
    deleteFavoriteStock,
    stockFavoriteStock,
  };
};
