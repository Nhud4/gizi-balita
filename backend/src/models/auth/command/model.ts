import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../../../middlewares/validateSchema";

const createUserSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  validateSchema(schema, { ...req.body }, req, res, next);
};

const loginSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateSchema(schema, { ...req.body }, req, res, next);
};

export default {
  createUserSchema,
  loginSchema,
};
