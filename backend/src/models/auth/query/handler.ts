import { Request, Response } from "express";
import wrapper from "../../../helpers/wrapper";
import { baseResponse } from "../../../helpers/utils";
import { HttpError } from "../../../helpers/error";
import domain from "./domain";

const getProfile = async (req: Request, res: Response) => {
  const payload = (req as any).user as TokenResponse;
  const { data, err } = await domain.getProfile(payload);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Get profile successfully",
    data,
  });
};

export default {
  getProfile,
};
