import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.string().required(),
  STAGE: Joi.string().required(),
  DB_PORT: Joi.string().default(5433).required(), // 5433
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
