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

const total = async (req: Request, res: Response) => {
  const { data, err } = await domain.totalData();
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Total data successfully",
    data,
  });
};

const totalAll = async (req: Request, res: Response) => {
  const { data, err } = await domain.totalAllData();
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Total data successfully",
    data,
  });
};

export default {
  list,
  total,
  totalAll,
};
