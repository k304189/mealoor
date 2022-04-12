import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TUsePaginate } from "../../types/api/TUsePaginate";
import {
  URL_USE_LIST,
  URL_USE_DELETE,
} from "../../constants/urls";

type T = {
  getUse: (id: number, page?: number) => Promise<TUsePaginate>;
  deleteUse: (id: number) => Promise<number>;
};

export const useUseApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const getUse = useCallback(async (id: number, page?: number) => {
    const headers = getRequestHeader();
    let url = `${URL_USE_LIST}${id}/`;
    if (page) {
      url = `${url}?page=${page}`;
    }
    const response = await axios.get(url, { headers });

    return response.data;
  }, []);

  const deleteUse = useCallback(async (id: number) => {
    const headers = getRequestHeader();
    const url = `${URL_USE_DELETE}${id}/`;
    const response = await axios.delete(url, { headers });

    return response.status;
  }, []);

  return { getUse, deleteUse };
};
