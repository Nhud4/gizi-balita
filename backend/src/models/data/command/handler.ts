import { Request, Response } from "express";
import wrapper from "../../../helpers/wrapper";
import { baseResponse } from "../../../helpers/utils";
import { HttpError } from "../../../helpers/error";
import domain from "./domain";

const uploadData = async (req: Request, res: Response) => {
  const file = req.file;

  const { err } = await domain.uploadData(file);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 201, {
    ...baseResponse,
    code: 201,
    message: "File uploaded successfully",
  });
};

const create = async (req: Request, res: Response) => {
  const { data, err } = await domain.create(req.validate);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 201, {
    ...baseResponse,
    code: 201,
    message: "Data created successfully",
    data,
  });
};

export default {
  uploadData,
  create,
};
