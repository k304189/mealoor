import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TUse } from "../../types/api/TUse";
import { TUsePaginate } from "../../types/api/TUsePaginate";
import {
  URL_USE_LIST,
} from "../../constants/urls";

type T = {
  getUse: (id: number, page?: number) => Promise<TUsePaginate>;
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

  return { getUse };
};
