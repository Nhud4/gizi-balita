import { Request, Response } from "express";
import wrapper from "../../../helpers/wrapper";
import { baseResponse } from "../../../helpers/utils";
import { HttpError } from "../../../helpers/error";
import domain from "./domain";

const list = async (req: Request, res: Response) => {
  const { data, err, meta } = await domain.list(req.validate);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "List data successfully",
    data,
    meta,
  });
};

const detail = async (req: Request, res: Response) => {
  const { id } = req.validate;
  const { data, err } = await domain.detail(parseInt(id, 10));
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Detail data successfully",
    data,
  });
};

export default {
  list,
  detail,
};
