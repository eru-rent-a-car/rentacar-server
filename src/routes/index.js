module.exports = (app) => {
  app.use('/api/auth', require('./auth.route'));
};
