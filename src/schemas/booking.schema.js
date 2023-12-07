const Joi = require('joi');

const create = Joi.object({
  userId: Joi.string().uuid().required(),
  vehicleId: Joi.string().uuid().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({ 'date.greater': 'End date must be greater than start date' }),
  totalPrice: Joi.number().required(),
});

const update = Joi.object({
  startDate: Joi.date(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({ 'date.greater': 'End date must be greater than start date' }),
  totalPrice: Joi.number(),
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED'),
});

module.exports = { create, update };
