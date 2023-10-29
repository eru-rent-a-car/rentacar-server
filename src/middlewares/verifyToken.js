const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    const error = new Error('Token not found');
    error.status = 401;
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const error = new Error('Token is invalid');
      error.status = 401;
      return next(error);
    }

    req.user = decoded.user;
    next();
  });
};
