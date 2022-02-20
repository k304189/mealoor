import { useCallback } from "react";
import "axios";

import { TRequestHeader } from "../../../types/hooks/common/auth/TRequestHeader";
import { TResponseHeader } from "../../../types/hooks/common/auth/TResponseHeader";

type T = {
  setRequestHeader: (response: TResponseHeader) => void;
  getRequestHeader: () => TRequestHeader;
  hasRequestHeader: () => boolean;
  clearRequestHeader: () => void;
};

const tokenKey = "auth_token";
const usernameKey = "username";

export const useRequestHeader = (): T => {
  const setRequestHeader = useCallback((response: TResponseHeader) => {
    localStorage.setItem(tokenKey, response.token);
    localStorage.setItem(usernameKey, response.username);
  }, []);

  const getRequestHeader = useCallback((): TRequestHeader => {
    const token = localStorage.getItem(tokenKey) || "";

    if (token === "") {
      throw Error("認証情報がありません");
    }

    return {
      Authorization: `token ${token}`,
    };
  }, []);

  const hasRequestHeader = useCallback((): boolean => {
    let result = false;
    if (localStorage.getItem(tokenKey)) {
      result = true;
    }
    return result;
  }, []);

  const clearRequestHeader = useCallback(() => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(usernameKey);
  }, []);

  return {
    setRequestHeader,
    getRequestHeader,
    hasRequestHeader,
    clearRequestHeader,
  };
};
