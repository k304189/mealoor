import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TCook } from "../../types/api/TCook";
import { URL_COOK_CREATE, URL_COOK_CANCEL } from "../../constants/urls";

type T = {
  createCook: (createJson: TCook) => Promise<number>;
  cancelCook: (cancelCookId: number) => Promise<number>;
};

export const useCookApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const createCook = useCallback(async (createJson: TCook) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_COOK_CREATE, createJson, { headers });

    return response.status;
  }, []);

  const cancelCook = useCallback(async (cancelCookId: number) => {
    const headers = getRequestHeader();
    const url = `${URL_COOK_CANCEL}${cancelCookId}/`;
    const response = await axios.delete(url, { headers });

    return response.status;
  }, []);

  return { createCook, cancelCook };
};
