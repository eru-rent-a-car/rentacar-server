const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: { message: 'Unauthorized' } });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: { message: 'Unauthorized' } });
  }
};
