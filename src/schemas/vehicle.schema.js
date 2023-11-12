const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});

const update = Joi.object({
  name: Joi.string(),
  model: Joi.string(),
  year: Joi.number(),
  price: Joi.number(),
  description: Joi.string(),
  image: Joi.string(),
});

module.exports = { create, update };
