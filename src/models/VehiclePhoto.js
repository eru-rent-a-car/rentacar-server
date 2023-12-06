const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const VehiclePhoto = sequelize.define(
  'VehiclePhoto',
  {
    vehicleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    photoId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false }
);

module.exports = VehiclePhoto;
