const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URI_LOCAL, {
  logging: false,
});

module.exports = sequelize;
