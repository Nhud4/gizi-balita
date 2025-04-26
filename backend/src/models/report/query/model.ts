import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../../../middlewares/validateSchema";

const giziSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    year: Joi.number().required(),
    month: Joi.number().required(),
  });

  validateSchema(schema, { ...req.query }, req, res, next);
};

const genderSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    year: Joi.number().required(),
    month: Joi.number().required(),
  });

  validateSchema(schema, { ...req.query }, req, res, next);
};

const ageSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    year: Joi.number().required(),
  });

  validateSchema(schema, { ...req.query }, req, res, next);
};

const giziGrafikSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    year: Joi.number().required(),
  });

  validateSchema(schema, { ...req.query }, req, res, next);
};

export default {
  giziSchema,
  genderSchema,
  ageSchema,
  giziGrafikSchema,
};
