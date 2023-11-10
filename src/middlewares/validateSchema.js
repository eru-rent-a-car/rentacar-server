module.exports = (schema) => (req, res, next) => {
  try {
    schema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
