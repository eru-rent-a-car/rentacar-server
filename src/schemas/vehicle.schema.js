const Joi = require('joi');

const create = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  isAutomatic: Joi.boolean().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

const update = Joi.object({
  brand: Joi.string(),
  model: Joi.string(),
  year: Joi.number(),
  isAutomatic: Joi.boolean().required(),
  description: Joi.string(),
  price: Joi.number(),
});

module.exports = { create, update };
