import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TFavoriteEat } from "../../types/api/TFavoriteEat";
import { TFavoriteEatPaginate } from "../../types/api/TFavoriteEatPaginate";
import { TSendUse } from "../../types/api/TSendUse";
import {
  URL_FAVORITE_EAT_LIST,
  URL_FAVORITE_EAT_CREATE,
  URL_FAVORITE_EAT_UPDATE,
  URL_FAVORITE_EAT_DELETE,
  URL_FAVORITE_EAT_EAT,
} from "../../constants/urls";

type T = {
  getFavoriteEat: (page?: number) => Promise<TFavoriteEatPaginate>;
  createFavoriteEat: (createJson: TFavoriteEat) => Promise<TFavoriteEat>;
  updateFavoriteEat: (updateJson: TFavoriteEat) => Promise<TFavoriteEat>;
  deleteFavoriteEat: (deleteId: number) => Promise<number>;
  eatFavoriteEat: (eatJson: TSendUse) => Promise<number>;
};

export const useFavoriteEatApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const getFavoriteEat = useCallback(async (page?: number) => {
    const headers = getRequestHeader();
    let url = URL_FAVORITE_EAT_LIST;
    if (page) {
      url = `${url}?page=${page}`;
    }
    const response = await axios.get(url, { headers });

    return response.data;
  }, []);

  const createFavoriteEat = useCallback(async (createJson: TFavoriteEat) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_FAVORITE_EAT_CREATE, createJson, { headers });

    return response.data;
  }, []);

  const updateFavoriteEat = useCallback(async (updateJson: TFavoriteEat) => {
    const headers = getRequestHeader();
    const url = `${URL_FAVORITE_EAT_UPDATE}${updateJson.id}/`;

    const response = await axios.patch(url, updateJson, { headers });

    return response.data;
  }, []);

  const deleteFavoriteEat = useCallback(async (deleteId: number) => {
    const headers = getRequestHeader();
    const url = `${URL_FAVORITE_EAT_DELETE}${deleteId}/`;

    const response = await axios.delete(url, { headers });

    return response.status;
  }, []);

  const eatFavoriteEat = useCallback(async (eatJson: TSendUse) => {
    const headers = getRequestHeader();
    const url = `${URL_FAVORITE_EAT_EAT}${eatJson.id}/`;

    const response = await axios.post(url, eatJson, { headers });

    return response.status;
  }, []);

  return {
    getFavoriteEat,
    createFavoriteEat,
    updateFavoriteEat,
    deleteFavoriteEat,
    eatFavoriteEat,
  };
};
