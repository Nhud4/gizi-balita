import { Request, Response } from "express";
import { InternalServerError } from "../../../helpers/error";
import wrapper from "../../../helpers/wrapper";
import { baseResponse } from "../../../helpers/utils";
import domain from "./domain";

const createUser = async (req: Request, res: Response) => {
  const { err } = await domain.createUser(req.validate);
  if (err) {
    return wrapper.responseError(res, err as InternalServerError);
  }

  return wrapper.response(res, 201, {
    ...baseResponse,
    code: 201,
    message: "User created successfully",
  });
};

export default {
  createUser,
};
