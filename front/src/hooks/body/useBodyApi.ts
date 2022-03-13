import { useCallback, useState } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TBody } from "../../types/api/TBody";
import {
  URL_BODY_GET,
  URL_BODY_CREATE,
  URL_BODY_UPDATE,
} from "../../constants/urls";

type T = {
  body: TBody | null;
  getBody: (date: string) => Promise<number>;
  createBody: (createJson: TBody) => Promise<number>;
  updateBody: (updateJson: TBody) => Promise<number>;
};

export const useBodyApi = (): T => {
  const { getRequestHeader } = useRequestHeader();
  const [body, setBody] = useState<TBody | null>(null);

  const getBody = useCallback(async (date: string) => {
    const headers = getRequestHeader();
    const url = `${URL_BODY_GET}${date}/`;
    const response = await axios.get(url, { headers });

    setBody(response.data);
    return response.status;
  }, []);

  const createBody = useCallback(async (createJson: TBody) => {
    const headers = getRequestHeader();
    const response = await axios.post(URL_BODY_CREATE, createJson, { headers });

    setBody(response.data);
    return response.status;
  }, []);

  const updateBody = useCallback(async (updateJson: TBody) => {
    const headers = getRequestHeader();
    const url = `${URL_BODY_UPDATE}${updateJson.date}/`;
    const response = await axios.patch(url, updateJson, { headers });

    setBody(response.data);
    return response.status;
  }, []);

  return { body, getBody, createBody, updateBody };
};
