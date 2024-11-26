// models/Goal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к базе данных

const Goal = sequelize.define('Goal', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  meals_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price_per_day: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Goal;
