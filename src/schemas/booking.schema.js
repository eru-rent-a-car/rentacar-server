const Joi = require('joi');
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const create = Joi.object({
  vehicleId: Joi.string().uuid().required(),
  startDate: Joi.date().min(today).required().messages({
    'date.min': 'Start date must be today or later',
  }),
  endDate: Joi.date().min(Joi.ref('startDate')).required().messages({
    'date.min': 'Start date must be today or later',
    'date.greater': 'End date must be greater than start date',
  }),
  totalPrice: Joi.number().required(),
});

const update = Joi.object({
  startDate: Joi.date().min(today).required(),
  endDate: Joi.date().min(Joi.ref('startDate')).required().messages({
    'date.min': 'Start date must be today or later',
    'date.greater': 'End date must be greater than start date',
  }),
  totalPrice: Joi.number(),
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED'),
});

const accept = Joi.object({
  status: Joi.string().valid('APPROVED', 'REJECTED'),
});

module.exports = { create, update, accept };
