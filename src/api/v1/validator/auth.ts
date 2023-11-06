import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const schema: ObjectSchema = Joi.object({
    name: Joi.string().required(),
    credential_level: Joi.number().required(),
    jwt_secret: Joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return next();
};
