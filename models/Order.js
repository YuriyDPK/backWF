// models/Order.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const OrderStatus = require("./OrderStatus");
const DeliveryAddress = require("./DeliveryAddress");

const Order = sequelize.define("Order", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  delivery_time: {
    type: DataTypes.TIME,
  },
  total_price: {
    type: DataTypes.FLOAT,
  },
});

Order.belongsTo(User, { foreignKey: "user_id" });
Order.belongsTo(OrderStatus, { foreignKey: "status_id" });
Order.belongsTo(DeliveryAddress, { foreignKey: "delivery_address_id" });

module.exports = Order;
