import { useCallback } from "react";
import axios from "axios";

import { useRequestHeader } from "./useRequestHeader";
import { TSignIn } from "../../../types/hooks/common/auth/TSignIn";
import { TSignUp } from "../../../types/hooks/common/auth/TSignUp";
import { URL_SIGN_IN, URL_SIGN_UP } from "../../../constants/urls";

type T = {
  signIn: (signInUser: TSignIn) => Promise<number>;
  signUp: (signUpUser: TSignUp) => Promise<number>;
};

export const useAuthApi = (): T => {
  const { setRequestHeader } = useRequestHeader();
  const signIn = useCallback(async (signInUser: TSignIn) => {
    const response = await axios.post(URL_SIGN_IN, signInUser);

    setRequestHeader(response.data);
    return response.status;
  }, []);

  const signUp = useCallback(async (signUpUser: TSignUp) => {
    const response = await axios.post(URL_SIGN_UP, signUpUser);
    setRequestHeader({
      username: response.data.account.username,
      token: response.data.token,
    });
    return response.status;
  }, []);

  return { signIn, signUp };
};
