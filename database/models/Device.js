const sequilize = require("sequelize");
const updatePk = require("../../helpers").updatePk;

const Device = require("../index").define(
  "Device",
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
      type: sequilize.STRING(15),
      allowNull: false
    },
    status: {
      type: sequilize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);

Device.updatePk = updatePk.bind(Device);

module.exports = Device;
