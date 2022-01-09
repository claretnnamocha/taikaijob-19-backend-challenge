import Joi from "joi";

export const signIn = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const activate = {
  email: Joi.string().email().required(),
};

export const signUp = {
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  country: Joi.string().required(),
  planet: Joi.string().required(),
};

export const createJob = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().valid("full time", "contract", "internship").required(),
  country: Joi.string().required(),
  planet: Joi.string().required(),
  market: Joi.string().required(),
  skills: Joi.array().items(Joi.string().required()).unique().required(),
};

export const searchJob = {
  q: Joi.string(),
  type: Joi.string().valid("full time", "contract", "internship"),
  country: Joi.string(),
  planet: Joi.string(),
  market: Joi.string(),
  skills: Joi.string(),
  page: Joi.number().default(1),
  pageSize: Joi.number().default(15),
};

export const jobDetails = {
  jobId: Joi.string().required(),
};

export const updateJob = {
  jobId: Joi.string().required(),
  title: Joi.string(),
  description: Joi.string(),
  type: Joi.string().valid("full time", "contract", "internship"),
  country: Joi.string(),
  planet: Joi.string(),
  market: Joi.string(),
  skills: Joi.array().items(Joi.string()).unique(),
};
