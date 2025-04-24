import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Wrapper from "../helpers/wrapper";
import { UnprocessableEntityError } from "../helpers/error";

declare module "express-serve-static-core" {
  interface Request {
    validate?: any;
  }
}

export const validateSchema = (
  schema: Joi.ObjectSchema,
  payload: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error, value } = schema.validate(payload, { abortEarly: false });

  if (error) {
    const data = error.details.map((item) => {
      const field = item.path[item.path.length - 1];
      return {
        message: item.message.replace(/"/g, ""),
        field,
      };
    });

    return Wrapper.responseError(
      res,
      new UnprocessableEntityError("Validation error", data)
    );
  }

  req.validate = value;
  next();
};
