// models/OrderStatus.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const OrderStatus = sequelize.define("OrderStatus", {
  status_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = OrderStatus;
