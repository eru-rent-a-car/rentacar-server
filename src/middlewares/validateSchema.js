module.exports = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
