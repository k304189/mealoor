import { useCallback } from "react";

type T = {
  getSignInUsername: () => string;
}

export const useSignInAccount = (): T => {
  const getSignInUsername = useCallback(() => {
    const username : string = localStorage.getItem("username") ?? "";
    return username;
  }, []);
  return { getSignInUsername };
};
