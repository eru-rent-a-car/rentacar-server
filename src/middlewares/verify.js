const jwt = require('jsonwebtoken');
require('dotenv').config();

const AppError = require('../utilities/AppError');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    next(new AppError('Unauthorized', 401));
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError('Unauthorized', 401));
  }
};
