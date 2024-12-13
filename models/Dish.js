// models/Dish.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к базе данных
const Meal = require('./Meal'); // Импорт модели Meal

const Dish = sequelize.define('Dish', {
  meal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Meal, // Связь с таблицей Meal
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
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
  tableName: 'Dish' // указание имени таблицы
});

// Связь: Dish -> Meal
Dish.belongsTo(Meal, { foreignKey: 'meal_id', as: 'Meal' });
Meal.hasMany(Dish, { foreignKey: 'meal_id', as: 'Dish' });

module.exports = Dish;
