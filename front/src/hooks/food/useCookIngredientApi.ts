import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TCookIngredientPaginate } from "../../types/api/TCookIngredientPaginate";
import { URL_COOK_INGREDIENT_LIST } from "../../constants/urls";

type T = {
  getCookIngredient: (id: number, page?: number) => Promise<TCookIngredientPaginate>;
};

export const useCookIngredientApi = (): T => {
  const { getRequestHeader } = useRequestHeader();

  const getCookIngredient = useCallback(async (id: number, page?: number) => {
    const headers = getRequestHeader();
    let url = `${URL_COOK_INGREDIENT_LIST}${id}/`;
    if (page) {
      url = `${url}?page=${page}`;
    }
    const response = await axios.get(url, { headers });

    return response.data;
  }, []);

  return { getCookIngredient };
};
