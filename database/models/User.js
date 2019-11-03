const sequelize = require('sequelize');

module.exports = require('../index').define(
  'User',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: sequelize.STRING,
      allowNull: false
    },
    email: {
      type: sequelize.STRING,
      allowNull: false
    },
    password: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
