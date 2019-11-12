const sequilize = require('sequelize');

module.exports = require('../index').define(
  'Device',
  {
    id: {
      type: sequilize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: sequilize.STRING(50),
      allowNull: false
    },
    ip: {
      type: sequilize.INTEGER,
      allowNull: false
    },
    status: {
      type: sequilize.BOOLEAN,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
