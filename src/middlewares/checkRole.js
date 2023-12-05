module.exports =
  (roles = []) =>
  (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: { message: 'You are not authorized to access this resource' } });
      }
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  };
