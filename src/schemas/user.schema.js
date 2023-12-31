const Joi = require('joi');

const register = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least 6 characters, 1 letter, 1 number and 1 special character',
    }),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPassword = Joi.object({
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least 6 characters, 1 letter, 1 number and 1 special character',
    }),
});

const update = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

module.exports = { register, login, forgotPassword, update };
