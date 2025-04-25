import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../../../middlewares/validateSchema";

const listSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    page: Joi.number().required(),
    size: Joi.number().required(),
    search: Joi.string().optional().allow("", null),
    gizi: Joi.string().optional().allow("", null),
    gender: Joi.string().optional().allow("", null),
  });

  validateSchema(schema, { ...req.query }, req, res, next);
};

const detailSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  validateSchema(schema, { ...req.params }, req, res, next);
};

export default {
  listSchema,
  detailSchema,
};
