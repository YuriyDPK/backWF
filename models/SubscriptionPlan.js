// models/SubscriptionPlan.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const SubscriptionPlan = sequelize.define("SubscriptionPlan", {
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_per_day: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  bonus_points: {
    type: DataTypes.INTEGER,
  },
  discount: {
    type: DataTypes.FLOAT,
  },
});

module.exports = SubscriptionPlan;
