const Booking = require('./Booking');
const Photo = require('./Photo');
const User = require('./User');
const Vehicle = require('./Vehicle');
const VehiclePhoto = require('./VehiclePhoto');

module.exports = () => {
  /** User-Booking */
  Booking.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Booking, { foreignKey: 'userId' });

  /** Vehicle-Booking */
  Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
  Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });

  /** Vehicle-Photo */
  VehiclePhoto.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
  Vehicle.hasMany(VehiclePhoto, { foreignKey: 'vehicleId' });

  VehiclePhoto.belongsTo(Photo, { foreignKey: 'photoId' });
  Photo.hasMany(VehiclePhoto, { foreignKey: 'photoId' });

  /** User-Vehicle */
  Vehicle.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Vehicle, { foreignKey: 'userId' });
};
