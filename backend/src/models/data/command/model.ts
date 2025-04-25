import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../../../middlewares/validateSchema";

const createSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    gender: Joi.string().required().valid("L", "P"),
    age: Joi.string().required(),
    weight: Joi.string().required(),
    height: Joi.string().required(),
    lila: Joi.string().required(),
    k: Joi.number().min(3).required(),
  });

  validateSchema(schema, { ...req.body }, req, res, next);
};

const updateSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    gender: Joi.string().required().valid("L", "P"),
    age: Joi.string().required(),
    weight: Joi.string().required(),
    height: Joi.string().required(),
    lila: Joi.string().required(),
    status: Joi.string().required(),
  });

  validateSchema(schema, { ...req.params, ...req.body }, req, res, next);
};

const removeSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  validateSchema(schema, { ...req.params }, req, res, next);
};

export default {
  createSchema,
  updateSchema,
  removeSchema,
};
