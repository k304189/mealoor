import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TEat } from "../../types/api/TEat";
import { TEatPaginate } from "../../types/api/TEatPaginate";
import {
  URL_EAT_LIST,
  URL_EAT_CREATE,
  URL_EAT_UPDATE,
  URL_EAT_DELETE,
} from "../../constants/urls";

type T = {
  getDateEats: (date: string, page?: number) => Promise<TEatPaginate>;
  createEat: (eat: TEat) => Promise<TEat>;
  updateEat: (eat: TEat) => Promise<TEat>;
  deleteEat: (deleteId: number) => Promise<number>;
};

export const useEatApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const getDateEats = useCallback(async (date: string, page?: number) => {
    const headers = getRequestHeader();
    let url = `${URL_EAT_LIST}${date}`;
    if (page) {
      url = `${url}?page=${page}`;
    }
    const response = await axios.get(url, { headers });

    return response.data;
  }, []);

  const createEat = useCallback(async (createJson: TEat) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_EAT_CREATE, createJson, { headers });

    return response.data;
  }, []);

  const updateEat = useCallback(async (updateJson: TEat) => {
    const headers = getRequestHeader();
    const url = `${URL_EAT_UPDATE}${updateJson.id}/`;

    const response = await axios.patch(url, updateJson, { headers });

    return response.data;
  }, []);

  const deleteEat = useCallback(async (deleteId: number) => {
    const headers = getRequestHeader();
    const url = `${URL_EAT_DELETE}${deleteId}/`;

    const response = await axios.delete(url, { headers });

    return response.status;
  }, []);

  return { getDateEats, createEat, updateEat, deleteEat };
};
