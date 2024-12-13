// models/Meal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к базе данных

const Meal = sequelize.define('Meal', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meal_type: {
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner'),
    allowNull: false,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  protein: {
    type: DataTypes.INTEGER,
  },
  fats: {
    type: DataTypes.INTEGER,
  },
  carbs: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Meal' // указание имени таблицы
});

module.exports = Meal;
