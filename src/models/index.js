const Booking = require('./Booking');
const User = require('./User');
const Vehicle = require('./Vehicle');

exports.initAssociations = () => {
  Booking.belongsTo(User, { foreignKey: 'userId' });
  Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
  User.hasMany(Booking, { foreignKey: 'userId' });
  Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });
};
