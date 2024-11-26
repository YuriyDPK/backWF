// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к базе данных
const MealPlan = require('./MealPlan'); // Импорт модели MealPlan

const Order = sequelize.define('Order', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  meal_plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MealPlan, // Связь с таблицей MealPlan
      key: 'id',
    },
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending',
  },
});

// Связь: Order -> MealPlan
Order.belongsTo(MealPlan, { foreignKey: 'meal_plan_id', as: 'mealPlan' });
MealPlan.hasMany(Order, { foreignKey: 'meal_plan_id', as: 'orders' });

module.exports = Order;
