import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';

export const validateCreateVector = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const schema: ObjectSchema = Joi.object({
    input: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          content: Joi.string().required()
        })
      )
      .required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return next();
};

export const validateComputeVector = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const schema: ObjectSchema = Joi.object({
    input: Joi.string().required(),
    results: Joi.number().required(),
    source: Joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return next();
};

export const validateChat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const schema: ObjectSchema = Joi.object({
    input: Joi.string().required(),
    results: Joi.number().required(),
    source: Joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return next();
};
