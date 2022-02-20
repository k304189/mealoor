import { rest } from "msw";

import { signInResponse } from "./dummy/signInResponse";
import { signUpResponse } from "./dummy/signUpResponse";
import { HTTP_200_OK, HTTP_201_CREATED } from "../constants/httpStatus";
import {
  URL_SIGN_IN,
  URL_SIGN_UP,
} from "../constants/urls";

export const handlers = [
  rest.post(URL_SIGN_IN, (req, res, ctx) => {
    return res(ctx.status(HTTP_200_OK), ctx.json(signInResponse))
  }),
  rest.post(URL_SIGN_UP, (req, res, ctx) => {
    return res(ctx.status(HTTP_201_CREATED), ctx.json(signUpResponse))
  }),
];
