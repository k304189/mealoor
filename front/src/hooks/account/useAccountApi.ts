import { useCallback, useState } from "react";
import axios from "axios";

import { useRequestHeader } from "../common/auth/useRequestHeader";
import { TAccount } from "../../types/api/TAccount";
import {
  URL_ACCOUNT_GET,
  URL_ACCOUNT_UPDATE,
  URL_ACCOUNT_WITHDRAW,
} from "../../constants/urls";

type T = {
  account: TAccount | null;
  getAccount: () => Promise<number>;
  updateAccount: (updateJson: TAccount) => Promise<number>;
  withdrawAccount: () => Promise<number>;
};

export const useAccountApi = (): T => {
  const { getRequestHeader, clearRequestHeader } = useRequestHeader();
  const [account, setAccount] = useState<TAccount | null>(null);
  const getAccount = useCallback(async () => {
    const headers = getRequestHeader();
    const response = await axios.get(URL_ACCOUNT_GET, { headers });

    setAccount(response.data[0]);
    return response.status;
  }, []);

  const updateAccount = useCallback(async (updateJson: TAccount) => {
    const headers = getRequestHeader();
    const response = await axios.patch(URL_ACCOUNT_UPDATE, updateJson, { headers });

    return response.status;
  }, []);

  const withdrawAccount = useCallback(async () => {
    const headers = getRequestHeader();
    const response = await axios.delete(URL_ACCOUNT_WITHDRAW, { headers });
    clearRequestHeader();
    return response.status;
  }, []);

  return { account, getAccount, updateAccount, withdrawAccount };
};
