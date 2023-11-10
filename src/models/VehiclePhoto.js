const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const VehiclePhoto = sequelize.define('VehiclePhoto', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  vehicleId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  photoId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = VehiclePhoto;
