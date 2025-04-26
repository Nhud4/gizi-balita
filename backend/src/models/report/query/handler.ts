import { Request, Response } from "express";
import wrapper from "../../../helpers/wrapper";
import { baseResponse } from "../../../helpers/utils";
import { HttpError } from "../../../helpers/error";
import domain from "./domain";

const countAll = async (req: Request, res: Response) => {
  const { data, err } = await domain.totalAllData();
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Count all data successfully",
    data,
  });
};

const countNormal = async (req: Request, res: Response) => {
  const { data, err } = await domain.totalNormalStatus();
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Count normal data successfully",
    data,
  });
};

const countNotNormal = async (req: Request, res: Response) => {
  const { data, err } = await domain.totalNotNormalStatus();
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Count not normal data successfully",
    data,
  });
};

const percentageGizi = async (req: Request, res: Response) => {
  const { data, err } = await domain.percentageGizi(req.validate);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Count gizi data successfully",
    data,
  });
};

const percentageGender = async (req: Request, res: Response) => {
  const { data, err } = await domain.percentageGender(req.validate);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Count gender data successfully",
    data,
  });
};

const grafikAge = async (req: Request, res: Response) => {
  const { data, err } = await domain.grafikAge(req.validate);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Count age data successfully",
    data,
  });
};

const grafikGizi = async (req: Request, res: Response) => {
  const { data, err } = await domain.grafikGizi(req.validate);
  if (err) {
    return wrapper.responseError(res, err as HttpError);
  }

  return wrapper.response(res, 200, {
    ...baseResponse,
    code: 200,
    message: "Count gizi data successfully",
    data,
  });
};

export default {
  countAll,
  countNormal,
  countNotNormal,
  percentageGizi,
  percentageGender,
  grafikAge,
  grafikGizi,
};
