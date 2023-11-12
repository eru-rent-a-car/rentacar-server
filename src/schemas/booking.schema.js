const Joi = require('joi');

const create = Joi.object({
  userId: Joi.number().required(),
  roomId: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

const update = Joi.object({
  userId: Joi.number(),
  roomId: Joi.number(),
  startDate: Joi.date(),
  endDate: Joi.date(),
});

module.exports = { create, update };
