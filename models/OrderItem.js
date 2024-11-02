// models/OrderItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Order = require("./Order");
const MenuItem = require("./MenuItem");

const OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});

OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(MenuItem, { foreignKey: "menu_item_id" });

module.exports = OrderItem;
