import { rest } from "msw";

import { signInResponse } from "./dummy/signInResponse";
import { signUpResponse } from "./dummy/signUpResponse";
import { accountResponse } from "./dummy/accountResponse";
import {
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
} from "../constants/httpStatus";
import {
  URL_SIGN_IN,
  URL_SIGN_UP,
  URL_SIGN_OUT,
  URL_ACCOUNT_GET,
  URL_ACCOUNT_UPDATE,
  URL_ACCOUNT_WITHDRAW,
} from "../constants/urls";

export const handlers = [
  rest.post(URL_SIGN_IN, (req, res, ctx) => {
    return res(ctx.status(HTTP_200_OK), ctx.json(signInResponse));
  }),
  rest.post(URL_SIGN_UP, (req, res, ctx) => {
    return res(ctx.status(HTTP_201_CREATED), ctx.json(signUpResponse));
  }),
  rest.delete(URL_SIGN_OUT, (req, res, ctx) => {
    return res(ctx.status(HTTP_204_NO_CONTENT));
  }),
  rest.get(URL_ACCOUNT_GET, (req, res, ctx) => {
    return res(ctx.status(HTTP_200_OK), ctx.json(accountResponse));
  }),
  rest.patch(URL_ACCOUNT_UPDATE, (req, res, ctx) => {
    return res(ctx.status(HTTP_200_OK), ctx.json(accountResponse));
  }),
  rest.delete(URL_ACCOUNT_WITHDRAW, (req, res, ctx) => {
    return res(ctx.status(HTTP_204_NO_CONTENT));
  }),
];
