module.exports = (app) => {
  app.use('/api/auths', require('./auth.route'));
  app.use('/api/vehicles', require('./vehicle.route'));
  app.use('/api/bookings', require('./booking.route'));
};
