import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TFavoriteEat } from "../../types/api/TFavoriteEat";
import {
  URL_FAVORIRE_EAT_CREATE,
  URL_FAVORIRE_EAT_UPDATE,
  URL_FAVORIRE_EAT_DELETE,
} from "../../constants/urls";

type T = {
  createFavoriteEat: (createJson: TFavoriteEat) => Promise<TFavoriteEat>;
  updateFavoriteEat: (updateJson: TFavoriteEat) => Promise<TFavoriteEat>;
  deleteFavoriteEat: (deleteId: number) => Promise<number>;
};

export const useFavoriteEatApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const createFavoriteEat = useCallback(async (createJson: TFavoriteEat) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_FAVORIRE_EAT_CREATE, createJson, { headers });

    return response.data;
  }, []);

  const updateFavoriteEat = useCallback(async (updateJson: TFavoriteEat) => {
    const headers = getRequestHeader();
    const url = `${URL_FAVORIRE_EAT_UPDATE}${updateJson.id}/`;

    const response = await axios.patch(url, updateJson, { headers });

    return response.data;
  }, []);

  const deleteFavoriteEat = useCallback(async (deleteId: number) => {
    const headers = getRequestHeader();
    const url = `${URL_FAVORIRE_EAT_DELETE}${deleteId}/`;

    const response = await axios.delete(url, { headers });

    return response.status;
  }, []);

  return { createFavoriteEat, updateFavoriteEat, deleteFavoriteEat };
};
