// models/Subscription.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const SubscriptionPlan = require("./SubscriptionPlan");

const Subscription = sequelize.define("Subscription", {
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  payment_frequency: {
    type: DataTypes.STRING,
  },
});

Subscription.belongsTo(User, { foreignKey: "user_id" });
Subscription.belongsTo(SubscriptionPlan, {
  foreignKey: "subscription_plan_id",
});

module.exports = Subscription;
