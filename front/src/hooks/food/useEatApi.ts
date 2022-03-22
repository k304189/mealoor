import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TEat } from "../../types/api/TEat";
import { URL_EAT_CREATE } from "../../constants/urls";

type T = {
  createEat: (eat: TEat) => Promise<number>;
};

export const useEatApi = (): T => {
  const { getRequestHeader } = useRequestHeader();
  const createEat = useCallback(async (eat: TEat) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_EAT_CREATE, eat, { headers });

    return response.status;
  }, []);

  return { createEat };
};
