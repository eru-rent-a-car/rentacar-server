const Booking = require('./Booking');
const Photo = require('./Photo');
const User = require('./User');
const Vehicle = require('./Vehicle');

exports.initAssociations = () => {
  Booking.belongsTo(User, { foreignKey: 'userId' });
  Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
  User.hasMany(Booking, { foreignKey: 'userId' });
  User.hasMany(Photo, { foreignKey: 'userId' });
  Photo.belongsTo(User, { foreignKey: 'userId' });
  Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });
};
