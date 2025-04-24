import { Request, Response } from "express";
import { HttpError } from "../../../helpers/error";
import wrapper from "../../../helpers/wrapper";
import { baseResponse } from "../../../helpers/utils";
import domain from "./domain";

const createUser = async (req: Request, res: Response) => {
  const { err } = await domain.createUser(req.validate);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 201, {
    ...baseResponse,
    code: 201,
    message: "User created successfully",
  });
};

const login = async (req: Request, res: Response) => {
  const { data, err } = await domain.login(req.validate);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }
  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Login successfully",
    data,
  });
};

export default {
  createUser,
  login,
};
